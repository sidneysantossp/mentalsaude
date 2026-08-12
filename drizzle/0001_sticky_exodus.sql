CREATE TABLE `assessmentAnswers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`attemptId` int NOT NULL,
	`questionId` int NOT NULL,
	`optionId` int NOT NULL,
	`score` int NOT NULL,
	`answeredAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assessmentAnswers_id` PRIMARY KEY(`id`),
	CONSTRAINT `assessmentAnswers_question_unique` UNIQUE(`attemptId`,`questionId`)
);
--> statement-breakpoint
CREATE TABLE `assessmentAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`assessmentId` int NOT NULL,
	`status` enum('em_andamento','concluido','abandonado') NOT NULL DEFAULT 'em_andamento',
	`score` int,
	`resultBand` varchar(96),
	`resultSummary` text,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assessmentAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assessmentOptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionId` int NOT NULL,
	`position` int NOT NULL,
	`label` varchar(180) NOT NULL,
	`score` int NOT NULL,
	CONSTRAINT `assessmentOptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `assessmentOptions_order_unique` UNIQUE(`questionId`,`position`)
);
--> statement-breakpoint
CREATE TABLE `assessmentQuestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`assessmentId` int NOT NULL,
	`position` int NOT NULL,
	`statement` text NOT NULL,
	`supportText` varchar(400),
	`isReverseScored` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assessmentQuestions_id` PRIMARY KEY(`id`),
	CONSTRAINT `assessmentQuestions_order_unique` UNIQUE(`assessmentId`,`position`)
);
--> statement-breakpoint
CREATE TABLE `assessments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(96) NOT NULL,
	`title` varchar(160) NOT NULL,
	`category` varchar(64) NOT NULL,
	`shortDescription` varchar(360) NOT NULL,
	`description` text,
	`durationMinutes` int NOT NULL DEFAULT 5,
	`difficulty` enum('leve','moderada','aprofundada') NOT NULL DEFAULT 'leve',
	`status` enum('rascunho','publicado','inativo') NOT NULL DEFAULT 'rascunho',
	`scoringGuide` json,
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assessments_id` PRIMARY KEY(`id`),
	CONSTRAINT `assessments_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `recommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`assessmentId` int,
	`title` varchar(160) NOT NULL,
	`body` text NOT NULL,
	`actionLabel` varchar(96),
	`actionUrl` varchar(500),
	`minScore` int,
	`maxScore` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `recommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(120),
	`birthYear` int,
	`pronouns` varchar(60),
	`notificationEmail` boolean NOT NULL DEFAULT true,
	`notificationCheckIn` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `userProfiles_userId_unique` UNIQUE(`userId`)
);
