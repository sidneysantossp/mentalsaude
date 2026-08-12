import {
  boolean,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  termsAcceptedAt: timestamp("termsAcceptedAt"),
});

export const userProfiles = mysqlTable(
  "userProfiles",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    displayName: varchar("displayName", { length: 120 }),
    birthYear: int("birthYear"),
    pronouns: varchar("pronouns", { length: 60 }),
    notificationEmail: boolean("notificationEmail").default(true).notNull(),
    notificationCheckIn: boolean("notificationCheckIn").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("userProfiles_userId_unique").on(table.userId)],
);

export const assessments = mysqlTable(
  "assessments",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 96 }).notNull(),
    title: varchar("title", { length: 160 }).notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    shortDescription: varchar("shortDescription", { length: 360 }).notNull(),
    description: text("description"),
    durationMinutes: int("durationMinutes").default(5).notNull(),
    difficulty: mysqlEnum("difficulty", ["leve", "moderada", "aprofundada"])
      .default("leve")
      .notNull(),
    status: mysqlEnum("status", ["rascunho", "publicado", "inativo"])
      .default("rascunho")
      .notNull(),
    scoringGuide: json("scoringGuide"),
    createdByUserId: int("createdByUserId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("assessments_slug_unique").on(table.slug)],
);

export const assessmentQuestions = mysqlTable(
  "assessmentQuestions",
  {
    id: int("id").autoincrement().primaryKey(),
    assessmentId: int("assessmentId").notNull(),
    position: int("position").notNull(),
    statement: text("statement").notNull(),
    supportText: varchar("supportText", { length: 400 }),
    isReverseScored: boolean("isReverseScored").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("assessmentQuestions_order_unique").on(table.assessmentId, table.position)],
);

export const assessmentOptions = mysqlTable(
  "assessmentOptions",
  {
    id: int("id").autoincrement().primaryKey(),
    questionId: int("questionId").notNull(),
    position: int("position").notNull(),
    label: varchar("label", { length: 180 }).notNull(),
    score: int("score").notNull(),
  },
  table => [uniqueIndex("assessmentOptions_order_unique").on(table.questionId, table.position)],
);

export const assessmentAttempts = mysqlTable(
  "assessmentAttempts",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    assessmentId: int("assessmentId").notNull(),
    status: mysqlEnum("status", ["em_andamento", "concluido", "abandonado"])
      .default("em_andamento")
      .notNull(),
    score: int("score"),
    resultBand: varchar("resultBand", { length: 96 }),
    resultSummary: text("resultSummary"),
    startedAt: timestamp("startedAt").defaultNow().notNull(),
    completedAt: timestamp("completedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
);

export const assessmentAnswers = mysqlTable(
  "assessmentAnswers",
  {
    id: int("id").autoincrement().primaryKey(),
    attemptId: int("attemptId").notNull(),
    questionId: int("questionId").notNull(),
    optionId: int("optionId").notNull(),
    score: int("score").notNull(),
    answeredAt: timestamp("answeredAt").defaultNow().notNull(),
  },
  table => [uniqueIndex("assessmentAnswers_question_unique").on(table.attemptId, table.questionId)],
);

export const recommendations = mysqlTable("recommendations", {
  id: int("id").autoincrement().primaryKey(),
  assessmentId: int("assessmentId"),
  title: varchar("title", { length: 160 }).notNull(),
  body: text("body").notNull(),
  actionLabel: varchar("actionLabel", { length: 96 }),
  actionUrl: varchar("actionUrl", { length: 500 }),
  minScore: int("minScore"),
  maxScore: int("maxScore"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Assessment = typeof assessments.$inferSelect;
export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;
export type AssessmentOption = typeof assessmentOptions.$inferSelect;
export type AssessmentAttempt = typeof assessmentAttempts.$inferSelect;
