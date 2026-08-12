import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  assessmentAnswers,
  assessmentAttempts,
  assessmentOptions,
  assessmentQuestions,
  assessments,
  InsertUser,
  recommendations,
  userProfiles,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível no momento.");
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  textFields.forEach(field => {
    const value = user[field];
    if (value !== undefined) {
      values[field] = value ?? null;
      updateSet[field] = value ?? null;
    }
  });

  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
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
        .where(sql`${assessmentOptions.questionId} IN (${sql.join(questions.map(question => sql`${question.id}`), sql`, `)})`)
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

export async function createAssessment(input: {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description?: string;
  durationMinutes: number;
  difficulty: "leve" | "moderada" | "aprofundada";
  status: "rascunho" | "publicado" | "inativo";
  createdByUserId: number;
}) {
  const db = await requireDb();
  const result = await db.insert(assessments).values(input);
  return Number(result[0].insertId);
}

export async function updateAssessment(
  id: number,
  input: Partial<{
    title: string;
    category: string;
    shortDescription: string;
    description: string;
    durationMinutes: number;
    difficulty: "leve" | "moderada" | "aprofundada";
    status: "rascunho" | "publicado" | "inativo";
  }>,
) {
  const db = await requireDb();
  await db.update(assessments).set(input).where(eq(assessments.id, id));
}

export async function replaceAssessmentQuestions(
  assessmentId: number,
  questions: Array<{ statement: string; supportText?: string; options: Array<{ label: string; score: number }> }>,
) {
  const db = await requireDb();
  const oldQuestions = await db
    .select({ id: assessmentQuestions.id })
    .from(assessmentQuestions)
    .where(eq(assessmentQuestions.assessmentId, assessmentId));
  if (oldQuestions.length) {
    await db.delete(assessmentOptions).where(sql`${assessmentOptions.questionId} IN (${sql.join(oldQuestions.map(question => sql`${question.id}`), sql`, `)})`);
  }
  await db.delete(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, assessmentId));

  for (let questionIndex = 0; questionIndex < questions.length; questionIndex += 1) {
    const question = questions[questionIndex];
    if (!question) continue;
    const questionResult = await db.insert(assessmentQuestions).values({
      assessmentId,
      position: questionIndex + 1,
      statement: question.statement,
      supportText: question.supportText,
    });
    const questionId = Number(questionResult[0].insertId);
    if (question.options.length) {
      await db.insert(assessmentOptions).values(
        question.options.map((option: { label: string; score: number }, optionIndex: number) => ({
          questionId,
          position: optionIndex + 1,
          label: option.label,
          score: option.score,
        })),
      );
    }
  }
}

export async function startAttempt(userId: number, assessmentId: number) {
  const db = await requireDb();
  const assessment = await db.select({ status: assessments.status }).from(assessments).where(eq(assessments.id, assessmentId)).limit(1);
  if (!assessment[0] || assessment[0].status !== "publicado") {
    throw new Error("Esta autoavaliação não está disponível no momento.");
  }
  const result = await db.insert(assessmentAttempts).values({ userId, assessmentId });
  return Number(result[0].insertId);
}

export async function submitAttempt(input: {
  attemptId: number;
  userId: number;
  answers: Array<{ questionId: number; optionId: number }>;
}) {
  const db = await requireDb();
  const attempt = await db
    .select()
    .from(assessmentAttempts)
    .where(and(eq(assessmentAttempts.id, input.attemptId), eq(assessmentAttempts.userId, input.userId)))
    .limit(1);
  if (!attempt[0]) throw new Error("Avaliação não encontrada.");
  if (attempt[0].status === "concluido") throw new Error("Esta avaliação já foi concluída.");

  const content = await getAssessmentWithQuestions(attempt[0].assessmentId);
  if (!content || !content.questions.length) throw new Error("Esta avaliação ainda não possui perguntas disponíveis.");
  const validOptions = new Map(content.questions.flatMap(question => question.options.map(option => [option.id, option])));
  const validQuestionIds = new Set(content.questions.map(question => question.id));

  if (input.answers.length !== content.questions.length) throw new Error("Responda todas as perguntas antes de concluir.");
  if (new Set(input.answers.map(answer => answer.questionId)).size !== content.questions.length) throw new Error("Há respostas duplicadas na avaliação.");

  const normalizedAnswers = input.answers.map(answer => {
    const option = validOptions.get(answer.optionId);
    if (!option || option.questionId !== answer.questionId || !validQuestionIds.has(answer.questionId)) {
      throw new Error("Uma das respostas enviadas é inválida.");
    }
    return { ...answer, score: option.score };
  });

  const maximumScore = content.questions.reduce(
    (sum, question) => sum + Math.max(...question.options.map(option => option.score), 0),
    0,
  );
  const { calculateAssessmentResult } = await import("./assessmentLogic");
  const outcome = calculateAssessmentResult(
    normalizedAnswers.map(answer => answer.score),
    maximumScore,
    content.scoringGuide,
  );

  await db.insert(assessmentAnswers).values(
    normalizedAnswers.map(answer => ({
      attemptId: input.attemptId,
      questionId: answer.questionId,
      optionId: answer.optionId,
      score: answer.score,
    })),
  );
  await db
    .update(assessmentAttempts)
    .set({
      status: "concluido",
      score: outcome.score,
      resultBand: outcome.band,
      resultSummary: outcome.summary,
      completedAt: new Date(),
    })
    .where(eq(assessmentAttempts.id, input.attemptId));

  const selectedRecommendations = await db
    .select()
    .from(recommendations)
    .where(
      and(
        eq(recommendations.isActive, true),
        sql`(${recommendations.assessmentId} IS NULL OR ${recommendations.assessmentId} = ${attempt[0].assessmentId})`,
        sql`(${recommendations.minScore} IS NULL OR ${recommendations.minScore} <= ${outcome.score})`,
        sql`(${recommendations.maxScore} IS NULL OR ${recommendations.maxScore} >= ${outcome.score})`,
      ),
    );

  return { ...outcome, recommendations: selectedRecommendations };
}

export async function listUserAttempts(userId: number) {
  const db = await requireDb();
  return db
    .select({
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
    })
    .from(assessmentAttempts)
    .innerJoin(assessments, eq(assessmentAttempts.assessmentId, assessments.id))
    .where(eq(assessmentAttempts.userId, userId))
    .orderBy(desc(assessmentAttempts.startedAt));
}

export async function getUserRecommendations(userId: number) {
  const db = await requireDb();
  const latestAttempt = await db
    .select({
      assessmentId: assessmentAttempts.assessmentId,
      score: assessmentAttempts.score,
      title: assessments.title,
      completedAt: assessmentAttempts.completedAt,
    })
    .from(assessmentAttempts)
    .innerJoin(assessments, eq(assessmentAttempts.assessmentId, assessments.id))
    .where(and(eq(assessmentAttempts.userId, userId), eq(assessmentAttempts.status, "concluido")))
    .orderBy(desc(assessmentAttempts.completedAt))
    .limit(1);

  if (!latestAttempt[0] || latestAttempt[0].score === null) {
    return { latest: null, recommendations: [] };
  }

  const latest = latestAttempt[0];
  const rows = await db
    .select()
    .from(recommendations)
    .where(
      and(
        eq(recommendations.isActive, true),
        sql`(${recommendations.assessmentId} IS NULL OR ${recommendations.assessmentId} = ${latest.assessmentId})`,
        sql`(${recommendations.minScore} IS NULL OR ${recommendations.minScore} <= ${latest.score})`,
        sql`(${recommendations.maxScore} IS NULL OR ${recommendations.maxScore} >= ${latest.score})`,
      ),
    );
  return { latest, recommendations: rows };
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
  await db
    .insert(userProfiles)
    .values({ userId, ...input })
    .onDuplicateKeyUpdate({ set: input });
  return getUserProfile(userId);
}

export async function listUsers(search?: string) {
  const db = await requireDb();
  const filter = search
    ? sql`(${users.name} LIKE ${`%${search}%`} OR ${users.email} LIKE ${`%${search}%`})`
    : undefined;
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      lastSignedIn: users.lastSignedIn,
    })
    .from(users)
    .where(filter)
    .orderBy(desc(users.createdAt));
}

export async function getAdminUserDetail(userId: number) {
  const db = await requireDb();
  const account = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!account[0]) return null;
  const profile = await getUserProfile(userId);
  const [attemptCount] = await db
    .select({ value: sql<number>`count(*)` })
    .from(assessmentAttempts)
    .where(eq(assessmentAttempts.userId, userId));
  return { account: account[0], profile, totalAttempts: Number(attemptCount?.value ?? 0) };
}

export async function setUserRole(userId: number, role: "user" | "admin") {
  const db = await requireDb();
  await db.update(users).set({ role }).where(eq(users.id, userId));
}

export async function getAdminMetrics() {
  const db = await requireDb();
  const [userCount] = await db.select({ value: sql<number>`count(*)` }).from(users);
  const [attemptCount] = await db.select({ value: sql<number>`count(*)` }).from(assessmentAttempts);
  const [completedCount] = await db
    .select({ value: sql<number>`count(*)` })
    .from(assessmentAttempts)
    .where(eq(assessmentAttempts.status, "concluido"));
  const [activeAssessmentCount] = await db
    .select({ value: sql<number>`count(*)` })
    .from(assessments)
    .where(eq(assessments.status, "publicado"));

  const resultsByAssessment = await db
    .select({ name: assessments.title, count: sql<number>`count(${assessmentAttempts.id})` })
    .from(assessments)
    .leftJoin(assessmentAttempts, eq(assessments.id, assessmentAttempts.assessmentId))
    .groupBy(assessments.id, assessments.title)
    .orderBy(desc(sql`count(${assessmentAttempts.id})`))
    .limit(6);

  return {
    totalUsers: Number(userCount?.value ?? 0),
    totalAttempts: Number(attemptCount?.value ?? 0),
    completedAttempts: Number(completedCount?.value ?? 0),
    activeAssessments: Number(activeAssessmentCount?.value ?? 0),
    resultsByAssessment: resultsByAssessment.map(item => ({ ...item, count: Number(item.count ?? 0) })),
  };
}
