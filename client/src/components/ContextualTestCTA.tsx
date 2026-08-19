import { useEffect } from "react";
import { Sparkles, Clock, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { CanonicalTestEntity } from "@/data/testsCanonicalDatabase";

type ContextualTestCTAProps = {
  test?: CanonicalTestEntity | null;
  articleSlug: string;
  articleId?: string;
};

export function ContextualTestCTA({ test, articleSlug, articleId = "article" }: ContextualTestCTAProps) {
  if (!test) {
    return null; // Fallback real testado: se o artigo não possui teste associado, o CTA não é renderizado.
  }

  useEffect(() => {
    // Tracking real seguro sem dados pessoais ou clínicos (V1.1 Requirement)
    if (typeof window !== "undefined") {
      const analyticsPayload = {
        event: "contextual_test_cta_view",
        articleId,
        articleSlug,
        testId: test.acronym,
        ctaPosition: "below_continue_exploring",
        timestamp: Date.now()
      };
      (window as any).__mentalSaudeAnalytics = (window as any).__mentalSaudeAnalytics || [];
      (window as any).__mentalSaudeAnalytics.push(analyticsPayload);
      if ((window as any).console && (window as any).__debugAnalytics) {
        console.log("[Analytics Secure View]", analyticsPayload);
      }
    }
  }, [articleId, articleSlug, test]);

  const handleTrackClick = (position: string) => {
    if (typeof window !== "undefined") {
      const clickPayload = {
        event: "contextual_test_cta_click",
        articleId,
        articleSlug,
        testId: test.acronym,
        ctaPosition: position,
        timestamp: Date.now()
      };
      (window as any).__mentalSaudeAnalytics = (window as any).__mentalSaudeAnalytics || [];
      (window as any).__mentalSaudeAnalytics.push(clickPayload);
      if ((window as any).console && (window as any).__debugAnalytics) {
        console.log("[Analytics Secure Click]", clickPayload);
      }
    }
  };

  return (
    <section aria-label="Autoavaliação Relacionada" className="my-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#123f3b] p-6 text-white shadow-[0_24px_60px_-20px_rgba(11,70,62,.45)] sm:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1c5d57]/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#0a615a]/30 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1c5d57] px-4 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#82d6ca]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> AUTOAVALIAÇÃO RELACIONADA
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-[-.03em] text-white sm:text-3xl">
              Quer observar melhor como esses sinais aparecem para você?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c2dfd8] sm:text-base">
              {test.description}
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-[#235852] bg-[#184e48]/90 px-4 py-3 text-xs font-semibold text-[#a2e6dc]">
              <span className="font-bold uppercase tracking-wider text-white">{test.acronym}</span>
              <span className="flex items-center gap-1 text-[#b8d8d0]">
                <HelpCircle className="h-3.5 w-3.5 text-[#82d6ca]" aria-hidden="true" /> {test.questionCount} perguntas
              </span>
              <span className="flex items-center gap-1 text-[#b8d8d0]">
                <Clock className="h-3.5 w-3.5 text-[#82d6ca]" aria-hidden="true" /> {test.durationMinutes}–{test.durationMinutes + 1} minutos
              </span>
              <span className="text-[#82d6ca]">· Resultado imediato</span>
            </div>

            {/* Fluxo semântico correto: ARTICLE -> TEST ENTITY PAGE -> TEST EXECUTION */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={test.targetRoute}
                onClick={() => handleTrackClick("primary_cta_to_entity_page")}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 font-bold text-[#123f3b] transition-all hover:bg-[#edf6f3] hover:shadow-lg"
              >
                Conhecer o teste {test.acronym} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={test.executionRoute}
                onClick={() => handleTrackClick("secondary_cta_to_execution")}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-bold text-[#a2e6dc] transition-colors hover:text-white"
              >
                Como funciona o {test.acronym}
              </Link>
            </div>

            <p className="mt-6 text-[11px] leading-normal text-[#8aa8a1]">
              Autoavaliação não substitui diagnóstico ou avaliação profissional.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center rounded-3xl border border-[#235852] bg-[#184e48]/55 p-8 text-center backdrop-blur-sm">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#235852] text-[#82d6ca] shadow-inner mb-4">
              <Sparkles className="h-8 w-8" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">Instrumento com respaldo metodológico</h3>
            <p className="mt-2 text-xs leading-5 text-[#b8d8d0]">
              Construído para organizar suas percepções de forma clara, segura e com devolutiva educativa imediata.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-[#82d6ca] uppercase tracking-widest">
              <span>Mental Saúde</span>
              <span>·</span>
              <span>Evidência</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
