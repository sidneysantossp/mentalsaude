import { useAuth } from "@/_core/hooks/useAuth";
import AssessmentReminders from "@/components/AssessmentReminders";
import DashboardLayout from "@/components/DashboardLayout";
import LocalResultHistory from "@/components/LocalResultHistory";
import SavedContentSection from "@/components/SavedContentSection";
import FavoritesSection from "@/components/FavoritesSection";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { buildAssessmentReminders } from "@/lib/assessmentReminders";
import { ArrowRight, BarChart3, CalendarDays, ClipboardList, Eye, HeartHandshake, Info, Plus, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function UserDashboard() {
  return <ProtectedRoute><UserDashboardContent /></ProtectedRoute>;
}

function UserDashboardContent() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const attempts = trpc.user.attempts.useQuery();
  const recommendations = trpc.user.recommendations.useQuery();

  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(() => {
    const selected = sessionStorage.getItem("mental-saude:selected-assessment");
    return selected ? Number(selected) : null;
  });

  const completed = useMemo(() => (attempts.data ?? []).filter(item => item.status === "concluido"), [attempts.data]);
  const reminders = useMemo(() => buildAssessmentReminders(completed), [completed]);
  const chartData = completed.slice(0, 8).reverse().map(item => ({
    label: item.completedAt ? new Date(item.completedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "—",
    score: item.score ?? 0,
  }));
  const latest = completed[0];

  return <DashboardLayout><div className="page-enter"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#58ab9e]">Seu espaço de cuidado</p><h1 className="mt-2 font-display text-4xl font-semibold tracking-[-.045em] text-[#123f3b]">Olá, {user?.name?.split(" ")[0] ?? "você"}.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#66837c]">Aqui você pode retomar sua jornada de autoconhecimento com privacidade e no seu ritmo.</p></div><Button onClick={() => setLocation("/testes")} className="h-11 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]"><Plus className="mr-2 h-4 w-4" />Começar autoavaliação</Button></div>
  {selectedAssessment && <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#bde0d6] bg-[#e9f6f2] p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-[#0b7066]">Sua autoavaliação está pronta para começar.</p><p className="mt-1 text-xs leading-5 text-[#5a7c74]">Você chegou ao seu painel com segurança. Quando estiver pronto, inicie o teste selecionado.</p></div><Button onClick={() => { sessionStorage.removeItem("mental-saude:selected-assessment"); setSelectedAssessment(null); setLocation(`/avaliacao/${selectedAssessment}`); }} className="shrink-0 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">Iniciar agora <ArrowRight className="ml-2 h-4 w-4" /></Button></section>}
  <AssessmentReminders reminders={reminders} onStart={assessmentId => setLocation(`/avaliacao/${assessmentId}`)} />
  <section className={selectedAssessment ? "mt-6 grid gap-4 md:grid-cols-3" : "mt-8 grid gap-4 md:grid-cols-3"}><Metric icon={ClipboardList} label="Autoavaliações concluídas" value={String(completed.length)} hint="Em seu histórico pessoal" /><Metric icon={CalendarDays} label="Último registro" value={latest?.completedAt ? new Date(latest.completedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "Ainda não iniciado"} hint={latest?.title ?? "Escolha um teste para começar"} /><Metric icon={HeartHandshake} label="Seu ritmo importa" value="Com gentileza" hint="Você decide quando retornar" /></section>
  <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]"><div className="rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="flex items-center gap-2 text-sm font-semibold text-[#0a7066]"><BarChart3 className="h-4 w-4" />Sua evolução</p><h2 className="mt-2 font-display text-2xl font-semibold text-[#173e39]">Registros ao longo do tempo</h2></div>{completed.length > 0 && <span className="rounded-full bg-[#e5f4ef] px-3 py-1 text-xs font-bold text-[#0a7066]">{completed.length} resultado{completed.length > 1 ? "s" : ""}</span>}</div>{chartData.length > 1 ? <div className="mt-8 h-60"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ left: -20, right: 6, top: 10 }}><defs><linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#61c2b4" stopOpacity={.45} /><stop offset="100%" stopColor="#61c2b4" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#69867f", fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#69867f", fontSize: 11 }} /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dce9e4", boxShadow: "0 12px 30px -20px rgba(12,65,58,.6)" }} /><Area type="monotone" dataKey="score" stroke="#0b7167" strokeWidth={2.5} fill="url(#scoreGradient)" /></AreaChart></ResponsiveContainer></div> : <div className="mt-7 rounded-2xl bg-[#f1f8f5] px-5 py-9 text-center"><Sparkles className="mx-auto h-6 w-6 text-[#53b2a4]" /><p className="mt-3 text-sm font-semibold text-[#31584f]">Sua evolução aparecerá aqui.</p><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#6b8881]">Após realizar avaliações em momentos diferentes, você poderá acompanhar seus registros em uma visualização pessoal.</p></div>}</div>
  <div className="rounded-3xl bg-[#123f3b] p-6 text-[#f7faf8] sm:p-7"><Sparkles className="h-6 w-6 text-[#82d6ca]" /><h2 className="mt-6 font-display text-2xl font-semibold">Sugestões para seu momento</h2>{recommendations.data?.latest ? <><p className="mt-3 text-xs font-semibold uppercase tracking-[.11em] text-[#82d6ca]">Com base em {recommendations.data.latest.title}</p>{recommendations.data.recommendations.length ? <div className="mt-4 space-y-3">{recommendations.data.recommendations.slice(0, 2).map(item => <div key={item.id}><p className="text-sm font-semibold text-white">{item.title}</p><p className="mt-1 text-xs leading-5 text-[#c9e4dc]">{item.body}</p></div>)}</div> : <p className="mt-3 text-sm leading-6 text-[#cae6df]">Continue observando como você se sente e considere conversar com profissional habilitado se desejar aprofundar suas percepções.</p>}</> : <p className="mt-3 text-sm leading-6 text-[#cae6df]">Conclua uma autoavaliação para ver, quando configuradas, sugestões gerais associadas ao seu resultado mais recente.</p>}<Button variant="outline" onClick={() => setLocation("/perfil")} className="mt-7 border-[#78bcb0] bg-transparent text-[#f7faf8] hover:bg-[#215a54] hover:text-white">Ver minhas preferências <ArrowRight className="ml-2 h-4 w-4" /></Button></div></section>
  <LocalResultHistory userKey={user?.openId ?? user?.id} />
  <SavedContentSection userKey={user?.openId ?? user?.id} />
  <FavoritesSection userKey={user?.openId ?? user?.id} />
  <section className="mt-6 rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-[#0a7066]">Histórico recente</p><h2 className="mt-2 font-display text-2xl font-semibold text-[#173e39]">Suas autoavaliações</h2></div><button className="text-sm font-semibold text-[#0b7167] hover:text-[#084f49]" onClick={() => setLocation("/testes")}>Ver testes</button></div>{attempts.isLoading ? <div className="mt-7 h-20 animate-pulse rounded-2xl bg-[#edf5f2]" /> : attempts.data?.length ? <div className="mt-6 divide-y divide-[#e5eeeb]">{attempts.data.slice(0, 5).map(item => <article key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-[#244943]">{item.title}</p><p className="mt-1 text-xs text-[#6d8982]">{item.completedAt ? new Date(item.completedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "Não concluído"}</p></div><div className="flex flex-wrap items-center justify-end gap-2"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "concluido" ? "bg-[#e4f4ef] text-[#087068]" : "bg-[#fff1de] text-[#9a641b]"}`}>{item.status === "concluido" ? item.resultBand ?? "Concluído" : "Não concluído"}</span>{item.status === "concluido" ? <><Button size="sm" variant="outline" onClick={() => setLocation(`/avaliacao/${item.assessmentId}/resultado/${item.id}`)} className="rounded-lg border-[#9bcac0] bg-white text-[#0a615a] hover:bg-[#eef8f5]"><Eye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />Ver resultado</Button><Button size="sm" onClick={() => setLocation(`/avaliacao/${item.assessmentId}`)} className="rounded-lg bg-[#0a615a] text-white">Refazer teste</Button></> : <Button size="sm" onClick={() => setLocation(`/avaliacao/${item.assessmentId}`)} className="rounded-lg bg-[#0a615a] text-white">Iniciar novamente</Button>}</div></article>)}</div> : <div className="mt-6 flex flex-col items-center rounded-2xl bg-[#f3f8f5] px-6 py-10 text-center"><Info className="h-6 w-6 text-[#5db5a8]" /><p className="mt-3 text-sm font-semibold text-[#31584f]">Seu histórico começa aqui.</p><p className="mt-1 max-w-md text-xs leading-5 text-[#6b8881]">Quando você concluir uma autoavaliação, o resultado será guardado com segurança neste espaço.</p></div>}</section></div></DashboardLayout>;
}

function Metric({ icon: Icon, label, value, hint }: { icon: typeof ClipboardList; label: string; value: string; hint: string }) {
  return <article className="rounded-2xl border border-[#dce9e4] bg-[#fffefa] p-5"><Icon className="h-5 w-5 text-[#0b7167]" /><p className="mt-5 text-xs font-bold uppercase tracking-[.12em] text-[#71948c]">{label}</p><p className="mt-2 font-display text-2xl font-semibold text-[#193f39]">{value}</p><p className="mt-1 text-xs text-[#718f88]">{hint}</p></article>;
}
