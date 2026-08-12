import { Brand } from "@/components/Brand";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

type Recommendation = { id: number; title: string; body: string; actionLabel: string | null; actionUrl: string | null };
type Result = { score: number; percentage: number; band: string; summary: string; displayValue?: string; metricLabel?: string; recommendations: Recommendation[] };

export default function AssessmentFlow({ id }: { id: string }) {
  return <ProtectedRoute><AssessmentContent assessmentId={Number(id)} /></ProtectedRoute>;
}

function AssessmentContent({ assessmentId }: { assessmentId: number }) {
  const [, setLocation] = useLocation();
  const assessment = trpc.assessments.get.useQuery({ id: assessmentId }, { enabled: Number.isFinite(assessmentId) && assessmentId > 0 });
  const { mutate: createAttempt, isPending: starting } = trpc.assessments.start.useMutation();
  const { mutate: submitAttempt, isPending: submitting } = trpc.assessments.submit.useMutation();
  const startedRef = useRef(false);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [ageAcknowledged, setAgeAcknowledged] = useState(false);
  const scoringGuide = assessment.data?.scoringGuide as { kind?: string } | null | undefined;
  const isAsrs = scoringGuide?.kind === "asrs-v1-1-6";

  useEffect(() => {
    if (!assessment.data || startedRef.current || (isAsrs && !ageAcknowledged)) return;
    startedRef.current = true;
    createAttempt({ assessmentId }, { onSuccess: setAttemptId, onError: issue => setError(issue.message) });
  }, [assessment.data, assessmentId, ageAcknowledged, createAttempt, isAsrs]);

  if (assessment.isLoading) return <LoadingScreen message="Preparando sua autoavaliação…" />;
  if (assessment.error || !assessment.data) return <StateScreen title="Não foi possível abrir esta autoavaliação" body="Verifique se o teste continua disponível ou volte ao seu painel para escolher outra opção." action="Voltar ao painel" onAction={() => setLocation("/dashboard")} />;
  if (isAsrs && !ageAcknowledged) return <AsrsIntro title={assessment.data.title} onContinue={() => setAgeAcknowledged(true)} onExit={() => setLocation("/dashboard")} />;
  if (starting || (!attemptId && !error)) return <LoadingScreen message="Preparando sua autoavaliação…" />;
  if (error) return <StateScreen title="Não conseguimos continuar agora" body={error} action="Voltar ao painel" onAction={() => setLocation("/dashboard")} />;
  if (result) return <ResultScreen result={result} title={assessment.data.title} onFinish={() => setLocation("/dashboard")} />;

  const questions = assessment.data.questions;
  const question = questions[index];
  if (!question) return <StateScreen title="Este teste ainda não tem perguntas" body="A equipe responsável pode estar atualizando o conteúdo. Tente novamente mais tarde." action="Voltar ao painel" onAction={() => setLocation("/dashboard")} />;
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;
  const handleNext = () => {
    if (!selected) return setError("Escolha uma opção para continuar.");
    setError(null);
    if (!isLast) return setIndex(current => current + 1);
    if (attemptId) submitAttempt({ attemptId, answers: Object.entries(answers).map(([questionId, optionId]) => ({ questionId: Number(questionId), optionId })) }, { onSuccess: setResult, onError: issue => setError(issue.message) });
  };

  return <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
    <header className="mx-auto flex h-20 max-w-[960px] items-center justify-between px-5 sm:px-8"><Brand compact /><button onClick={() => setLocation("/dashboard")} className="text-sm font-semibold text-[#0a615a] hover:text-[#064b46]">Sair sem concluir</button></header>
    <main className="mx-auto max-w-[780px] px-5 pb-16 pt-10 sm:px-8"><section className="rounded-[2rem] border border-[#d9e9e4] bg-[#fffefa] p-6 shadow-[0_26px_55px_-46px_rgba(11,70,62,.8)] sm:p-10">
      <div className="flex items-center justify-between gap-4"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#58ab9e]">{assessment.data.category}</span><span className="text-xs font-semibold text-[#66847d]">Pergunta {index + 1} de {questions.length}</span></div>
      <Progress value={Math.round(((index + 1) / questions.length) * 100)} className="mt-3 h-1.5 bg-[#dcebe6] [&>div]:bg-[#0b7167]" />
      <div className="mt-10"><p className="text-sm font-semibold text-[#0a7066]">{assessment.data.title}</p><h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-.04em] text-[#173e39] sm:text-4xl">{question.statement}</h1>{question.supportText && <p className="mt-3 text-sm leading-6 text-[#69867f]">{question.supportText}</p>}</div>
      {isAsrs && <p className="mt-5 rounded-xl border border-[#d7e8e2] bg-[#f0f8f5] px-4 py-3 text-xs leading-5 text-[#4d7169]">As alternativas com marcação teal correspondem às faixas destacadas no screener oficial.</p>}
      <div className="mt-9 space-y-3">{question.options.map(option => {
        const highlighted = isAsrs && option.score > 0;
        const selectedOption = selected === option.id;
        return <button key={option.id} onClick={() => { setAnswers(current => ({ ...current, [question.id]: option.id })); setError(null); }} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left text-sm font-medium transition-all ${selectedOption ? "border-[#0b7167] bg-[#e9f6f2] text-[#084f49] shadow-[0_10px_22px_-20px_rgba(8,79,73,.8)]" : highlighted ? "border-[#a9d8cf] bg-[#f1faf7] text-[#315c55] hover:border-[#6fb8aa]" : "border-[#dae9e4] bg-white text-[#42635d] hover:border-[#91c7bc] hover:bg-[#f4fbf8]"}`}><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${selectedOption ? "border-[#0b7167] bg-[#0b7167] text-white" : highlighted ? "border-[#76bfb2] bg-[#d7f0e9] text-[#147569]" : "border-[#afcbc4] text-transparent"}`}>{selectedOption ? <CheckCircle2 className="h-4 w-4" /> : highlighted ? "•" : "·"}</span>{option.label}</button>;
      })}</div>
      {error && <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#fff2ed] px-4 py-3 text-sm text-[#a14637]"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
      <div className="mt-10 flex items-center justify-between gap-4"><Button variant="ghost" onClick={() => { setError(null); setIndex(current => Math.max(0, current - 1)); }} disabled={index === 0} className="text-[#4f716a]"><ArrowLeft className="mr-2 h-4 w-4" />Anterior</Button><Button disabled={submitting} onClick={handleNext} className="rounded-xl bg-[#0a615a] px-5 text-white hover:bg-[#074d47]">{submitting ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Finalizando</> : isLast ? "Ver resultado" : <>Continuar <ArrowRight className="ml-2 h-4 w-4" /></>}</Button></div>
      <p className="mt-7 flex items-start gap-2 border-t border-[#e5eeeb] pt-5 text-xs leading-5 text-[#738f89]"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0b7167]" />{Object.keys(answers).length} de {questions.length} respostas registradas. Você pode voltar e revisar antes de concluir.</p>
    </section></main>
  </div>;
}

function LoadingScreen({ message }: { message: string }) { return <div className="grid min-h-screen place-items-center bg-[#f7f6ef]"><div className="text-center"><LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[#0b7167]" /><p className="mt-4 text-sm font-medium text-[#45665f]">{message}</p></div></div>; }
function StateScreen({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) { return <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-5"><div className="max-w-md rounded-3xl border border-[#dceae5] bg-[#fffefa] p-8 text-center"><AlertTriangle className="mx-auto h-8 w-8 text-[#b75a48]" /><h1 className="mt-5 font-display text-3xl font-semibold text-[#173e39]">{title}</h1><p className="mt-3 text-sm leading-6 text-[#66827b]">{body}</p><Button onClick={onAction} className="mt-7 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">{action}</Button></div></div>; }
function AsrsIntro({ title, onContinue, onExit }: { title: string; onContinue: () => void; onExit: () => void }) { return <div className="min-h-screen bg-[#f7f6ef] px-5 py-12 text-[#153a36]"><main className="mx-auto max-w-2xl"><Brand compact /><section className="mt-10 rounded-[2rem] border border-[#d9e9e4] bg-[#fffefa] p-7 shadow-[0_26px_55px_-46px_rgba(11,70,62,.8)] sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#58ab9e]">Antes de começar</p><h1 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em] text-[#173e39]">{title}</h1><div className="mt-6 space-y-4 text-sm leading-6 text-[#5b7972]"><p>Esta versão do ASRS v1.1 é destinada apenas a pessoas com <strong>18 anos ou mais</strong> e considera como você tem se sentido e se comportado nos últimos seis meses.</p><p>O resultado é um rastreio inicial: ele não confirma nem exclui TDAH. Um diagnóstico depende de avaliação clínica completa por profissional habilitado.</p><p>Se você estiver preocupado(a) com seus sintomas ou com a sua segurança, procure atendimento profissional ou um serviço de urgência da sua região.</p></div><div className="mt-6 rounded-2xl border border-[#d7e8e2] bg-[#f4faf8] p-4 text-xs leading-5 text-[#54766f]"><strong>Referência:</strong> Kessler RC et al. (2005), <em>Psychological Medicine</em>, 35(2), 245–256. Tradução brasileira: Maria Carmen Viana. <br /><strong>Direitos:</strong> © New York University e Ronald C. Kessler, PhD. Todos os direitos reservados.</div><label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#cce3dc] bg-[#f2faf7] p-4 text-sm font-medium text-[#315a53]"><input type="checkbox" onChange={event => { if (event.currentTarget.checked) onContinue(); }} className="mt-0.5 h-4 w-4 accent-[#0b7167]" />Confirmo que tenho 18 anos ou mais e compreendo que este screener não é diagnóstico.</label><Button variant="ghost" onClick={onExit} className="mt-5 text-[#4f716a]"><ArrowLeft className="mr-2 h-4 w-4" />Voltar ao painel</Button></section></main></div>; }
function ResultScreen({ result, title, onFinish }: { result: Result; title: string; onFinish: () => void }) { return <div className="min-h-screen bg-[#f7f6ef] px-5 py-12 text-[#153a36] sm:px-8"><main className="mx-auto max-w-[780px]"><div className="rounded-[2rem] bg-[#123f3b] p-7 text-[#f6faf7] sm:p-10"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#86d8ca]">Autoavaliação concluída</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em]">{title}</h1><div className="mt-8 grid gap-6 sm:grid-cols-[auto_1fr]"><div className="grid h-28 w-28 place-items-center rounded-full border-[8px] border-[#75cabe] bg-[#0b5b54] px-2 text-center"><span className="font-display text-2xl font-semibold">{result.displayValue ?? `${result.percentage}%`}</span>{result.metricLabel && <span className="mt-1 text-[9px] font-semibold uppercase leading-3 tracking-[.08em] text-[#b9e7de]">{result.metricLabel}</span>}</div><div><p className="text-sm font-bold uppercase tracking-[.14em] text-[#8fdbcf]">{result.band}</p><p className="mt-3 text-sm leading-6 text-[#d5ebe5]">{result.summary}</p></div></div></div><div className="mt-5 rounded-[2rem] border border-[#dceae5] bg-[#fffefa] p-7 sm:p-10"><h2 className="font-display text-2xl font-semibold text-[#163e39]">Próximos passos possíveis</h2><p className="mt-2 text-sm leading-6 text-[#66837c]">Estas sugestões são gerais e não substituem uma conversa com profissional habilitado.</p><div className="mt-6 space-y-3">{result.recommendations.length ? result.recommendations.map(item => <article key={item.id} className="rounded-2xl bg-[#eef7f3] p-5"><h3 className="font-semibold text-[#1c4942]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#648078]">{item.body}</p>{item.actionUrl && <a href={item.actionUrl} className="mt-3 inline-flex text-sm font-semibold text-[#0b7167]">{item.actionLabel ?? "Saiba mais"}<ArrowRight className="ml-1 h-4 w-4" /></a>}</article>) : <article className="rounded-2xl bg-[#eef7f3] p-5"><h3 className="font-semibold text-[#1c4942]">Faça uma pausa para se escutar</h3><p className="mt-2 text-sm leading-6 text-[#648078]">Anote como você se sentiu ao responder e considere conversar com alguém de confiança ou com profissional habilitado, se isso fizer sentido para você.</p></article>}</div><Button onClick={onFinish} className="mt-8 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">Voltar ao meu painel <ArrowRight className="ml-2 h-4 w-4" /></Button></div></main></div>; }
