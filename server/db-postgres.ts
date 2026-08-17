import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  assessmentAnswers,
  assessmentAttempts,
  assessmentOptions,
  assessmentQuestions,
  assessments,
  contentEvidence,
  contentOpportunities,
  contentBriefs,
  internalLinksGraph,
  articleVersions,
  publicationGates,
  InsertUser,
  recommendations,
  userProfiles,
  users,
} from "../drizzle/schema-postgres";
import { ENV } from "./_core/env";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { getCanonicalTest } from "../client/src/data/testsCanonicalDatabase";

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false } });
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database Postgres] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
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

  const values: InsertUser = { openId: user.openId };
  const textFields = ["name", "email", "loginMethod"] as const;

  textFields.forEach(field => {
    const value = user[field];
    if (value !== undefined) {
      values[field] = value ?? null;
    }
  });

  values.lastSignedIn = user.lastSignedIn ?? new Date();
  if (user.role !== undefined) {
    values.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
  }

  await db
    .insert(users)
    .values(values)
    .onConflictDoUpdate({
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
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getUserProfile(userId: number) {
  const db = await requireDb();
  const profile = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  if (profile[0]) return profile[0];
  const inserted = await db.insert(userProfiles).values({ userId }).returning();
  return inserted[0];
}

export async function updateUserProfile(userId: number, data: { displayName?: string; birthYear?: number | null; pronouns?: string; notificationEmail?: boolean; notificationCheckIn?: boolean }) {
  const db = await requireDb();
  await db.update(userProfiles).set({ ...data, updatedAt: new Date() }).where(eq(userProfiles.userId, userId));
  return getUserProfile(userId);
}

export async function listUserAttempts(userId: number) {
  const db = await requireDb();
  return db.select().from(assessmentAttempts).where(eq(assessmentAttempts.userId, userId)).orderBy(desc(assessmentAttempts.createdAt));
}

export async function getUserRecommendations(userId: number) {
  const db = await requireDb();
  return db.select().from(recommendations).where(eq(recommendations.userId, userId)).orderBy(desc(recommendations.createdAt));
}

export async function startAttempt(userId: number, assessmentId: number) {
  const db = await requireDb();
  const assessment = await db.select().from(assessments).where(eq(assessments.id, assessmentId)).limit(1);
  if (!assessment[0]) throw new Error("Autoavaliação não encontrada.");
  const inserted = await db.insert(assessmentAttempts).values({ userId, assessmentId, status: "em_andamento" }).returning();
  return inserted[0];
}

export async function submitAttempt({ attemptId, userId, answers }: { attemptId: number; userId: number; answers: Array<{ questionId: number; optionId: number }> }) {
  const db = await requireDb();
  const attempt = await db.select().from(assessmentAttempts).where(eq(assessmentAttempts.id, attemptId)).limit(1);
  if (!attempt[0] || attempt[0].userId !== userId) throw new Error("Tentativa inválida.");

  let totalScore = 0;
  for (const ans of answers) {
    const opt = await db.select().from(assessmentOptions).where(eq(assessmentOptions.id, ans.optionId)).limit(1);
    if (opt[0]) totalScore += opt[0].score;
    await db.insert(assessmentAnswers).values({ attemptId, questionId: ans.questionId, optionId: ans.optionId });
  }

  const assessment = await db.select().from(assessments).where(eq(assessments.id, attempt[0].assessmentId)).limit(1);
  const canonical = getCanonicalTest(assessment[0]?.slug || "");
  let interpretation = "Resultado registrado com sucesso.";
  if (canonical) {
    const matched = canonical.interpretations.find(i => totalScore >= i.min && totalScore <= i.max);
    if (matched) interpretation = matched.label;
  }

  await db.update(assessmentAttempts).set({ status: "concluido", score: totalScore, interpretation, completedAt: new Date() }).where(eq(assessmentAttempts.id, attemptId));
  const completed = await db.select().from(assessmentAttempts).where(eq(assessmentAttempts.id, attemptId)).limit(1);
  return completed[0];
}

export async function getAdminMetrics() {
  const db = await requireDb();
  const userRows = await db.select({ count: users.id }).from(users);
  const attemptRows = await db.select({ count: assessmentAttempts.id }).from(assessmentAttempts);
  const assessmentRows = await db.select({ count: assessments.id }).from(assessments);
  return { totalUsers: userRows.length, totalAttempts: attemptRows.length, totalAssessments: assessmentRows.length };
}

export async function listUsers(search?: string) {
  const db = await requireDb();
  if (search && search.trim()) {
    return db.select().from(users).where(ilike(users.name, `%${search}%`)).orderBy(desc(users.createdAt));
  }
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function getAdminUserDetail(userId: number) {
  const db = await requireDb();
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user[0]) return null;
  const attempts = await db.select().from(assessmentAttempts).where(eq(assessmentAttempts.userId, userId));
  const profile = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return { user: user[0], attempts, profile: profile[0] || null };
}

export async function setUserRole(userId: number, role: "user" | "admin") {
  const db = await requireDb();
  await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, userId));
  return { success: true };
}

export async function seedDepressionSecondWaveIfNeeded() {}
export async function getContentOpportunities(cluster?: string) { return []; }
export async function getContentEvidence() { return []; }
export async function getContentBriefs(cluster?: string) { return []; }
export async function getContentBriefBySlug(slug: string) { return null; }
export async function getInternalLinksGraph(cluster?: string) { return []; }
export async function getPublicationGates() { return []; }
export async function canPublishContent(slug: string) { return { allowed: true, reasons: [] }; }
export async function createAssessment(data: any) {
  const db = await requireDb();
  const inserted = await db.insert(assessments).values(data).returning();
  return inserted[0];
}
export async function updateAssessment(id: number, data: any) {
  const db = await requireDb();
  await db.update(assessments).set({ ...data, updatedAt: new Date() }).where(eq(assessments.id, id));
  const res = await db.select().from(assessments).where(eq(assessments.id, id)).limit(1);
  return res[0];
}
export async function replaceAssessmentQuestions(assessmentId: number, questions: any[]) {
  const db = await requireDb();
  await db.delete(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, assessmentId));
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qIns = await db.insert(assessmentQuestions).values({ assessmentId, statement: q.statement, supportText: q.supportText, position: i + 1 }).returning();
    for (const opt of q.options) {
      await db.insert(assessmentOptions).values({ questionId: qIns[0].id, label: opt.label, score: opt.score });
    }
  }
  return getAssessmentWithQuestions(assessmentId);
}

export async function getTermsConsent(userId: number) {
  const db = await requireDb();
  const row = await db.select({ termsAcceptedAt: users.termsAcceptedAt }).from(users).where(eq(users.id, userId)).limit(1);
  return { accepted: Boolean(row[0]?.termsAcceptedAt), acceptedAt: row[0]?.termsAcceptedAt ?? null };
}

export async function acceptTerms(userId: number, version: string) {
  const db = await requireDb();
  const acceptedAt = new Date();
  await db.update(users).set({ termsAcceptedAt: acceptedAt }).where(eq(users.id, userId));
  return { accepted: true, version, acceptedAt };
}

export async function listPublishedAssessments() {
  const db = await requireDb();
  return db
    .select()
    .from(assessments)
    .where(eq(assessments.status, "publicado"))
    .orderBy(desc(assessments.updatedAt));
}

export async function listAdminAssessments() {
  const db = await requireDb();
  return db.select().from(assessments).orderBy(desc(assessments.updatedAt));
}

export async function getAssessmentWithQuestions(assessmentId: number) {
  const db = await requireDb();
  const assessment = await db.select().from(assessments).where(eq(assessments.id, assessmentId)).limit(1);
  if (!assessment[0]) return null;
  const questions = await db
    .select()
    .from(assessmentQuestions)
    .where(eq(assessmentQuestions.assessmentId, assessmentId))
    .orderBy(asc(assessmentQuestions.position));
  const allOptions = questions.length
    ? await db
        .select()
        .from(assessmentOptions)
        .where(sql`${assessmentOptions.questionId} IN (${sql.join(questions.map(q => sql`${q.id}`), sql`, `)})`)
        .orderBy(asc(assessmentOptions.position))
    : [];

  return {
    ...assessment[0],
    questions: questions.map(question => ({
      ...question,
      options: allOptions.filter(option => option.questionId === question.id),
    })),
  };
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
  await db
    .insert(userProfiles)
    .values({ userId, ...input })
    .onConflictDoUpdate({
      target: userProfiles.userId,
      set: { ...input, updatedAt: new Date() },
    });
  const rows = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return rows[0] ?? null;
}
