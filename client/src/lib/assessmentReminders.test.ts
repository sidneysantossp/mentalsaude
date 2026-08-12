import { describe, expect, it } from "vitest";
import { buildAssessmentReminders, formatReminderTiming, REMINDER_INTERVAL_DAYS } from "./assessmentReminders";

const NOW = Date.parse("2026-08-12T12:00:00.000Z");
const daysAgo = (days: number) => new Date(NOW - days * 86_400_000).toISOString();

describe("lembretes de autoavaliação", () => {
  it("classifica como disponível um teste cujo último registro atingiu o intervalo", () => {
    const [reminder] = buildAssessmentReminders([
      { assessmentId: 2, title: "Depressão", status: "concluido", completedAt: daysAgo(REMINDER_INTERVAL_DAYS) },
    ], NOW);

    expect(reminder).toMatchObject({ assessmentId: 2, status: "due", daysSinceLastAttempt: 30, daysUntilDue: 0 });
    expect(formatReminderTiming(reminder)).toContain("completou 30 dias");
  });

  it("mostra um lembrete próximo apenas dentro da janela de nove dias", () => {
    const reminders = buildAssessmentReminders([
      { assessmentId: 3, title: "Ansiedade", status: "concluido", completedAt: daysAgo(25) },
      { assessmentId: 4, title: "Estresse", status: "concluido", completedAt: daysAgo(15) },
    ], NOW);

    expect(reminders).toHaveLength(1);
    expect(reminders[0]).toMatchObject({ assessmentId: 3, status: "soon", daysUntilDue: 5 });
  });

  it("considera somente o registro concluído mais recente de cada teste", () => {
    const reminders = buildAssessmentReminders([
      { assessmentId: 5, title: "Pânico", status: "concluido", completedAt: daysAgo(10) },
      { assessmentId: 5, title: "Pânico", status: "concluido", completedAt: daysAgo(32) },
      { assessmentId: 5, title: "Pânico", status: "em andamento", completedAt: daysAgo(40) },
      { assessmentId: 6, title: "Fobia social", status: "concluido", completedAt: null },
      { assessmentId: 7, title: "TDAH", status: "concluido", completedAt: new Date(NOW + 86_400_000).toISOString() },
    ], NOW);

    expect(reminders).toEqual([]);
  });
});
