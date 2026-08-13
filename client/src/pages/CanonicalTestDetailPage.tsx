import { useParams, Link } from "wouter";
import { getCanonicalTest } from "@/data/testsCanonicalDatabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";

export function CanonicalTestDetailPage() {
  const params = useParams<{ slug: string }>();
  const testSlug = params.slug || "gad-7";
  const test = getCanonicalTest(testSlug) || getCanonicalTest("gad-7");

  if (!test) {
    return (
      <div className="min-h-screen bg-[#f7f9f6] pt-24 pb-16 text-[#123f3b]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-2xl font-bold">Teste não encontrado</h1>
          <p className="mt-2 text-sm text-[#4a6b66]">O instrumento solicitado não está disponível no catálogo.</p>
          <Link href="/testes">
            <Button className="mt-6 bg-[#123f3b] text-white">Voltar para Testes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-[#123f3b]">
      {/* Top bar / Breadcrumb */}
      <div className="border-b border-[#e2ece8] bg-white/85 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/conteudos" className="inline-flex items-center gap-2 text-xs font-bold text-[#1c5d57] hover:text-[#123f3b]">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Hub Editorial
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#edf6f3] px-3 py-1 text-xs font-bold text-[#1c5d57]">
              {test.acronym}
            </span>
            <Link href="/testes">
              <Button size="sm" variant="outline" className="border-[#1c5d57]/30 text-[#123f3b]">
                Ver todos os testes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header Hero da Entidade */}
        <div className="rounded-[2.5rem] bg-[#123f3b] p-8 text-white shadow-xl sm:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1c5d57]/40 blur-3xl pointer-events-none" aria-hidden="true" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1c5d57] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#82d6ca]">
              <Sparkles className="h-3.5 w-3.5" /> PÁGINA CANÔNICA DO INSTRUMENTO
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl text-white">
              {test.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#c2dfd8] max-w-2xl">
              {test.description}
            </p>

            {/* Metadados do instrumento */}
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-[#184e48]/90 p-4 border border-[#235852] text-xs font-semibold text-[#a2e6dc]">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-[#82d6ca]" />
                <span>{test.questionCount} perguntas estruturadas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#82d6ca]" />
                <span>{test.durationMinutes} a {test.durationMinutes + 1} minutos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#82d6ca]" />
                <span>Validação Científica</span>
              </div>
            </div>

            {/* CTA para iniciar o questionário */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={test.executionRoute}>
                <Button className="h-13 rounded-xl bg-white px-8 text-base font-bold text-[#123f3b] hover:bg-[#edf6f3] shadow-lg">
                  Iniciar Autoavaliação ({test.acronym}) <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <span className="text-xs text-[#b8d8d0]">
                Resultado confidencial e devolutiva educativa imediata.
              </span>
            </div>
          </div>
        </div>

        {/* Seção de Visão Geral Metodológica */}
        <section className="mt-12 rounded-3xl bg-white p-8 shadow-sm border border-[#e8f0ec]">
          <h2 className="text-xl font-bold text-[#123f3b]">Sobre o Instrumento e Metodologia</h2>
          <p className="mt-4 text-base leading-relaxed text-[#335c57]">
            {test.fullOverview}
          </p>

          <div className="mt-6 rounded-2xl bg-[#f7f9f6] p-6 border border-[#e2ece8]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#123f3b]">Notas Metodológicas e Origem</h3>
            <p className="mt-2 text-sm text-[#4a6b66] leading-relaxed">
              {test.methodologyNotes}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl bg-[#edf6f3]/60 p-4 border border-[#d3e8e2]">
              <CheckCircle2 className="h-5 w-5 text-[#1c5d57] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#123f3b]">Propósito Educativo</h4>
                <p className="mt-1 text-xs text-[#4a6b66] leading-relaxed">
                  Ajuda a mapear a intensidade de sintomas percebidos e estimula o autocuidado informado.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-[#edf6f3]/60 p-4 border border-[#d3e8e2]">
              <ShieldCheck className="h-5 w-5 text-[#1c5d57] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#123f3b]">Sigilo e Privacidade</h4>
                <p className="mt-1 text-xs text-[#4a6b66] leading-relaxed">
                  Suas respostas e escores são processados de forma segura e não compartilham dados clínicos identificáveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link href={test.executionRoute}>
            <Button className="h-12 bg-[#1c5d57] px-8 text-white font-bold hover:bg-[#123f3b]">
              Ir para o ambiente de testes da plataforma <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
