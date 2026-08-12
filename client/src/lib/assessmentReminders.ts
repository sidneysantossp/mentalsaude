export const REMINDER_INTERVAL_DAYS = 30;
export const REMINDER_SOON_WINDOW_DAYS = 9;

export type ReminderAttempt = {
  assessmentId: number;
  title: string;
  status: string;
  completedAt: Date | string | null;
};

export type AssessmentReminder = {
  assessmentId: number;
  title: string;
  completedAt: string;
  daysSinceLastAttempt: number;
  daysUntilDue: number;
  status: "due" | "soon";
};

function timestamp(value: Date | string | null) {
  if (!value) return null;
  const date = new Date(value).getTime();
  return Number.isFinite(date) ? date : null;
}

function daysBetween(later: number, earlier: number) {
  return Math.max(0, Math.floor((later - earlier) / 86_400_000));
}

export function buildAssessmentReminders(
  attempts: ReminderAttempt[],
  now = Date.now(),
): AssessmentReminder[] {
  const latestByAssessment = new Map<number, ReminderAttempt & { completedTimestamp: number }>();

  for (const attempt of attempts) {
    if (attempt.status !== "concluido") continue;
    const completedTimestamp = timestamp(attempt.completedAt);
    if (completedTimestamp === null || completedTimestamp > now) continue;
    const current = latestByAssessment.get(attempt.assessmentId);
    if (!current || completedTimestamp > current.completedTimestamp) {
      latestByAssessment.set(attempt.assessmentId, { ...attempt, completedTimestamp });
    }
  }

  return Array.from(latestByAssessment.values())
    .map(attempt => {
      const daysSinceLastAttempt = daysBetween(now, attempt.completedTimestamp);
      const daysUntilDue = REMINDER_INTERVAL_DAYS - daysSinceLastAttempt;
      return {
        assessmentId: attempt.assessmentId,
        title: attempt.title,
        completedAt: new Date(attempt.completedTimestamp).toISOString(),
        daysSinceLastAttempt,
        daysUntilDue,
        status: daysUntilDue <= 0 ? "due" as const : "soon" as const,
      };
    })
    .filter(reminder => reminder.status === "due" || reminder.daysUntilDue <= REMINDER_SOON_WINDOW_DAYS)
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === "due" ? -1 : 1;
      return a.daysUntilDue - b.daysUntilDue;
    });
}

export function formatReminderTiming(reminder: AssessmentReminder) {
  if (reminder.status === "due") {
    if (reminder.daysSinceLastAttempt === REMINDER_INTERVAL_DAYS) return "Seu último registro completou 30 dias";
    return `Seu último registro foi há ${reminder.daysSinceLastAttempt} dias`;
  }
  if (reminder.daysUntilDue === 1) return "Um novo check-in pode fazer sentido amanhã";
  return `Um novo check-in pode fazer sentido em cerca de ${reminder.daysUntilDue} dias`;
}
