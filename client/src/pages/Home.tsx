import { useAuth } from "@/_core/hooks/useAuth";
import { Brand } from "@/components/Brand";
import { beginLogin } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, ChevronRight, CircleHelp, Clock3, LockKeyhole, Menu, ShieldCheck, Sprout } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const benefits = [
  { icon: BrainCircuit, title: "Baseada em evidências", body: "Instrumentos organizados com linguagem clara para apoiar seu autoconhecimento." },
  { icon: LockKeyhole, title: "Privacidade por padrão", body: "Você controla seus dados, preferências e a forma como acompanha seus registros." },
  { icon: BarChart3, title: "Resultados claros", body: "Visualize seu histórico e perceba mudanças ao longo do tempo, sem conclusões clínicas automáticas." },
  { icon: ShieldCheck, title: "Cuidado responsável", body: "A plataforma reforça que uma autoavaliação não substitui acompanhamento profissional." },
];

const steps = [
  ["1", "Comece por você", "Escolha uma área que deseja compreender melhor e reserve alguns minutos sem interrupções."],
  ["2", "Responda no seu ritmo", "As perguntas aparecem uma por vez, com progresso visível e possibilidade de retomar depois."],
  ["3", "Acompanhe com clareza", "Consulte resultados, registre percepções e encontre próximos passos compatíveis com seu momento."],
];

const faqs = [
  ["As autoavaliações substituem diagnóstico profissional?", "Não. Elas são recursos educativos de autoconhecimento e não oferecem diagnóstico. Se você estiver preocupado com sua saúde mental, procure um profissional habilitado."],
  ["Preciso criar uma conta para realizar um teste?", "Sim. A conta permite proteger suas respostas, manter o histórico e mostrar sua evolução em um espaço pessoal."],
  ["Como meus dados são utilizados?", "Os dados da sua conta são usados para viabilizar sua experiência, preferências e histórico. O painel permite que você revise suas escolhas de notificação."],
  ["O que fazer em uma situação de urgência?", "A plataforma não substitui atendimento emergencial. Em uma situação de risco imediato, procure o serviço de emergência da sua região ou uma rede de apoio profissional."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const assessments = trpc.assessments.listPublished.useQuery();

  const handleAccess = () => {
    if (user) {
      setLocation("/dashboard");
      return;
    }
    beginLogin();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f6ef] text-[#153a36]">
      <header className="relative z-40 mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#375c56] md:flex">
          <a href="#como-funciona" className="transition-colors hover:text-[#08736a]">Como funciona</a>
          <Link href="/testes" className="transition-colors hover:text-[#08736a]">Testes</Link>
          <Link href="/conteudos" className="transition-colors hover:text-[#08736a]">Conteúdos</Link>
          <a href="#seguranca" className="transition-colors hover:text-[#08736a]">Privacidade</a>
          <Button onClick={handleAccess} className="rounded-xl bg-[#0a615a] px-5 text-white hover:bg-[#074d47]">{user ? "Meu painel" : "Entrar"}</Button>
        </nav>
        <button className="rounded-lg p-2 text-[#123f3b] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><Menu className="h-5 w-5" /></button>
        {menuOpen && <nav className="absolute right-5 top-16 flex w-56 flex-col rounded-2xl border border-[#dbe9e4] bg-[#fcfcf8] p-3 shadow-xl md:hidden"><Link href="/testes" className="rounded-lg px-3 py-2 text-sm font-semibold">Testes</Link><Link href="/conteudos" className="rounded-lg px-3 py-2 text-sm font-semibold">Conteúdos</Link><a href="#como-funciona" className="rounded-lg px-3 py-2 text-sm font-semibold">Como funciona</a><Button onClick={handleAccess} className="mt-1 rounded-lg bg-[#0a615a] text-white">{user ? "Meu painel" : "Entrar"}</Button></nav>}
      </header>

      <main>
        <section className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-12 lg:pb-28 lg:pt-20">
          <div className="relative z-10 max-w-2xl pt-3 lg:pt-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#badfd7] bg-[#ecf8f4] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0c7168]"><Sprout className="h-3.5 w-3.5" />Autoconhecimento com cuidado</div>
            <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#123f3b] sm:text-6xl lg:text-7xl">Entenda melhor sua saúde mental <span className="text-[#4eaea1]">com clareza.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#54746e] sm:text-lg">A Mental Saúde oferece uma experiência de autoavaliação acolhedora para ajudar você a observar sinais, organizar percepções e acompanhar seu bem-estar ao longo do tempo.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" onClick={handleAccess} className="h-12 rounded-xl bg-[#0a615a] px-6 text-white hover:bg-[#074d47]">Iniciar meu acompanhamento <ArrowRight className="ml-2 h-4 w-4" /></Button><Link href="/testes"><Button size="lg" variant="outline" className="h-12 w-full rounded-xl border-[#8bbdb3] bg-transparent px-6 text-[#0a615a] hover:bg-[#ebf6f1] sm:w-auto">Ver testes disponíveis</Button></Link></div>
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#66867f]"><CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0" />As autoavaliações são educativas e não substituem diagnóstico, psicoterapia ou atendimento em situações de urgência.</p>
          </div>
          <div className="relative mx-auto w-full max-w-[530px] lg:mx-0">
            <div className="absolute -right-16 top-8 h-72 w-72 rounded-full bg-[#d5ede7] blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#f2dfbd]/70 blur-2xl" />
            <div className="relative h-[410px] overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-[#e3f3ed] via-[#d2e9e1] to-[#94c6bb] shadow-[0_28px_70px_-34px_rgba(9,70,63,.55)] sm:h-[500px]">
              <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border-[30px] border-[#f7f6ef]/60" />
              <div className="absolute bottom-0 left-0 h-56 w-full rounded-[55%_45%_0_0] bg-[#287e74]/85" />
              <div className="absolute bottom-14 left-[18%] h-72 w-1.5 origin-bottom rotate-[13deg] rounded-full bg-[#174f49]" />
              {[[-26, 68, 24, -34], [20, 125, 28, 29], [76, 84, 22, 29], [120, 150, 28, -35], [175, 98, 27, 27], [225, 152, 29, -31]].map(([bottom, left, width, rotation], index) => <span key={index} className="absolute rounded-[100%_0_100%_0] bg-[#7dd0bd]/95" style={{ bottom: `${bottom + 115}px`, left: `calc(18% + ${left}px)`, width: `${width}px`, height: `${width * 1.55}px`, transform: `rotate(${rotation}deg)` }} />)}
              <div className="absolute bottom-8 right-7 w-60 rounded-2xl border border-white/60 bg-[#fcfcf8]/90 p-4 shadow-lg backdrop-blur"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#5a9188]">Pequenos passos</p><p className="mt-2 font-display text-xl font-semibold text-[#174b45]">Cuidar da mente também é se escutar.</p></div>
            </div>
          </div>
        </section>

        <section id="seguranca" className="border-y border-[#dfece7] bg-[#fcfcf8] py-16 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8"><p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#5bb6a9]">Um caminho mais consciente</p><h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-semibold tracking-[-.04em] text-[#123f3b] sm:text-4xl">Por que escolher a Mental Saúde</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{benefits.map(item => <article key={item.title} className="rounded-2xl border border-[#e0ece8] bg-[#fffefa] p-6 shadow-[0_14px_36px_-30px_rgba(12,63,57,.6)]"><item.icon className="h-6 w-6 text-[#0c736a]" /><h3 className="mt-6 font-display text-xl font-semibold text-[#173c37]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#65827c]">{item.body}</p></article>)}</div></div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8"><div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#5bb6a9]">Do seu jeito</p><h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[-.04em] text-[#123f3b]">Cuidar de si começa com uma pausa para observar.</h2><p className="mt-5 max-w-md text-base leading-7 text-[#63817a]">A experiência foi pensada para ser simples e respeitosa com seu momento. Você responde, compreende e acompanha — sem pressa.</p></div><div className="grid gap-4 sm:grid-cols-3">{steps.map(([number, title, body]) => <article key={number} className="rounded-2xl border border-[#dceae5] bg-[#fdfdfa] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0d6760] text-sm font-bold text-white">{number}</span><h3 className="mt-7 font-display text-xl font-semibold text-[#173c37]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#65827c]">{body}</p></article>)}</div></div></section>

        <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8"><div className="rounded-[2rem] bg-[#123f3b] px-7 py-10 text-[#f7f6ef] sm:p-12"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#82d6ca]">Testes de autoavaliação</p><h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Encontre um teste que faça sentido para o seu momento.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-[#c9e3dc]">Cada teste informa sua finalidade, duração estimada e nível de aprofundamento antes de você começar.</p></div><Link href="/testes"><Button className="h-12 rounded-xl bg-[#f7f6ef] px-6 text-[#12423c] hover:bg-white">Explorar catálogo <ChevronRight className="ml-1 h-4 w-4" /></Button></Link></div>{assessments.data && assessments.data.length > 0 && <div className="mt-8 flex flex-wrap gap-3">{assessments.data.slice(0, 3).map(item => <span key={item.id} className="rounded-full border border-[#6eb7aa] px-3 py-1.5 text-xs font-semibold text-[#d4eee7]">{item.title} · {item.durationMinutes} min</span>)}</div>}</div></section>

        <section className="mx-auto max-w-[900px] px-5 pb-20 sm:px-8"><p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#5bb6a9]">Para você se sentir seguro</p><h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-[-.04em] text-[#123f3b]">Perguntas frequentes</h2><div className="mt-8 divide-y divide-[#dce9e4] overflow-hidden rounded-2xl border border-[#dce9e4] bg-[#fffefa]">{faqs.map(([question, answer]) => <details key={question} className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold text-[#234942] marker:hidden">{question}<ChevronRight className="h-4 w-4 shrink-0 text-[#0b7167] transition-transform duration-200 group-open:rotate-90" /></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-[#68857f]">{answer}</p></details>)}</div></section>

        <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8"><div className="grid gap-8 rounded-[2rem] border border-[#dbe9e4] bg-[#fffefa] p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="flex items-center gap-2 text-sm font-semibold text-[#0b7167]"><CheckCircle2 className="h-4 w-4" />Comece quando estiver pronto</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em] text-[#123f3b]">Seu bem-estar merece atenção contínua.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#65827c]">Crie sua conta para acessar o acompanhamento pessoal, histórico de respostas e preferências de privacidade.</p></div><Button onClick={handleAccess} size="lg" className="h-12 rounded-xl bg-[#0a615a] px-6 text-white hover:bg-[#074d47]">{user ? "Abrir meu painel" : "Criar meu espaço"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div></section>
      </main>
      <footer className="border-t border-[#dceae5] bg-[#f0f5f0]"><div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 text-xs text-[#5d7e77] sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12"><div><Brand /><p className="mt-4 max-w-sm leading-5">Uma plataforma de autoconhecimento responsável. Em situações de risco imediato, procure serviços de emergência ou apoio profissional local.</p></div><div className="flex flex-col items-start gap-3 sm:items-end"><nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-[#375c56]"><Link href="/conteudos" className="transition-colors hover:text-[#08736a]">Conteúdos</Link><Link href="/testes" className="transition-colors hover:text-[#08736a]">Testes</Link><Link href="/termos" className="transition-colors hover:text-[#08736a]">Termos de Uso</Link><Link href="/privacidade" className="transition-colors hover:text-[#08736a]">Privacidade</Link></nav><p>© {new Date().getFullYear()} Mental Saúde. Autocuidado começa com informação de qualidade.</p></div></div></footer>
    </div>
  );
}
