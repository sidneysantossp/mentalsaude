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

export const contentOpportunities = mysqlTable(
  "contentOpportunities",
  {
    id: int("id").autoincrement().primaryKey(),
    cluster: varchar("cluster", { length: 64 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    primaryQuery: varchar("primaryQuery", { length: 255 }).notNull(),
    secondaryQueries: text("secondaryQueries"), // JSON string
    searchIntent: varchar("searchIntent", { length: 64 }).notNull(),
    funnelStage: varchar("funnelStage", { length: 64 }).notNull(),
    contentType: varchar("contentType", { length: 64 }).notNull(),
    primaryEntity: varchar("primaryEntity", { length: 128 }).notNull(),
    secondaryEntities: text("secondaryEntities"), // JSON string
    relatedTestSlug: varchar("relatedTestSlug", { length: 64 }),
    opportunityLevel: varchar("opportunityLevel", { length: 32 }).notNull(),
    topicalImportance: varchar("topicalImportance", { length: 32 }).notNull(),
    conversionProximity: varchar("conversionProximity", { length: 32 }).notNull(),
    entityGap: varchar("entityGap", { length: 32 }).notNull(),
    internalLinkValue: varchar("internalLinkValue", { length: 32 }).notNull(),
    evidenceAvailability: varchar("evidenceAvailability", { length: 32 }).notNull(),
    differentiationPotential: varchar("differentiationPotential", { length: 32 }).notNull(),
    status: varchar("status", { length: 64 }).default("planned").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export const contentBriefs = mysqlTable(
  "contentBriefs",
  {
    id: int("id").autoincrement().primaryKey(),
    opportunityId: int("opportunityId").notNull(),
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
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export const contentEvidence = mysqlTable(
  "contentEvidence",
  {
    id: int("id").autoincrement().primaryKey(),
    opportunityId: int("opportunityId"),
    articleSlug: varchar("articleSlug", { length: 255 }),
    claim: text("claim").notNull(),
    source: varchar("source", { length: 255 }).notNull(),
    authors: varchar("authors", { length: 255 }),
    organization: varchar("organization", { length: 255 }),
    year: int("year"),
    url: text("url"),
    evidenceLevel: varchar("evidenceLevel", { length: 64 }).notNull(),
    sourceType: varchar("sourceType", { length: 64 }).notNull(), // primary / secondary
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export const internalLinksGraph = mysqlTable(
  "internalLinksGraph",
  {
    id: int("id").autoincrement().primaryKey(),
    sourceSlug: varchar("sourceSlug", { length: 255 }).notNull(),
    targetSlug: varchar("targetSlug", { length: 255 }).notNull(),
    anchorText: varchar("anchorText", { length: 255 }).notNull(),
    linkType: varchar("linkType", { length: 64 }).notNull(), // pillar_to_supporting, supporting_to_pillar, supporting_to_test, etc.
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export const publicationGates = mysqlTable(
  "publicationGates",
  {
    id: int("id").autoincrement().primaryKey(),
    articleSlug: varchar("articleSlug", { length: 255 }).notNull().unique(),
    status: varchar("status", { length: 64 }).default("BLOCKED").notNull(), // BLOCKED, PASSED, PUBLISHED
    checksJson: text("checksJson").notNull(), // JSON com os 16 critérios validados
    reviewedByUserId: int("reviewedByUserId"),
    reviewedAt: timestamp("reviewedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export const articleVersions = mysqlTable(
  "articleVersions",
  {
    id: int("id").autoincrement().primaryKey(),
    articleSlug: varchar("articleSlug", { length: 255 }).notNull(),
    versionId: varchar("versionId", { length: 64 }).notNull(),
    publishedAt: timestamp("publishedAt").notNull(),
    modifiedAt: timestamp("modifiedAt").defaultNow().notNull(),
    reviewedAt: timestamp("reviewedAt"),
    referencesVersion: varchar("referencesVersion", { length: 64 }),
    reviewerId: int("reviewerId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);
