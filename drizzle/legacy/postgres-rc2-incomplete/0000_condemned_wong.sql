CREATE TABLE "articleVersions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articleVersions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(191) NOT NULL,
	"version" varchar(32) NOT NULL,
	"markdownContent" text NOT NULL,
	"author" varchar(120) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessmentAnswers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assessmentAnswers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"attemptId" integer NOT NULL,
	"questionId" integer NOT NULL,
	"optionId" integer NOT NULL,
	"score" integer NOT NULL,
	"answeredAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessmentAttempts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assessmentAttempts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"assessmentId" integer NOT NULL,
	"status" varchar(32) DEFAULT 'em_andamento' NOT NULL,
	"score" integer,
	"resultBand" varchar(96),
	"resultSummary" text,
	"startedAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessmentOptions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assessmentOptions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"questionId" integer NOT NULL,
	"position" integer NOT NULL,
	"label" varchar(180) NOT NULL,
	"score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessmentQuestions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assessmentQuestions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"assessmentId" integer NOT NULL,
	"position" integer NOT NULL,
	"statement" text NOT NULL,
	"supportText" varchar(400),
	"isReverseScored" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assessments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(96) NOT NULL,
	"title" varchar(160) NOT NULL,
	"category" varchar(64) NOT NULL,
	"shortDescription" varchar(360) NOT NULL,
	"description" text,
	"durationMinutes" integer DEFAULT 5 NOT NULL,
	"difficulty" varchar(32) DEFAULT 'leve' NOT NULL,
	"status" varchar(32) DEFAULT 'rascunho' NOT NULL,
	"scoringGuide" jsonb,
	"createdByUserId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contentBriefs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contentBriefs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"opportunityId" integer NOT NULL,
	"h1" varchar(255) NOT NULL,
	"outlineJson" jsonb NOT NULL,
	"clinicalReviewer" varchar(120) NOT NULL,
	"ymylChecklistJson" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contentEvidence" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contentEvidence_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"opportunityId" integer NOT NULL,
	"sourceTitle" varchar(255) NOT NULL,
	"sourceUrl" text NOT NULL,
	"citationType" varchar(64) NOT NULL,
	"doiOrIdentifier" varchar(128),
	"keyFinding" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contentOpportunities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contentOpportunities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cluster" varchar(64) NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(191) NOT NULL,
	"primaryKeyword" varchar(120) NOT NULL,
	"intent" varchar(64) NOT NULL,
	"priority" varchar(32) NOT NULL,
	"status" varchar(32) DEFAULT 'backlog' NOT NULL,
	"targetWordCount" integer DEFAULT 1200 NOT NULL,
	"relatedTestSlug" varchar(64),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internalLinksGraph" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "internalLinksGraph_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sourceSlug" varchar(191) NOT NULL,
	"targetSlug" varchar(191) NOT NULL,
	"anchorText" varchar(120) NOT NULL,
	"linkType" varchar(64) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publicationGates" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "publicationGates_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(191) NOT NULL,
	"gateName" varchar(64) NOT NULL,
	"status" varchar(32) NOT NULL,
	"checkedBy" varchar(120) NOT NULL,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recommendations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(180) NOT NULL,
	"content" text NOT NULL,
	"category" varchar(64) NOT NULL,
	"assessmentId" integer,
	"minScore" integer,
	"maxScore" integer,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userProfiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userProfiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"displayName" varchar(120),
	"birthYear" integer,
	"pronouns" varchar(60),
	"notificationEmail" boolean DEFAULT true NOT NULL,
	"notificationCheckIn" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" varchar(32) DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	"termsAcceptedAt" timestamp,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "assessmentOptions_order_unique" ON "assessmentOptions" USING btree ("questionId","position");--> statement-breakpoint
CREATE UNIQUE INDEX "assessmentQuestions_order_unique" ON "assessmentQuestions" USING btree ("assessmentId","position");--> statement-breakpoint
CREATE UNIQUE INDEX "assessments_slug_unique" ON "assessments" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "contentOpportunities_slug_unique" ON "contentOpportunities" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "userProfiles_userId_unique" ON "userProfiles" USING btree ("userId");