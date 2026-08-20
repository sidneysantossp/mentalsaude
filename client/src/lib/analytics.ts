export const ANXIETY_TEST_COMPLETED_EVENT = "anxiety_test_completed";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __mentalSaudeAnalytics?: Array<Record<string, unknown>>;
};

type AssessmentIdentity = {
  title?: string | null;
  category?: string | null;
};

function normalize(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function isAnxietyAssessment({ title, category }: AssessmentIdentity) {
  return `${normalize(title)} ${normalize(category)}`.includes("ansiedad");
}

/**
 * Registra somente a conclusão agregada de uma autoavaliação de ansiedade.
 * Nunca envia respostas, escore, faixa, título livre, e-mail ou identificadores pessoais.
 */
export function trackAnxietyTestCompletion(identity: AssessmentIdentity) {
  if (!isAnxietyAssessment(identity) || typeof window === "undefined") return false;

  const analyticsWindow = window as AnalyticsWindow;
  const safePayload = {
    event: ANXIETY_TEST_COMPLETED_EVENT,
    assessment_type: "anxiety",
    completion_method: "submitted",
    timestamp: Date.now(),
  };

  analyticsWindow.__mentalSaudeAnalytics = analyticsWindow.__mentalSaudeAnalytics ?? [];
  analyticsWindow.__mentalSaudeAnalytics.push(safePayload);
  analyticsWindow.gtag?.("event", ANXIETY_TEST_COMPLETED_EVENT, {
    assessment_type: "anxiety",
    completion_method: "submitted",
  });
  return true;
}
