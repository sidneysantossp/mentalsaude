import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  assessmentAnswers,
  assessmentAttempts,
  assessmentOptions,
  assessmentQuestions,
  assessments,
  contentBriefs,
  contentEvidence,
  contentOpportunities,
  InsertUser,
  internalLinksGraph,
  publicationGates,
  recommendations,
  userProfiles,
  users,
} from "../drizzle/schema-postgres";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { getCanonicalTest } from "../client/src/data/testsCanonicalDatabase";
import { ENV } from "./_core/env";

let client: ReturnType<typeof postgres> | null = null;
let database: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  const connectionUrl = process.env.POSTGRES_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!database && connectionUrl) {
    try {
      client = postgres(connectionUrl, {
        ssl: { rejectUnauthorized: false },
        prepare: false,
      });
      database = drizzle(client);
    } catch (error) {
      console.warn("[Database Postgres] Failed to initialize:", error);
      client = null;
      database = null;
    }
  }
  return database;
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados PostgreSQL indisponível no momento.");
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId, lastSignedIn: user.lastSignedIn ?? new Date() };
  (['name', 'email', 'loginMethod'] as const).forEach(field => {
    if (user[field] !== undefined) values[field] = user[field] ?? null;
  });
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? 'admin' : 'user');

  await db.insert(users).values(values).onConflictDoUpdate({
    target: users.openId,
    set: {
      name: values.name,
      email: values.email,
      loginMethod: values.loginMethod,
      role: values.role,
      lastSignedIn: values.lastSignedIn,
      updatedAt: new Date(),
    },
  });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return rows[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0];
}

export async function getUserProfile(userId: number) {
  const db = await requireDb();
  const rows = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return rows[0] ?? null;
}

export async function updateUserProfile(
  userId: number,
  input: {
    displayName?: string;
    birthYear?: number | null;
    pronouns?: string;
    notificationEmail?: boolean;
    notificationCheckIn?: boolean;
  },
) {
  const db = await requireDb();
  await db.insert(userProfiles).values({ userId, ...input }).onConflictDoUpdate({
    target: userProfiles.userId,
    set: { ...input, updatedAt: new Date() },
  });
  return getUserProfile(userId);
}

export async function listPublishedAssessments() {
  try {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(assessments).where(eq(assessments.status, "publicado")).orderBy(desc(assessments.updatedAt));
  } catch (err) {
    console.error("[Database Postgres] listPublishedAssessments failed:", err);
    return [];
  }
}

export async function listAdminAssessments() {
  const db = await requireDb();
  return db.select().from(assessments).orderBy(desc(assessments.updatedAt));
}

export async function createAssessment(data: typeof assessments.$inferInsert) {
  const db = await requireDb();
  const inserted = await db.insert(assessments).values(data).returning({ id: assessments.id });
  return inserted[0]?.id;
}

export async function updateAssessment(id: number, data: Partial<typeof assessments.$inferInsert>) {
  const db = await requireDb();
  await db.update(assessments).set({ ...data, updatedAt: new Date() }).where(eq(assessments.id, id));
}

export async function replaceAssessmentQuestions(
  assessmentId: number,
  questions: Array<{ statement: string; supportText?: string; options: Array<{ label: string; score: number }> }>,
) {
  const db = await requireDb();
  const existing = await db.select({ id: assessmentQuestions.id }).from(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, assessmentId));
  if (existing.length) {
    await db.delete(assessmentOptions).where(sql`${assessmentOptions.questionId} IN (${sql.join(existing.map(question => sql`${question.id}`), sql`, `)})`);
  }
  await db.delete(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, assessmentId));

  for (let questionIndex = 0; questionIndex < questions.length; questionIndex += 1) {
    const question = questions[questionIndex];
    if (!question) continue;
    const inserted = await db.insert(assessmentQuestions).values({
      assessmentId,
      position: questionIndex + 1,
      statement: question.statement,
      supportText: question.supportText,
    }).returning({ id: assessmentQuestions.id });
    const questionId = inserted[0]?.id;
    if (!questionId || !question.options.length) continue;
    await db.insert(assessmentOptions).values(question.options.map((option, optionIndex) => ({
      questionId,
      position: optionIndex + 1,
      label: option.label,
      score: option.score,
    })));
  }
}

export async function getAssessmentWithQuestions(assessmentId: number) {
  const db = await requireDb();
  const assessment = await db.select().from(assessments).where(eq(assessments.id, assessmentId)).limit(1);
  if (!assessment[0]) return null;
  const questions = await db.select().from(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, assessmentId)).orderBy(asc(assessmentQuestions.position));
  const options = questions.length
    ? await db.select().from(assessmentOptions).where(sql`${assessmentOptions.questionId} IN (${sql.join(questions.map(question => sql`${question.id}`), sql`, `)})`).orderBy(asc(assessmentOptions.position))
    : [];
  return {
    ...assessment[0],
    questions: questions.map(question => ({ ...question, options: options.filter(option => option.questionId === question.id) })),
  };
}

export async function startAttempt(userId: number, assessmentId: number) {
  const db = await requireDb();
  const assessment = await db.select({ status: assessments.status }).from(assessments).where(eq(assessments.id, assessmentId)).limit(1);
  if (!assessment[0] || assessment[0].status !== "publicado") {
    throw new Error("Esta autoavaliação não está disponível no momento.");
  }
  const inserted = await db.insert(assessmentAttempts).values({ userId, assessmentId }).returning({ id: assessmentAttempts.id });
  return inserted[0]?.id;
}

export async function submitAttempt(input: { attemptId: number; userId: number; answers: Array<{ questionId: number; optionId: number }> }) {
  const db = await requireDb();
  const attempt = await db.select().from(assessmentAttempts).where(and(eq(assessmentAttempts.id, input.attemptId), eq(assessmentAttempts.userId, input.userId))).limit(1);
  if (!attempt[0]) throw new Error("Avaliação não encontrada.");
  if (attempt[0].status === "concluido") throw new Error("Esta avaliação já foi concluída.");
  const content = await getAssessmentWithQuestions(attempt[0].assessmentId);
  if (!content || !content.questions.length) throw new Error("Esta avaliação ainda não possui perguntas disponíveis.");
  const selectedRecommendations = await db.select().from(recommendations).where(and(
    eq(recommendations.isActive, true),
    sql`(${recommendations.assessmentId} IS NULL OR ${recommendations.assessmentId} = ${attempt[0].assessmentId})`,
  ));
  const { prepareAssessmentSubmission } = await import("./assessmentLogic");
  const prepared = prepareAssessmentSubmission({ questions: content.questions, answers: input.answers, scoringGuide: content.scoringGuide, recommendations: selectedRecommendations });
  await db.insert(assessmentAnswers).values(prepared.normalizedAnswers.map(answer => ({
    attemptId: input.attemptId,
    questionId: answer.questionId,
    optionId: answer.optionId,
    score: answer.score,
  })));
  await db.update(assessmentAttempts).set({
    status: "concluido",
    score: prepared.outcome.score,
    resultBand: prepared.outcome.band,
    resultSummary: prepared.outcome.summary,
    completedAt: new Date(),
    updatedAt: new Date(),
  }).where(eq(assessmentAttempts.id, input.attemptId));
  return { ...prepared.outcome, recommendations: prepared.recommendations };
}

export async function listUserAttempts(userId: number) {
  const db = await requireDb();
  return db.select({
    id: assessmentAttempts.id,
    status: assessmentAttempts.status,
    score: assessmentAttempts.score,
    resultBand: assessmentAttempts.resultBand,
    resultSummary: assessmentAttempts.resultSummary,
    completedAt: assessmentAttempts.completedAt,
    startedAt: assessmentAttempts.startedAt,
    assessmentId: assessments.id,
    title: assessments.title,
    category: assessments.category,
  }).from(assessmentAttempts).innerJoin(assessments, eq(assessmentAttempts.assessmentId, assessments.id)).where(eq(assessmentAttempts.userId, userId)).orderBy(desc(assessmentAttempts.startedAt));
}

export async function getUserRecommendations(userId: number) {
  const db = await requireDb();
  const latestAttempt = await db.select({ assessmentId: assessmentAttempts.assessmentId, score: assessmentAttempts.score, title: assessments.title, completedAt: assessmentAttempts.completedAt })
    .from(assessmentAttempts).innerJoin(assessments, eq(assessmentAttempts.assessmentId, assessments.id))
    .where(and(eq(assessmentAttempts.userId, userId), eq(assessmentAttempts.status, "concluido"))).orderBy(desc(assessmentAttempts.completedAt)).limit(1);
  if (!latestAttempt[0] || latestAttempt[0].score === null) return { latest: null, recommendations: [] };
  const latest = latestAttempt[0];
  const rows = await db.select().from(recommendations).where(and(
    eq(recommendations.isActive, true),
    sql`(${recommendations.assessmentId} IS NULL OR ${recommendations.assessmentId} = ${latest.assessmentId})`,
    sql`(${recommendations.minScore} IS NULL OR ${recommendations.minScore} <= ${latest.score})`,
    sql`(${recommendations.maxScore} IS NULL OR ${recommendations.maxScore} >= ${latest.score})`,
  ));
  return { latest, recommendations: rows };
}

export async function getTermsConsent(userId: number) {
  const db = await requireDb();
  const row = await db.select({ termsAcceptedAt: users.termsAcceptedAt }).from(users).where(eq(users.id, userId)).limit(1);
  return { accepted: Boolean(row[0]?.termsAcceptedAt), acceptedAt: row[0]?.termsAcceptedAt ?? null };
}

export async function acceptTerms(userId: number, version: string) {
  const db = await requireDb();
  const acceptedAt = new Date();
  await db.update(users).set({ termsAcceptedAt: acceptedAt, updatedAt: acceptedAt }).where(eq(users.id, userId));
  return { accepted: true, version, acceptedAt };
}

export async function listUsers(search?: string) {
  const db = await requireDb();
  const filter = search ? sql`(${users.name} ILIKE ${`%${search}%`} OR ${users.email} ILIKE ${`%${search}%`})` : undefined;
  return db.select({ id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt, lastSignedIn: users.lastSignedIn }).from(users).where(filter).orderBy(desc(users.createdAt));
}

export async function getAdminUserDetail(userId: number) {
  const db = await requireDb();
  const account = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!account[0]) return null;
  const profile = await getUserProfile(userId);
  const [attemptCount] = await db.select({ value: sql<number>`count(*)` }).from(assessmentAttempts).where(eq(assessmentAttempts.userId, userId));
  return { account: account[0], profile, totalAttempts: Number(attemptCount?.value ?? 0) };
}

export async function setUserRole(userId: number, role: "user" | "admin") {
  const db = await requireDb();
  await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, userId));
}

export async function getAdminMetrics() {
  const db = await requireDb();
  const [userCount] = await db.select({ value: sql<number>`count(*)` }).from(users);
  const [attemptCount] = await db.select({ value: sql<number>`count(*)` }).from(assessmentAttempts);
  const [completedCount] = await db.select({ value: sql<number>`count(*)` }).from(assessmentAttempts).where(eq(assessmentAttempts.status, "concluido"));
  const [activeAssessmentCount] = await db.select({ value: sql<number>`count(*)` }).from(assessments).where(eq(assessments.status, "publicado"));
  const resultsByAssessment = await db.select({ name: assessments.title, count: sql<number>`count(${assessmentAttempts.id})` }).from(assessments).leftJoin(assessmentAttempts, eq(assessments.id, assessmentAttempts.assessmentId)).groupBy(assessments.id, assessments.title).orderBy(desc(sql`count(${assessmentAttempts.id})`)).limit(6);
  return {
    totalUsers: Number(userCount?.value ?? 0),
    totalAttempts: Number(attemptCount?.value ?? 0),
    completedAttempts: Number(completedCount?.value ?? 0),
    activeAssessments: Number(activeAssessmentCount?.value ?? 0),
    resultsByAssessment: resultsByAssessment.map(item => ({ ...item, count: Number(item.count ?? 0) })),
  };
}

export async function seedDepressionSecondWaveIfNeeded() {
  const db = await requireDb();
  return db.select().from(contentOpportunities).where(eq(contentOpportunities.cluster, "depressao"));
}

export async function getContentOpportunities(clusterName = "ansiedade") {
  const db = await requireDb();
  return db.select().from(contentOpportunities).where(eq(contentOpportunities.cluster, clusterName));
}

export async function getContentEvidence(articleSlug?: string) {
  const db = await requireDb();
  return articleSlug ? db.select().from(contentEvidence).where(eq(contentEvidence.articleSlug, articleSlug)) : db.select().from(contentEvidence);
}

export async function getContentBriefs(clusterName?: string) {
  const db = await requireDb();
  if (!clusterName) return db.select().from(contentBriefs);
  return db.select({ brief: contentBriefs, opportunity: contentOpportunities }).from(contentBriefs).innerJoin(contentOpportunities, eq(contentBriefs.opportunityId, contentOpportunities.id)).where(eq(contentOpportunities.cluster, clusterName));
}

export async function getContentBriefBySlug(slug: string) {
  const db = await requireDb();
  const rows = await db.select({ brief: contentBriefs, opportunity: contentOpportunities }).from(contentBriefs).innerJoin(contentOpportunities, eq(contentBriefs.opportunityId, contentOpportunities.id)).where(eq(contentOpportunities.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getInternalLinksGraph(clusterName?: string) {
  const db = await requireDb();
  if (!clusterName) return db.select().from(internalLinksGraph);
  const rows = await db.select({ slug: contentOpportunities.slug }).from(contentOpportunities).where(eq(contentOpportunities.cluster, clusterName));
  if (!rows.length) return [];
  return db.select().from(internalLinksGraph).where(sql`${internalLinksGraph.sourceSlug} IN (${sql.join(rows.map(row => sql`${row.slug}`), sql`, `)})`);
}

export async function getPublicationGates() {
  const db = await requireDb();
  return db.select().from(publicationGates);
}

export async function canPublishContent(articleSlug: string) {
  const db = await requireDb();
  const article = ARTICLES_DATABASE[articleSlug];
  const opportunity = (await getContentOpportunities("ansiedade")).find(item => item.slug === articleSlug)
    ?? (await getContentOpportunities("depressao")).find(item => item.slug === articleSlug)
    ?? (await getContentOpportunities("tdah")).find(item => item.slug === articleSlug);
  const evidence = await getContentEvidence(articleSlug);
  const links = await db.select().from(internalLinksGraph).where(eq(internalLinksGraph.sourceSlug, articleSlug));
  const canonicalTestSlug = article?.relatedTestSlug || article?.relatedTest?.testSlug;
  const canonicalTest = canonicalTestSlug ? getCanonicalTest(canonicalTestSlug) : null;
  const articleText = article ? JSON.stringify(article) : "";
  const checks = {
    primaryEntityPresent: Boolean(article?.primaryEntity || opportunity?.primaryEntity),
    searchIntentAligned: Boolean(opportunity?.searchIntent),
    authorAssigned: Boolean(article?.author),
    referencesAvailable: Boolean(article?.references?.length && evidence.length),
    sourceQualityHigh: Boolean(article?.references?.some(reference => Boolean(reference.sourceUrl?.startsWith("https://"))) && evidence.some(item => item.sourceType === "primary")),
    reviewerAssigned: Boolean(article?.reviewer),
    scientificReviewPassed: Boolean(article?.references && article.references.length >= 2),
    clinicalReviewPassed: Boolean(article?.reviewer && article.reviewedAt),
    safetyReviewPassed: articleSlug !== "ansiedade-falta-de-ar" && !/x\s* sintomas\s*=|você tem depressão/i.test(articleText),
    originalValueConfirmed: Boolean(article?.originalValue?.length),
    internalLinksComplete: links.length > 0,
    relatedTestMapped: Boolean(canonicalTest),
    metadataValid: Boolean(article?.seoTitle && article?.seoDescription && article?.faqs?.length),
    canonicalConfigured: Boolean(article?.slug === articleSlug),
    schemaJsonValid: Boolean(article?.sections?.length && article.sections.every(section => section.id && section.title && Array.isArray(section.paragraphs))),
    noBrokenOrphanLinks: links.length > 0 && links.every(link => Boolean(link.targetSlug && link.anchorText)),
  };
  const status = Object.values(checks).every(Boolean) ? "PASSED" : "BLOCKED";
  await db.insert(publicationGates).values({ articleSlug, status, checksJson: JSON.stringify(checks), reviewedAt: new Date() }).onConflictDoUpdate({
    target: publicationGates.articleSlug,
    set: { status, checksJson: JSON.stringify(checks), reviewedAt: new Date(), updatedAt: new Date() },
  });
  return { articleSlug, status, checks };
}
