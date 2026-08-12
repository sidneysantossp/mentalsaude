import { BarChart3, CalendarClock, Info, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { clearLocalResultHistory, LocalResultRecord, readLocalResultHistory } from "@/lib/localResultHistory";

export default function LocalResultHistory({ userKey }: { userKey?: string | number | null }) {
  const [records, setRecords] = useState<LocalResultRecord[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("all");

  useEffect(() => {
    setRecords(readLocalResultHistory(userKey));
  }, [userKey]);

  const assessmentOptions = useMemo(() => {
    const unique = new Map<number, string>();
    records.forEach(record => unique.set(record.assessmentId, record.title));
    return Array.from(unique.entries()).sort((a, b) => a[1].localeCompare(b[1], "pt-BR"));
  }, [records]);

  const filteredRecords = useMemo(() => {
    if (selectedAssessmentId === "all") return records;
    return records.filter(record => String(record.assessmentId) === selectedAssessmentId);
  }, [records, selectedAssessmentId]);

  const chartData = useMemo(() => [...filteredRecords].reverse().map(record => ({
    label: new Date(record.completedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
    percentage: record.percentage,
    score: record.score,
    title: record.title,
    band: record.band,
  })), [filteredRecords]);

  const latest = filteredRecords[0];
  const previous = filteredRecords[1];
  const delta = latest && previous ? latest.percentage - previous.percentage : null;

  const handleClear = () => {
    if (!userKey || !window.confirm("Remover o histórico local deste dispositivo?")) return;
    clearLocalResultHistory(userKey);
    setRecords([]);
    setSelectedAssessmentId("all");
  };

  return (
    <section className="mt-6 rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 sm:p-7" aria-labelledby="local-history-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-[#0a7066]"><BarChart3 className="h-4 w-4" aria-hidden="true" />Histórico neste dispositivo</p>
          <h2 id="local-history-title" className="mt-2 font-display text-2xl font-semibold text-[#173e39]">Compare sua evolução</h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-[#6b8881]">Use os registros do mesmo teste para observar mudanças ao longo do tempo. Percentuais de instrumentos diferentes não devem ser comparados entre si.</p>
        </div>
        {records.length > 0 && <Button type="button" variant="ghost" onClick={handleClear} className="w-fit gap-2 text-xs font-semibold text-[#8b5b51] hover:bg-[#fff2ed] hover:text-[#a14637]"><Trash2 className="h-3.5 w-3.5" aria-hidden="true" />Limpar histórico local</Button>}
      </div>

      {records.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl bg-[#f3f8f5] px-6 py-9 text-center">
          <CalendarClock className="h-6 w-6 text-[#5db5a8]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#31584f]">Ainda não há registros locais.</p>
          <p className="mt-1 max-w-md text-xs leading-5 text-[#6b8881]">Depois de concluir uma autoavaliação, este dispositivo guardará uma cópia resumida para facilitar sua comparação pessoal.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <label className="block max-w-md flex-1 text-xs font-bold uppercase tracking-[.12em] text-[#71948c]">
              Teste para comparar
              <select value={selectedAssessmentId} onChange={event => setSelectedAssessmentId(event.currentTarget.value)} className="mt-2 h-11 w-full rounded-xl border border-[#cfe4de] bg-white px-3 text-sm font-medium normal-case tracking-normal text-[#315a53] outline-none focus:ring-2 focus:ring-[#0b7167]">
                <option value="all">Todos os registros</option>
                {assessmentOptions.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
              </select>
            </label>
            {latest && <div className="rounded-2xl bg-[#eaf4f1] px-4 py-3 text-left sm:min-w-[12rem]"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#6a9189]">Mais recente</p><p className="mt-1 font-display text-2xl font-semibold text-[#123f3b]">{latest.percentage}%</p><p className="text-xs text-[#5b7972]">{new Date(latest.completedAt).toLocaleDateString("pt-BR")}</p></div>}
          </div>

          {delta !== null && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#dce9e4] bg-[#f7fbf9] px-4 py-3 text-xs text-[#567a72]">
              {delta > 0 ? <TrendingUp className="h-4 w-4 text-[#b75a48]" aria-hidden="true" /> : delta < 0 ? <TrendingDown className="h-4 w-4 text-[#0b7167]" aria-hidden="true" /> : <Info className="h-4 w-4 text-[#6b8881]" aria-hidden="true" />}
              <span><strong>Variação em relação ao registro anterior:</strong> {delta > 0 ? "+" : ""}{delta} pontos percentuais. Observe a tendência com gentileza; ela não é diagnóstico.</span>
            </div>
          )}

          {filteredRecords.length > 1 ? (
            <div className="mt-7 h-64" aria-label="Gráfico de evolução percentual">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: -22, right: 6, top: 10 }}>
                  <defs><linearGradient id="localHistoryGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#61c2b4" stopOpacity={.45} /><stop offset="100%" stopColor="#61c2b4" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#69867f", fontSize: 11 }} />
                  <YAxis domain={[0, 100]} unit="%" axisLine={false} tickLine={false} tick={{ fill: "#69867f", fontSize: 11 }} />
                  <Tooltip formatter={(value: number | string) => [`${value}%`, "Percentual"]} labelFormatter={(label, payload) => payload?.[0]?.payload?.title ? `${label} · ${payload[0].payload.title}` : label} contentStyle={{ borderRadius: 12, border: "1px solid #dce9e4", boxShadow: "0 12px 30px -20px rgba(12,65,58,.6)" }} />
                  <Area type="monotone" dataKey="percentage" stroke="#0b7167" strokeWidth={2.5} fill="url(#localHistoryGradient)" dot={{ r: 4, fill: "#0b7167" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-7 rounded-2xl bg-[#f1f8f5] px-5 py-8 text-center"><p className="text-sm font-semibold text-[#31584f]">Mais um registro do mesmo teste permitirá comparar a evolução.</p><p className="mt-1 text-xs leading-5 text-[#6b8881]">O gráfico usa o percentual do instrumento selecionado.</p></div>
          )}

          <div className="mt-6 divide-y divide-[#e5eeeb] border-t border-[#e5eeeb]">
            {filteredRecords.slice(0, 6).map(record => <article key={record.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-[#244943]">{record.title}</p><p className="mt-1 text-xs text-[#6d8982]">{new Date(record.completedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} · {record.band}</p></div><span className="w-fit rounded-full bg-[#e4f4ef] px-3 py-1 text-xs font-bold text-[#087068]">{record.percentage}%{record.displayValue ? ` · ${record.displayValue}` : ""}</span></article>)}
          </div>
        </>
      )}
    </section>
  );
}
