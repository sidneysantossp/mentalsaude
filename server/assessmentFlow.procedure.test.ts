import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const fixture = vi.hoisted(() => {
  const assessment = {
    id: 1,
    slug: "asrs-v1-1-adultos-6q",
    title: "Rastreio de atenção e hiperatividade em adultos",
    category: "Atenção e hiperatividade",
    shortDescription: "Screener ASRS v1.1 de 6 perguntas para adultos.",
    description: null,
    durationMinutes: 5,
    difficulty: "leve" as const,
    status: "publicado" as const,
    scoringGuide: { kind: "asrs-v1-1-6" },
    createdByUserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      assessmentId: 1,
      position: index + 1,
      statement: `Pergunta ${index + 1}`,
      supportText: null,
      isReverseScored: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      options: [
        { id: (index + 1) * 10, questionId: index + 1, position: 1, label: "Nunca", score: 0 },
        { id: (index + 1) * 10 + 1, questionId: index + 1, position: 2, label: "Freqüentemente", score: 1 },
      ],
    })),
  };
  return {
    assessment,
    db: {
      getAssessmentWithQuestions: vi.fn(async () => assessment),
      startAttempt: vi.fn(async () => 501),
      submitAttempt: vi.fn(async (input: { attemptId: number; userId: number; answers: Array<{ questionId: number; optionId: number }> }) => {
        if (input.attemptId !== 501 || input.userId !== 7 || input.answers.length !== 6) throw new Error("Fixture inválida");
        return {
          score: 4,
          percentage: 67,
          displayValue: "4 de 6",
          metricLabel: "respostas na faixa destacada",
          band: "Converse com profissional habilitado",
          summary: "Resultado de fixture.",
          recommendations: [{ id: 2, title: "Avaliação clínica", body: "Converse com profissional habilitado.", actionLabel: null, actionUrl: null, minScore: 4, maxScore: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() }],
        };
      }),
    },
  };
});

vi.mock("./db", () => ({
  ...fixture.db,
  listPublishedAssessments: vi.fn(), getUserProfile: vi.fn(), updateUserProfile: vi.fn(), listUserAttempts: vi.fn(), getUserRecommendations: vi.fn(),
  getAdminMetrics: vi.fn(), listAdminAssessments: vi.fn(), createAssessment: vi.fn(), updateAssessment: vi.fn(), replaceAssessmentQuestions: vi.fn(),
  listUsers: vi.fn(), getAdminUserDetail: vi.fn(), setUserRole: vi.fn(),
}));

import { appRouter } from "./routers";

function createContext(): TrpcContext {
  return { user: { id: 7, openId: "fixture-user", name: "Usuário de fixture", email: "fixture@example.com", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

describe("fluxo autenticado de ASRS", () => {
  beforeEach(() => vi.clearAllMocks());
  it("abre, inicia e submete uma autoavaliação publicada retornando a recomendação correspondente", async () => {
    const caller = appRouter.createCaller(createContext());
    const opened = await caller.assessments.get({ id: 1 });
    const attemptId = await caller.assessments.start({ assessmentId: 1 });
    const result = await caller.assessments.submit({ attemptId, answers: opened.questions.map((question, index) => ({ questionId: question.id, optionId: index < 4 ? question.options[1]!.id : question.options[0]!.id })) });

    expect(opened.questions).toHaveLength(6);
    expect(attemptId).toBe(501);
    expect(result.score).toBe(4);
    expect(result.recommendations.map(item => item.title)).toEqual(["Avaliação clínica"]);
    expect(fixture.db.submitAttempt).toHaveBeenCalledTimes(1);
  });
});
