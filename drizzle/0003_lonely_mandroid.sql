CREATE TABLE `articleVersions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleSlug` varchar(255) NOT NULL,
	`versionId` varchar(64) NOT NULL,
	`publishedAt` timestamp NOT NULL,
	`modifiedAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`referencesVersion` varchar(64),
	`reviewerId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `articleVersions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contentBriefs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`opportunityId` int NOT NULL,
	`workingTitle` varchar(255) NOT NULL,
	`h1` varchar(255) NOT NULL,
	`intent` varchar(128) NOT NULL,
	`readerProblem` text NOT NULL,
	`readerOutcome` text NOT NULL,
	`directAnswerGoal` text NOT NULL,
	`primaryEntity` varchar(128) NOT NULL,
	`secondaryEntities` text,
	`requiredSections` text,
	`questionsToAnswer` text,
	`referencesRequired` text,
	`relatedTestSlug` varchar(64),
	`internalLinksIn` text,
	`internalLinksOut` text,
	`originalValueRequirement` text,
	`ymylClassification` varchar(64) NOT NULL DEFAULT 'EDUCATIONAL',
	`reviewRequirements` text,
	`seoNotes` text,
	`aiCitabilityNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contentBriefs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contentEvidence` (
	`id` int AUTO_INCREMENT NOT NULL,
	`opportunityId` int,
	`articleSlug` varchar(255),
	`claim` text NOT NULL,
	`source` varchar(255) NOT NULL,
	`authors` varchar(255),
	`organization` varchar(255),
	`year` int,
	`url` text,
	`evidenceLevel` varchar(64) NOT NULL,
	`sourceType` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contentEvidence_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contentOpportunities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cluster` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`primaryQuery` varchar(255) NOT NULL,
	`secondaryQueries` text,
	`searchIntent` varchar(64) NOT NULL,
	`funnelStage` varchar(64) NOT NULL,
	`contentType` varchar(64) NOT NULL,
	`primaryEntity` varchar(128) NOT NULL,
	`secondaryEntities` text,
	`relatedTestSlug` varchar(64),
	`opportunityLevel` varchar(32) NOT NULL,
	`topicalImportance` varchar(32) NOT NULL,
	`conversionProximity` varchar(32) NOT NULL,
	`entityGap` varchar(32) NOT NULL,
	`internalLinkValue` varchar(32) NOT NULL,
	`evidenceAvailability` varchar(32) NOT NULL,
	`differentiationPotential` varchar(32) NOT NULL,
	`status` varchar(64) NOT NULL DEFAULT 'planned',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contentOpportunities_id` PRIMARY KEY(`id`),
	CONSTRAINT `contentOpportunities_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `internalLinksGraph` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceSlug` varchar(255) NOT NULL,
	`targetSlug` varchar(255) NOT NULL,
	`anchorText` varchar(255) NOT NULL,
	`linkType` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `internalLinksGraph_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `publicationGates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleSlug` varchar(255) NOT NULL,
	`status` varchar(64) NOT NULL DEFAULT 'BLOCKED',
	`checksJson` text NOT NULL,
	`reviewedByUserId` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `publicationGates_id` PRIMARY KEY(`id`),
	CONSTRAINT `publicationGates_articleSlug_unique` UNIQUE(`articleSlug`)
);
