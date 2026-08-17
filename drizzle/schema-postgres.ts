import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 32 }).default("user").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { mode: "date" }).defaultNow().notNull(),
  termsAcceptedAt: timestamp("termsAcceptedAt", { mode: "date" }),
});

export const userProfiles = pgTable(
  "userProfiles",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    userId: integer("userId").notNull(),
    displayName: varchar("displayName", { length: 120 }),
    birthYear: integer("birthYear"),
    pronouns: varchar("pronouns", { length: 60 }),
    notificationEmail: boolean("notificationEmail").default(true).notNull(),
    notificationCheckIn: boolean("notificationCheckIn").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [uniqueIndex("userProfiles_userId_unique").on(table.userId)],
);

export const assessments = pgTable(
  "assessments",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    slug: varchar("slug", { length: 96 }).notNull(),
    title: varchar("title", { length: 160 }).notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    shortDescription: varchar("shortDescription", { length: 360 }).notNull(),
    description: text("description"),
    durationMinutes: integer("durationMinutes").default(5).notNull(),
    difficulty: varchar("difficulty", { length: 32 }).default("leve").notNull(),
    status: varchar("status", { length: 32 }).default("rascunho").notNull(),
    scoringGuide: jsonb("scoringGuide"),
    createdByUserId: integer("createdByUserId"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [uniqueIndex("assessments_slug_unique").on(table.slug)],
);

export const assessmentQuestions = pgTable(
  "assessmentQuestions",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    assessmentId: integer("assessmentId").notNull(),
    position: integer("position").notNull(),
    statement: text("statement").notNull(),
    supportText: varchar("supportText", { length: 400 }),
    isReverseScored: boolean("isReverseScored").default(false).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [uniqueIndex("assessmentQuestions_order_unique").on(table.assessmentId, table.position)],
);

export const assessmentOptions = pgTable(
  "assessmentOptions",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    questionId: integer("questionId").notNull(),
    position: integer("position").notNull(),
    label: varchar("label", { length: 180 }).notNull(),
    score: integer("score").notNull(),
  },
  table => [uniqueIndex("assessmentOptions_order_unique").on(table.questionId, table.position)],
);

export const assessmentAttempts = pgTable(
  "assessmentAttempts",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    userId: integer("userId").notNull(),
    assessmentId: integer("assessmentId").notNull(),
    status: varchar("status", { length: 32 }).default("em_andamento").notNull(),
    score: integer("score"),
    resultBand: varchar("resultBand", { length: 96 }),
    resultSummary: text("resultSummary"),
    startedAt: timestamp("startedAt", { mode: "date" }).defaultNow().notNull(),
    completedAt: timestamp("completedAt", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const assessmentAnswers = pgTable(
  "assessmentAnswers",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    attemptId: integer("attemptId").notNull(),
    questionId: integer("questionId").notNull(),
    optionId: integer("optionId").notNull(),
    score: integer("score").notNull(),
    answeredAt: timestamp("answeredAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const recommendations = pgTable(
  "recommendations",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    title: varchar("title", { length: 180 }).notNull(),
    content: text("content").notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    assessmentId: integer("assessmentId"),
    minScore: integer("minScore"),
    maxScore: integer("maxScore"),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const contentOpportunities = pgTable(
  "contentOpportunities",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    cluster: varchar("cluster", { length: 64 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    primaryKeyword: varchar("primaryKeyword", { length: 120 }).notNull(),
    intent: varchar("intent", { length: 64 }).notNull(),
    priority: varchar("priority", { length: 32 }).notNull(),
    status: varchar("status", { length: 32 }).default("backlog").notNull(),
    targetWordCount: integer("targetWordCount").default(1200).notNull(),
    relatedTestSlug: varchar("relatedTestSlug", { length: 64 }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [uniqueIndex("contentOpportunities_slug_unique").on(table.slug)],
);

export const contentEvidence = pgTable(
  "contentEvidence",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    opportunityId: integer("opportunityId").notNull(),
    sourceTitle: varchar("sourceTitle", { length: 255 }).notNull(),
    sourceUrl: text("sourceUrl").notNull(),
    citationType: varchar("citationType", { length: 64 }).notNull(),
    doiOrIdentifier: varchar("doiOrIdentifier", { length: 128 }),
    keyFinding: text("keyFinding").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const contentBriefs = pgTable(
  "contentBriefs",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    opportunityId: integer("opportunityId").notNull(),
    h1: varchar("h1", { length: 255 }).notNull(),
    outlineJson: jsonb("outlineJson").notNull(),
    clinicalReviewer: varchar("clinicalReviewer", { length: 120 }).notNull(),
    ymylChecklistJson: jsonb("ymylChecklistJson").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const internalLinksGraph = pgTable(
  "internalLinksGraph",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    sourceSlug: varchar("sourceSlug", { length: 191 }).notNull(),
    targetSlug: varchar("targetSlug", { length: 191 }).notNull(),
    anchorText: varchar("anchorText", { length: 120 }).notNull(),
    linkType: varchar("linkType", { length: 64 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const articleVersions = pgTable(
  "articleVersions",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    version: varchar("version", { length: 32 }).notNull(),
    markdownContent: text("markdownContent").notNull(),
    author: varchar("author", { length: 120 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export const publicationGates = pgTable(
  "publicationGates",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    gateName: varchar("gateName", { length: 64 }).notNull(),
    status: varchar("status", { length: 32 }).notNull(),
    checkedBy: varchar("checkedBy", { length: 120 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Assessment = typeof assessments.$inferSelect;
export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;
export type AssessmentOption = typeof assessmentOptions.$inferSelect;
export type AssessmentAttempt = typeof assessmentAttempts.$inferSelect;
export type ContentOpportunity = typeof contentOpportunities.$inferSelect;
export type ContentEvidence = typeof contentEvidence.$inferSelect;
