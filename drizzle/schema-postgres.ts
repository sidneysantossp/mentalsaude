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

export const users = pgTable("users", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 32 }).$type<"user" | "admin">().default("user").notNull(),
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
    difficulty: varchar("difficulty", { length: 32 }).$type<"leve" | "moderada" | "aprofundada">().default("leve").notNull(),
    status: varchar("status", { length: 32 }).$type<"rascunho" | "publicado" | "inativo">().default("rascunho").notNull(),
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

export const assessmentAttempts = pgTable("assessmentAttempts", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("userId").notNull(),
  assessmentId: integer("assessmentId").notNull(),
  status: varchar("status", { length: 32 }).$type<"em_andamento" | "concluido" | "abandonado">().default("em_andamento").notNull(),
  score: integer("score"),
  resultBand: varchar("resultBand", { length: 96 }),
  resultSummary: text("resultSummary"),
  startedAt: timestamp("startedAt", { mode: "date" }).defaultNow().notNull(),
  completedAt: timestamp("completedAt", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

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
  table => [uniqueIndex("assessmentAnswers_question_unique").on(table.attemptId, table.questionId)],
);

export const recommendations = pgTable("recommendations", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  assessmentId: integer("assessmentId"),
  title: varchar("title", { length: 160 }).notNull(),
  body: text("body").notNull(),
  actionLabel: varchar("actionLabel", { length: 96 }),
  actionUrl: varchar("actionUrl", { length: 500 }),
  minScore: integer("minScore"),
  maxScore: integer("maxScore"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const contentOpportunities = pgTable(
  "contentOpportunities",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    cluster: varchar("cluster", { length: 64 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    primaryQuery: varchar("primaryQuery", { length: 255 }).notNull(),
    secondaryQueries: text("secondaryQueries"),
    searchIntent: varchar("searchIntent", { length: 64 }).notNull(),
    funnelStage: varchar("funnelStage", { length: 64 }).notNull(),
    contentType: varchar("contentType", { length: 64 }).notNull(),
    primaryEntity: varchar("primaryEntity", { length: 128 }).notNull(),
    secondaryEntities: text("secondaryEntities"),
    relatedTestSlug: varchar("relatedTestSlug", { length: 64 }),
    opportunityLevel: varchar("opportunityLevel", { length: 32 }).notNull(),
    topicalImportance: varchar("topicalImportance", { length: 32 }).notNull(),
    conversionProximity: varchar("conversionProximity", { length: 32 }).notNull(),
    entityGap: varchar("entityGap", { length: 32 }).notNull(),
    internalLinkValue: varchar("internalLinkValue", { length: 32 }).notNull(),
    evidenceAvailability: varchar("evidenceAvailability", { length: 32 }).notNull(),
    differentiationPotential: varchar("differentiationPotential", { length: 32 }).notNull(),
    status: varchar("status", { length: 64 }).default("planned").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [uniqueIndex("contentOpportunities_slug_unique").on(table.slug)],
);

export const contentBriefs = pgTable("contentBriefs", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  opportunityId: integer("opportunityId").notNull(),
  workingTitle: varchar("workingTitle", { length: 255 }).notNull(),
  h1: varchar("h1", { length: 255 }).notNull(),
  intent: varchar("intent", { length: 128 }).notNull(),
  readerProblem: text("readerProblem").notNull(),
  readerOutcome: text("readerOutcome").notNull(),
  directAnswerGoal: text("directAnswerGoal").notNull(),
  primaryEntity: varchar("primaryEntity", { length: 128 }).notNull(),
  secondaryEntities: text("secondaryEntities"),
  requiredSections: text("requiredSections"),
  questionsToAnswer: text("questionsToAnswer"),
  referencesRequired: text("referencesRequired"),
  relatedTestSlug: varchar("relatedTestSlug", { length: 64 }),
  internalLinksIn: text("internalLinksIn"),
  internalLinksOut: text("internalLinksOut"),
  originalValueRequirement: text("originalValueRequirement"),
  ymylClassification: varchar("ymylClassification", { length: 64 }).default("EDUCATIONAL").notNull(),
  reviewRequirements: text("reviewRequirements"),
  seoNotes: text("seoNotes"),
  aiCitabilityNotes: text("aiCitabilityNotes"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const contentEvidence = pgTable("contentEvidence", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  opportunityId: integer("opportunityId"),
  articleSlug: varchar("articleSlug", { length: 255 }),
  claim: text("claim").notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  authors: varchar("authors", { length: 255 }),
  organization: varchar("organization", { length: 255 }),
  year: integer("year"),
  url: text("url"),
  evidenceLevel: varchar("evidenceLevel", { length: 64 }).notNull(),
  sourceType: varchar("sourceType", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const internalLinksGraph = pgTable("internalLinksGraph", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  sourceSlug: varchar("sourceSlug", { length: 255 }).notNull(),
  targetSlug: varchar("targetSlug", { length: 255 }).notNull(),
  anchorText: varchar("anchorText", { length: 255 }).notNull(),
  linkType: varchar("linkType", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const articleVersions = pgTable("articleVersions", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  articleSlug: varchar("articleSlug", { length: 255 }).notNull(),
  versionId: varchar("versionId", { length: 64 }).notNull(),
  publishedAt: timestamp("publishedAt", { mode: "date" }).notNull(),
  modifiedAt: timestamp("modifiedAt", { mode: "date" }).defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt", { mode: "date" }),
  referencesVersion: varchar("referencesVersion", { length: 64 }),
  reviewerId: integer("reviewerId"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const publicationGates = pgTable(
  "publicationGates",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    articleSlug: varchar("articleSlug", { length: 255 }).notNull(),
    status: varchar("status", { length: 64 }).default("BLOCKED").notNull(),
    checksJson: text("checksJson").notNull(),
    reviewedByUserId: integer("reviewedByUserId"),
    reviewedAt: timestamp("reviewedAt", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [uniqueIndex("publicationGates_articleSlug_unique").on(table.articleSlug)],
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Assessment = typeof assessments.$inferSelect;
export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;
export type AssessmentOption = typeof assessmentOptions.$inferSelect;
export type AssessmentAttempt = typeof assessmentAttempts.$inferSelect;
export type ContentOpportunity = typeof contentOpportunities.$inferSelect;
export type ContentEvidence = typeof contentEvidence.$inferSelect;
