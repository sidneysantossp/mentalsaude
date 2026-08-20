import { afterEach, describe, expect, it, vi } from "vitest";
import { ANXIETY_TEST_COMPLETED_EVENT, trackAnxietyTestCompletion } from "./analytics";

describe("tracking de conclusão de ansiedade", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("dispara o evento GA4 e o registro local seguro para uma conclusão de ansiedade", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, __mentalSaudeAnalytics: [] });

    expect(trackAnxietyTestCompletion({ title: "Teste de Ansiedade (Autoobservação)", category: "Ansiedade e Tensão" })).toBe(true);

    expect(gtag).toHaveBeenCalledWith("event", ANXIETY_TEST_COMPLETED_EVENT, {
      assessment_type: "anxiety",
      completion_method: "submitted",
    });
    const payload = (window as Window & { __mentalSaudeAnalytics: Array<Record<string, unknown>> }).__mentalSaudeAnalytics[0];
    expect(payload).toMatchObject({ event: ANXIETY_TEST_COMPLETED_EVENT, assessment_type: "anxiety", completion_method: "submitted" });
    expect(Object.keys(payload)).not.toEqual(expect.arrayContaining(["score", "percentage", "band", "answers", "responses", "email", "openId", "userId"]));
  });

  it("não dispara o evento para outros instrumentos", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, __mentalSaudeAnalytics: [] });

    expect(trackAnxietyTestCompletion({ title: "Teste de Depressão (Autoobservação)", category: "Humor" })).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
    expect((window as Window & { __mentalSaudeAnalytics: unknown[] }).__mentalSaudeAnalytics).toHaveLength(0);
  });
});
