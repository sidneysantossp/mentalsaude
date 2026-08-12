import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Compass, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function MethodologyPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      <header className="sticky top-0 z-40 border-b border-[#e2ede8] bg-[#f7f6ef]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link href="/"><Brand /></Link>
          <nav aria-label="Navegação Principal" className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Como funciona</Link>
            <Link href="/conteudos" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Conteúdos</Link>
            <Link href="/testes" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Testes</Link>
            <Link href="/privacidade" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Privacidade</Link>
          </nav>
          <Button onClick={() => setLocation("/dashboard")} className="h-10 rounded-xl bg-[#0a615a] px-5 text-sm font-semibold text-white hover:bg-[#074d47]">
            Meu painel
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-5 py-16 sm:px-8">
        <div className="mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#6e8c85]">
            <Link href="/" className="hover:text-[#0a7066]">Mental Saúde</Link>
            <span aria-hidden="true">&gt;</span>
            <Link href="/conteudos" className="hover:text-[#0a7066]">Conteúdos</Link>
            <span aria-hidden="true">&gt;</span>
            <span className="text-[#0a7066]">Metodologia Editorial</span>
          </nav>
        </div>

        <article className="rounded-[2.5rem] border border-[#d9e7e2] bg-[#fffefa] p-8 shadow-[0_24px_50px_-30px_rgba(11,70,62,.3)] sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#bde0d6] bg-[#e9f6f2] px-4 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#0a7066]">
            RIGOR E TRANSPARÊNCIA
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b] sm:text-4xl">
            Nossa Metodologia Editorial e Critérios de Evidência
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#5b7871]">
            A Mental Saúde se compromete com a precisão, o respeito ao leitor e a clareza sobre os limites do conhecimento em saúde mental. Conheça as diretrizes que sustentam nosso Knowledge Hub.
          </p>

          <div className="mt-10 space-y-8">
            <section className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#e5f4ef] text-[#0a7066]">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-[#173e39]">1. Fontes transparentes e baseadas em evidências</h2>
                <p className="mt-2 text-sm leading-6 text-[#628079]">
                  Nossos guias e artigos utilizam diretrizes de organizações reconhecidas, literatura científica revisada por pares e instrumentos validados (como o ASRS v1.1, GAD-7 e PHQ-9). Sempre que aplicável, indicamos a origem dos conceitos apresentados.
                </p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#e5f4ef] text-[#0a7066]">
                <CheckCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-[#173e39]">2. Revisão clínica especializada</h2>
                <p className="mt-2 text-sm leading-6 text-[#628079]">
                  Conteúdos que abordam condições de saúde mental, sintomas e orientações de autocuidado passam pela validação de profissionais habilitados (psicólogos e médicos psiquiatras registrados em seus conselhos de classe).
                </p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#e5f4ef] text-[#0a7066]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-[#173e39]">3. Atualização contínua e escuta</h2>
                <p className="mt-2 text-sm leading-6 text-[#628079]">
                  A ciência da mente evolui. Nossos materiais são revisados periodicamente para incorporar novas diretrizes, feedbacks qualificados da comunidade e aprimoramentos na clareza das explicações.
                </p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#e5f4ef] text-[#0a7066]">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-[#173e39]">4. Limites claramente explicados e foco educativo</h2>
                <p className="mt-2 text-sm leading-6 text-[#628079]">
                  Nenhuma autoavaliação ou artigo substitui diagnóstico profissional, psicoterapia ou atendimento médico. Nosso objetivo é apoiar seu autoconhecimento com responsabilidade, incentivando sempre a busca por apoio qualificado quando necessário.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 border-t border-[#e2ede8] pt-8 flex items-center justify-between">
            <Link href="/conteudos" className="text-xs font-bold text-[#0a7066] hover:text-[#064b46]">
              ← Voltar para Conteúdos
            </Link>
            <Button onClick={() => setLocation("/testes")} className="h-10 rounded-xl bg-[#0a615a] px-5 text-xs font-bold text-white hover:bg-[#074d47]">
              Explorar testes disponíveis
            </Button>
          </div>
        </article>
      </main>

      <footer className="border-t border-[#dce9e4] bg-[#f1f8f5] py-12 px-5 sm:px-8 text-xs text-[#628079]">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Brand compact />
            <p className="mt-3 max-w-sm leading-5">Uma plataforma de autoconhecimento responsável. Em situações de risco imediato, procure serviços de emergência ou apoio profissional local (CVV 188).</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold text-[#3b5d56]">
            <Link href="/conteudos" className="hover:text-[#0b7167]">Conteúdos</Link>
            <Link href="/testes" className="hover:text-[#0b7167]">Testes</Link>
            <Link href="/termos" className="hover:text-[#0b7167]">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-[#0b7167]">Privacidade</Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1200px] border-t border-[#e2ede8] pt-6 text-center text-[#7a9991]">
          © 2026 Mental Saúde. Autocuidado começa com informação de qualidade.
        </div>
      </footer>
    </div>
  );
}
