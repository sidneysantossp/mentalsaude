import { useParams, Link } from "wouter";
import { getCanonicalTest } from "@/data/testsCanonicalDatabase";
import PublicHeader from "@/components/PublicHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock, HelpCircle, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export function CanonicalTestDetailPage() {
  const params = useParams<{ slug: string }>();
  const testSlug = params.slug || "";
  const test = getCanonicalTest(testSlug); // Removido o fallback automático para GAD-7 em slugs inválidos

  if (!test) {
    return (
      <div className="min-h-screen bg-[#f7f9f6] text-[#123f3b]">
        <PublicHeader />
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 pb-16 pt-10">
          <div className="mx-auto max-w-md rounded-3xl border border-[#dceae5] bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto h-12 w-12 text-[#0b7167]" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-[#173e39]">Instrumento não encontrado</h1>
          <p className="mt-2 text-sm text-[#628079]">O teste canônico que você tentou acessar não existe ou foi removido.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/testes">
              <Button className="w-full bg-[#0a615a] text-white hover:bg-[#074d47]">
                Ver Catálogo de Testes
              </Button>
            </Link>
            <Link href="/conteudos">
              <Button variant="outline" className="w-full border-[#0a615a]/30 text-[#0a615a]">
                Hub Editorial
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-[#123f3b]">
      <PublicHeader />

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
              {test.executionRoute ? (
                <Link href={test.executionRoute}>
                  <Button className="h-13 rounded-xl bg-white px-8 text-base font-bold text-[#123f3b] hover:bg-[#edf6f3] shadow-lg">
                    Iniciar Autoavaliação ({test.acronym}) <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <span className="inline-flex min-h-13 items-center rounded-xl border border-[#4e8179] px-6 text-sm font-semibold text-[#b8d8d0]">
                  Execução pública ainda não publicada
                </span>
              )}
              <span className="text-xs text-[#b8d8d0]">
                Resultado confidencial e devolutiva educativa imediata.
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-[#18554f]/80 px-4 py-3 text-xs leading-5 text-[#ccebe3] border border-[#3e7a71]">
              <strong>Aviso aos participantes:</strong> Os recursos de <strong>exportar o resultado em PDF</strong> ou <strong>enviar por e-mail</strong> ao finalizar a avaliação estão disponíveis exclusivamente para usuários <strong>registrados e autenticados</strong> na plataforma.
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
          {test.executionRoute ? (
            <Link href={test.executionRoute}>
              <Button className="h-12 bg-[#1c5d57] px-8 text-white font-bold hover:bg-[#123f3b]">
                Ir para o ambiente de testes da plataforma <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <p className="mx-auto max-w-md text-sm leading-6 text-[#628079]">
              Esta entidade está disponível para consulta metodológica. A execução pública ainda não foi publicada.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
