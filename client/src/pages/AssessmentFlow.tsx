import { Brand } from "@/components/Brand";
import { useAuth } from "@/_core/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { saveLocalResultHistory } from "@/lib/localResultHistory";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, Download, LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

type Recommendation = { id: number; title: string; body: string; actionLabel: string | null; actionUrl: string | null };
type Result = { score: number; percentage: number; band: string; summary: string; displayValue?: string; metricLabel?: string; recommendations: Recommendation[] };
const TERMS_VERSION = "mental-saude-termos-2026-08";

function drawPdfWrapped(page: any, text: string, font: any, x: number, y: number, width: number, size = 11) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > width && line) { lines.push(line); line = word; } else line = candidate;
  }
  if (line) lines.push(line);
  page.drawText(lines.join("\n"), { x, y, size, font, color: rgb(0.15, 0.28, 0.26), lineHeight: size * 1.45 });
  return y - lines.length * size * 1.45;
}

export default function AssessmentFlow({ id }: { id: string }) { return <ProtectedRoute><AssessmentContent assessmentId={Number(id)} /></ProtectedRoute>; }

function AssessmentContent({ assessmentId }: { assessmentId: number }) {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const assessment = trpc.assessments.get.useQuery({ id: assessmentId }, { enabled: Number.isFinite(assessmentId) && assessmentId > 0 });
  const consent = trpc.user.consent.useQuery();
  const utils = trpc.useUtils();
  const { mutate: acceptTerms, isPending: acceptingTerms } = trpc.user.acceptTerms.useMutation({ onSuccess: () => utils.user.consent.invalidate() });
  const { mutate: createAttempt, isPending: starting } = trpc.assessments.start.useMutation();
  const { mutate: submitAttempt, isPending: submitting } = trpc.assessments.submit.useMutation();
  const startedRef = useRef(false);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [blockingError, setBlockingError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [termsAcceptedLocally, setTermsAcceptedLocally] = useState(false);
  const [ageAcknowledged, setAgeAcknowledged] = useState(false);
  const scoringGuide = assessment.data?.scoringGuide as { kind?: string } | null | undefined;
  const isAsrs = scoringGuide?.kind === "asrs-v1-1-6";
  const hasConsent = Boolean(consent.data?.accepted || termsAcceptedLocally);

  useEffect(() => {
    if (!assessment.data || !hasConsent || (isAsrs && !ageAcknowledged) || startedRef.current) return;
    startedRef.current = true;
    createAttempt({ assessmentId }, { onSuccess: setAttemptId, onError: issue => setBlockingError(issue.message) });
  }, [assessment.data, assessmentId, ageAcknowledged, createAttempt, hasConsent, isAsrs]);

  if (assessment.isLoading || consent.isLoading) return <LoadingScreen message="Preparando sua autoavaliação…" />;
  if (assessment.error || !assessment.data) return <StateScreen title="Não foi possível abrir esta autoavaliação" body="Verifique se o teste continua disponível ou volte ao seu painel para escolher outra opção." action="Voltar ao painel" onAction={() => setLocation("/dashboard")} />;
  if (!hasConsent) return <TermsIntro accepting={acceptingTerms} onAccept={() => acceptTerms({ version: TERMS_VERSION }, { onSuccess: () => setTermsAcceptedLocally(true), onError: issue => setBlockingError(issue.message) })} onExit={() => setLocation("/dashboard")} error={blockingError} />;
  if (isAsrs && !ageAcknowledged) return <AsrsIntro title={assessment.data.title} onContinue={() => setAgeAcknowledged(true)} onExit={() => setLocation("/dashboard")} />;
  if (starting || (!attemptId && !blockingError)) return <LoadingScreen message="Preparando sua autoavaliação…" />;
  if (blockingError) return <StateScreen title="Não conseguimos continuar agora" body={blockingError} action="Voltar ao painel" onAction={() => setLocation("/dashboard")} />;
  if (result) return <ResultScreen result={result} title={assessment.data.title} onFinish={() => setLocation("/dashboard")} />;

  const questions = assessment.data.questions;
  const question = questions[index];
  if (!question) return <StateScreen title="Este teste ainda não tem perguntas" body="A equipe responsável pode estar atualizando o conteúdo. Tente novamente mais tarde." action="Voltar ao painel" onAction={() => setLocation("/dashboard")} />;
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;
  const percentage = Math.round(((index + 1) / questions.length) * 100);
  const handleNext = () => {
    if (!selected) { setError("Selecione uma opção nesta pergunta para continuar."); return; }
    setError(null);
    if (!isLast) return setIndex(current => current + 1);
    if (attemptId) submitAttempt({ attemptId, answers: Object.entries(answers).map(([questionId, optionId]) => ({ questionId: Number(questionId), optionId })) }, { onSuccess: outcome => { setResult(outcome); saveLocalResultHistory(user?.openId ?? user?.id, { assessmentId, title: assessment.data.title, score: outcome.score, percentage: outcome.percentage, band: outcome.band, displayValue: outcome.displayValue, metricLabel: outcome.metricLabel }); }, onError: issue => setError(issue.message) });
  };

  return <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]"><header className="mx-auto flex h-20 max-w-[960px] items-center justify-between px-5 sm:px-8"><Brand compact /><button onClick={() => setLocation("/dashboard")} className="text-sm font-semibold text-[#0a615a] hover:text-[#064b46]">Sair sem concluir</button></header><main className="mx-auto max-w-[780px] px-5 pb-16 pt-10 sm:px-8"><section className="rounded-[2rem] border border-[#d9e9e4] bg-[#fffefa] p-6 shadow-[0_26px_55px_-46px_rgba(11,70,62,.8)] sm:p-10"><div className="flex items-center justify-between gap-4"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#58ab9e]">{assessment.data.category}</span><span className="text-xs font-semibold text-[#66847d]">Pergunta {index + 1} de {questions.length}</span></div><div className="mt-3 flex items-center gap-3"><Progress value={percentage} aria-label={`Progresso: ${percentage}%`} className="h-2 flex-1 bg-[#dcebe6] [&>div]:bg-[#0b7167]" /><span className="min-w-12 text-right text-xs font-bold text-[#0b7167]">{percentage}%</span></div><div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[.12em] text-[#8aa59e]"><span>Início</span><span>{Object.keys(answers).length} respondida{Object.keys(answers).length === 1 ? "" : "s"}</span><span>Conclusão</span></div><div className="mt-10"><p className="text-sm font-semibold text-[#0a7066]">{assessment.data.title}</p><h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-.04em] text-[#173e39] sm:text-4xl">{question.statement}</h1>{question.supportText && <p className="mt-3 text-sm leading-6 text-[#69867f]">{question.supportText}</p>}</div>{isAsrs && <p className="mt-5 rounded-xl border border-[#d7e8e2] bg-[#f0f8f5] px-4 py-3 text-xs leading-5 text-[#4d7169]">As alternativas com marcação teal correspondem às faixas destacadas no screener oficial.</p>}<div className="mt-9 space-y-3">{question.options.map(option => { const highlighted = isAsrs && option.score > 0; const selectedOption = selected === option.id; return <button key={option.id} onClick={() => { setAnswers(current => ({ ...current, [question.id]: option.id })); setError(null); }} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left text-sm font-medium transition-all ${selectedOption ? "border-[#0b7167] bg-[#e9f6f2] text-[#084f49] shadow-[0_10px_22px_-20px_rgba(8,79,73,.8)]" : highlighted ? "border-[#a9d8cf] bg-[#f1faf7] text-[#315c55] hover:border-[#6fb8aa]" : "border-[#dae9e4] bg-white text-[#42635d] hover:border-[#91c7bc] hover:bg-[#f4fbf8]"}`}><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${selectedOption ? "border-[#0b7167] bg-[#0b7167] text-white" : highlighted ? "border-[#76bfb2] bg-[#d7f0e9] text-[#147569]" : "border-[#afcbc4] text-transparent"}`}>{selectedOption ? <CheckCircle2 className="h-4 w-4" /> : highlighted ? "•" : "·"}</span>{option.label}</button>; })}</div>{error && <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#fff2ed] px-4 py-3 text-sm text-[#a14637]"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}<div className="mt-10 flex items-center justify-between gap-4"><Button variant="ghost" onClick={() => { setError(null); setIndex(current => Math.max(0, current - 1)); }} disabled={index === 0} className="text-[#4f716a]"><ArrowLeft className="mr-2 h-4 w-4" />Anterior</Button><Button disabled={submitting} onClick={handleNext} className="rounded-xl bg-[#0a615a] px-5 text-white hover:bg-[#074d47]">{submitting ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Finalizando</> : isLast ? "Ver resultado" : <>Continuar <ArrowRight className="ml-2 h-4 w-4" /></>}</Button></div><p className="mt-7 flex items-start gap-2 border-t border-[#e5eeeb] pt-5 text-xs leading-5 text-[#738f89]"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0b7167]" />Suas respostas ficam associadas ao seu histórico somente após a submissão.</p></section></main></div>;
}

function LoadingScreen({ message }: { message: string }) { return <div className="grid min-h-screen place-items-center bg-[#f7f6ef]"><div className="text-center"><LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[#0b7167]" /><p className="mt-4 text-sm font-medium text-[#45665f]">{message}</p></div></div>; }
function StateScreen({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) { return <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-5"><div className="max-w-md rounded-3xl border border-[#dceae5] bg-[#fffefa] p-8 text-center"><AlertTriangle className="mx-auto h-8 w-8 text-[#b75a48]" /><h1 className="mt-5 font-display text-3xl font-semibold text-[#173e39]">{title}</h1><p className="mt-3 text-sm leading-6 text-[#66827b]">{body}</p><Button onClick={onAction} className="mt-7 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">{action}</Button></div></div>; }
function TermsIntro({ accepting, onAccept, onExit, error }: { accepting: boolean; onAccept: () => void; onExit: () => void; error: string | null }) { const [checked, setChecked] = useState(false); return <div className="min-h-screen bg-[#f7f6ef] px-5 py-12 text-[#153a36]"><main className="mx-auto max-w-2xl"><Brand compact /><section className="mt-10 rounded-[2rem] border border-[#d9e9e4] bg-[#fffefa] p-7 shadow-[0_26px_55px_-46px_rgba(11,70,62,.8)] sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#58ab9e]">Antes de começar</p><h1 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em] text-[#173e39]">Consentimento e termos de uso</h1><div className="mt-6 space-y-4 text-sm leading-6 text-[#5b7972]"><p>As autoavaliações da Mental Saúde são ferramentas educativas de autoconhecimento. Elas não substituem diagnóstico, psicoterapia, atendimento médico ou cuidado em situações de urgência.</p><p>Você poderá interromper o preenchimento a qualquer momento. O resultado será associado ao seu histórico somente quando você concluir e enviar as respostas.</p><p>Para continuar, leia a <a href="/privacidade" className="font-semibold text-[#0b7167] underline">Política de Privacidade</a> e os <a href="/termos" className="font-semibold text-[#0b7167] underline">Termos de Uso</a>.</p></div><label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#cce3dc] bg-[#f2faf7] p-4 text-sm font-medium text-[#315a53]"><input type="checkbox" checked={checked} onChange={event => setChecked(event.currentTarget.checked)} className="mt-0.5 h-4 w-4 accent-[#0b7167]" />Li e compreendo os Termos de Uso, a Política de Privacidade e os limites informados para esta autoavaliação.</label>{error && <p className="mt-4 text-sm text-[#a14637]">{error}</p>}<Button disabled={!checked || accepting} onClick={onAccept} className="mt-7 h-12 w-full rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">{accepting ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Registrando consentimento</> : "Aceitar e continuar"}</Button><Button variant="ghost" onClick={onExit} className="mt-3 w-full text-[#4f716a]"><ArrowLeft className="mr-2 h-4 w-4" />Voltar ao painel</Button></section></main></div>; }
function AsrsIntro({ title, onContinue, onExit }: { title: string; onContinue: () => void; onExit: () => void }) { return <div className="min-h-screen bg-[#f7f6ef] px-5 py-12 text-[#153a36]"><main className="mx-auto max-w-2xl"><Brand compact /><section className="mt-10 rounded-[2rem] border border-[#d9e9e4] bg-[#fffefa] p-7 shadow-[0_26px_55px_-46px_rgba(11,70,62,.8)] sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#58ab9e]">Antes de começar</p><h1 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em] text-[#173e39]">{title}</h1><div className="mt-6 space-y-4 text-sm leading-6 text-[#5b7972]"><p>Esta versão do ASRS v1.1 é destinada apenas a pessoas com <strong>18 anos ou mais</strong> e considera como você tem se sentido e se comportado nos últimos seis meses.</p><p>O resultado é um rastreio inicial: ele não confirma nem exclui TDAH. Um diagnóstico depende de avaliação clínica completa por profissional habilitado.</p><p>Se você estiver preocupado(a) com seus sintomas ou com a sua segurança, procure atendimento profissional ou um serviço de urgência da sua região.</p></div><div className="mt-6 rounded-2xl border border-[#d7e8e2] bg-[#f4faf8] p-4 text-xs leading-5 text-[#54766f]"><strong>Referência:</strong> Kessler RC et al. (2005), <em>Psychological Medicine</em>, 35(2), 245–256. Tradução brasileira: Maria Carmen Viana. <br /><strong>Direitos:</strong> © New York University e Ronald C. Kessler, PhD. Todos os direitos reservados.</div><label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#cce3dc] bg-[#f2faf7] p-4 text-sm font-medium text-[#315a53]"><input type="checkbox" onChange={event => { if (event.currentTarget.checked) onContinue(); }} className="mt-0.5 h-4 w-4 accent-[#0b7167]" />Confirmo que tenho 18 anos ou mais e compreendo que este screener não é diagnóstico.</label><Button variant="ghost" onClick={onExit} className="mt-5 text-[#4f716a]"><ArrowLeft className="mr-2 h-4 w-4" />Voltar ao painel</Button></section></main></div>; }
export function ResultScreen({ result, title, onFinish }: { result: Result; title: string; onFinish: () => void }) {
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const existingRobots = document.querySelector('meta[name="robots"]');
    const createdRobots = !existingRobots;
    const previousContent = existingRobots?.getAttribute("content") ?? "";
    const robots = existingRobots ?? document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex,nofollow,noarchive");
    if (createdRobots) document.head.appendChild(robots);
    return () => {
      if (createdRobots) robots.remove();
      else robots.setAttribute("content", previousContent);
    };
  }, []);
  const [exportError, setExportError] = useState<string | null>(null);
  const exportPdf = async () => {
    setExporting(true);
    try {
      const pdf = await PDFDocument.create();
      const page = pdf.addPage([595, 842]);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
      let y = 790;
      page.drawText("Mental Saúde", { x: 48, y, size: 18, font: bold, color: rgb(0.05, 0.38, 0.34) });
      y -= 34;
      page.drawText("Devolutiva de Autoavaliação", { x: 48, y, size: 11, font, color: rgb(0.35, 0.48, 0.45) });
      y -= 28;
      page.drawText(title, { x: 48, y, size: 17, font: bold, color: rgb(0.08, 0.25, 0.23) });
      y -= 36;
      page.drawText(result.displayValue ?? `${result.percentage}%`, { x: 48, y, size: 28, font: bold, color: rgb(0.04, 0.44, 0.39) });
      y -= 25;
      page.drawText(result.band, { x: 48, y, size: 12, font: bold, color: rgb(0.12, 0.32, 0.29) });
      y -= 28;
      y = drawPdfWrapped(page, result.summary, font, 48, y, 500, 11) - 26;
      page.drawText("Recomendações e próximos passos", { x: 48, y, size: 15, font: bold, color: rgb(0.08, 0.25, 0.23) });
      y -= 25;
      for (const item of result.recommendations) {
        page.drawText(item.title, { x: 48, y, size: 11, font: bold, color: rgb(0.05, 0.38, 0.34) });
        y -= 18;
        y = drawPdfWrapped(page, item.body, font, 48, y, 500, 10) - 18;
      }
      y = Math.max(y, 80);
      drawPdfWrapped(page, "Este documento é uma devolutiva educativa e não substitui avaliação ou diagnóstico profissional.", font, 48, y, 500, 9);
      const bytes = await pdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mental-saude-${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setExportError("Não foi possível gerar o PDF agora. Tente novamente.");
    } finally {
      setExporting(false);
    }
  };

  return <div className="min-h-screen bg-[#f7f6ef] px-5 py-12 text-[#153a36] sm:px-8">
    <main className="mx-auto max-w-[820px] space-y-6">
      <section className="print-card relative overflow-hidden rounded-[2.5rem] bg-[#123f3b] p-8 text-[#f6faf7] shadow-[0_30px_60px_-40px_rgba(11,70,62,.9)] sm:p-12">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#18554f] opacity-40 blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#18554f] px-4 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#86d8ca]"><ShieldCheck className="h-4 w-4" /> Devolutiva de Autoconhecimento</span>
          <span className="text-xs text-[#a3d6cb]">Mental Saúde</span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{title}</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="grid h-32 w-32 shrink-0 place-items-center rounded-3xl border-4 border-[#5cb3a5] bg-[#0b5b54] p-3 text-center shadow-inner">
            <div>
              <span className="block font-display text-3xl font-semibold text-white">{result.displayValue ?? `${result.percentage}%`}</span>
              {result.metricLabel && <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.1em] text-[#a4e2d7]">{result.metricLabel}</span>}
            </div>
          </div>
          <div className="space-y-3">
            <span className="inline-block rounded-lg bg-[#18554f] px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-[#9eeade]">{result.band}</span>
            <p className="text-base leading-7 text-[#e1f2ec]">{result.summary}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-[#dceae5] bg-[#fffefa] p-8 shadow-[0_24px_50px_-40px_rgba(11,70,62,.15)] sm:p-10">
        <div className="border-b border-[#e7f1ee] pb-6">
          <h2 className="font-display text-2xl font-semibold text-[#163e39]">Recomendações e próximos passos</h2>
          <p className="mt-1 text-sm text-[#66837c]">Orientações personalizadas com base na faixa identificada. O acompanhamento profissional permanece fundamental para diagnósticos.</p>
        </div>

        <div className="mt-6 space-y-4">
          {result.recommendations.length ? result.recommendations.map(item => (
            <article key={item.id} className="rounded-2xl border border-[#d4e8e2] bg-[#f4faf8] p-6 transition-all hover:border-[#9ecfc3]">
              <h3 className="font-display text-lg font-semibold text-[#13443e]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#567a72]">{item.body}</p>
              {item.actionUrl && (
                <a href={item.actionUrl} className="mt-4 inline-flex items-center text-sm font-semibold text-[#0b7167] hover:text-[#064b46]">
                  {item.actionLabel ?? "Saiba mais"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              )}
            </article>
          )) : (
            <article className="rounded-2xl border border-[#d4e8e2] bg-[#f4faf8] p-6">
              <h3 className="font-display text-lg font-semibold text-[#13443e]">Espaço para acolhimento e escuta</h3>
              <p className="mt-2 text-sm leading-6 text-[#567a72]">Anote suas percepções e considere conversar com alguém de confiança ou com um profissional habilitado sempre que sentir necessidade.</p>
            </article>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-[#eaf4f1] p-5 text-xs leading-5 text-[#3a635b]">
          <strong>Aviso importante:</strong> Esta ferramenta tem fins educativos e de autoconhecimento. Em caso de sofrimento intenso ou crise emocional, procure apoio especializado ou ligue para o CVV (188).
        </div>

        <div className="print:hidden mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e7f1ee] pt-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={exportPdf} disabled={exporting} variant="outline" className="rounded-xl border-[#9bcac0] bg-white text-[#0a615a] hover:bg-[#eef8f5]">
              {exporting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              {exporting ? "Gerando PDF…" : "Exportar resultado em PDF"}
            </Button>
            <Button onClick={onFinish} className="rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">
              Voltar ao meu painel <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <span className="text-xs text-[#75918a]">Geração local segura</span>
        </div>

        {exportError && <p role="alert" className="mt-4 rounded-xl bg-[#fff2ed] px-4 py-3 text-sm text-[#a14637]">{exportError}</p>}
      </section>
    </main>
  </div>;
}
