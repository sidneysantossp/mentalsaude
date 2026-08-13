import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

const assessmentInput = z.object({
  slug: z.string().min(3).max(96).regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(160),
  category: z.string().min(2).max(64),
  shortDescription: z.string().min(12).max(360),
  description: z.string().max(5000).optional(),
  durationMinutes: z.number().int().min(1).max(90),
  difficulty: z.enum(["leve", "moderada", "aprofundada"]),
  status: z.enum(["rascunho", "publicado", "inativo"]),
});

const questionInput = z.object({
  statement: z.string().min(3).max(1000),
  supportText: z.string().max(400).optional(),
  options: z.array(z.object({ label: z.string().min(1).max(180), score: z.number().int().min(0).max(20) })).min(2).max(8),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  assessments: router({
    listPublished: publicProcedure.query(() => db.listPublishedAssessments()),
    get: protectedProcedure.input(z.object({ id: z.number().int().positive() })).query(async ({ ctx, input }) => {
      const assessment = await db.getAssessmentWithQuestions(input.id);
      if (!assessment || (assessment.status !== "publicado" && ctx.user.role !== "admin")) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Autoavaliação indisponível." });
      }
      return assessment;
    }),
    start: protectedProcedure.input(z.object({ assessmentId: z.number().int().positive() })).mutation(({ ctx, input }) =>
      db.startAttempt(ctx.user.id, input.assessmentId),
    ),
    submit: protectedProcedure
      .input(z.object({
        attemptId: z.number().int().positive(),
        answers: z.array(z.object({ questionId: z.number().int().positive(), optionId: z.number().int().positive() })).min(1),
      }))
      .mutation(({ ctx, input }) => db.submitAttempt({ ...input, userId: ctx.user.id })),
  }),
  user: router({
    consent: protectedProcedure.query(({ ctx }) => db.getTermsConsent(ctx.user.id)),
    acceptTerms: protectedProcedure
      .input(z.object({ version: z.string().min(1).max(64) }))
      .mutation(({ ctx, input }) => db.acceptTerms(ctx.user.id, input.version)),
    profile: protectedProcedure.query(({ ctx }) => db.getUserProfile(ctx.user.id)),
    updateProfile: protectedProcedure
      .input(z.object({
        displayName: z.string().max(120).optional(),
        birthYear: z.number().int().min(1900).max(new Date().getFullYear()).nullable().optional(),
        pronouns: z.string().max(60).optional(),
        notificationEmail: z.boolean().optional(),
        notificationCheckIn: z.boolean().optional(),
      }))
      .mutation(({ ctx, input }) => db.updateUserProfile(ctx.user.id, input)),
    attempts: protectedProcedure.query(({ ctx }) => db.listUserAttempts(ctx.user.id)),
    recommendations: protectedProcedure.query(({ ctx }) => db.getUserRecommendations(ctx.user.id)),
  }),
  admin: router({
    metrics: adminProcedure.query(() => db.getAdminMetrics()),
    assessments: adminProcedure.query(() => db.listAdminAssessments()),
    assessment: adminProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => db.getAssessmentWithQuestions(input.id)),
    createAssessment: adminProcedure.input(assessmentInput).mutation(({ ctx, input }) => db.createAssessment({ ...input, createdByUserId: ctx.user.id })),
    updateAssessment: adminProcedure
      .input(z.object({ id: z.number().int().positive(), changes: assessmentInput.omit({ slug: true }).partial() }))
      .mutation(({ input }) => db.updateAssessment(input.id, input.changes)),
    replaceQuestions: adminProcedure
      .input(z.object({ assessmentId: z.number().int().positive(), questions: z.array(questionInput).min(1).max(60) }))
      .mutation(({ input }) => db.replaceAssessmentQuestions(input.assessmentId, input.questions)),
    users: adminProcedure.input(z.object({ search: z.string().max(120).optional() }).optional()).query(({ input }) => db.listUsers(input?.search)),
    user: adminProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => db.getAdminUserDetail(input.id)),
    setUserRole: adminProcedure
      .input(z.object({ userId: z.number().int().positive(), role: z.enum(["user", "admin"]) }))
      .mutation(({ input }) => db.setUserRole(input.userId, input.role)),
    contentAuthorityData: adminProcedure.query(async () => {
      await db.seedAnxietyOpportunitiesIfNeeded();
      await db.seedEvidenceIfNeeded();
      const opportunities = await db.getContentOpportunities("ansiedade");
      const evidence = await db.getContentEvidence();
      const gateResult = await db.evaluatePublicationGate("sintomas-de-ansiedade");
      return {
        opportunities,
        evidence,
        gates: [gateResult],
        coverage: {
          contentCoverage: 26.7, // 4 de 15
          intentCoverage: 100,
          entityCoverage: 92.5,
          internalLinkCoverage: 85.0,
          orphanContents: 0,
          brokenLinks: 0
        }
      };
    }),
    evaluateGate: adminProcedure
      .input(z.object({ articleSlug: z.string().min(1) }))
      .mutation(async ({ input }) => {
        return db.evaluatePublicationGate(input.articleSlug);
      }),
  }),
});

export type AppRouter = typeof appRouter;
