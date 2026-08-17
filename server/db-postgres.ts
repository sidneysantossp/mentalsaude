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

export async function startAttempt(userId: number, assessmentId: number) {
  const db = await requireDb();
  const assessment = await db.select({ status: assessments.status }).from(assessments).where(eq(assessments.id, assessmentId)).limit(1);
  if (!assessment[0] || assessment[0].status !== "publicado") {
    throw new Error("Esta autoavaliação não está disponível no momento.");
  }
  const [inserted] = await db.insert(assessmentAttempts).values({ userId, assessmentId }).returning({ id: assessmentAttempts.id });
  return Number(inserted.id);
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
