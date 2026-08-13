import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, Layers, Database, BookOpen, FileCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminContentAuthority() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.admin.contentAuthorityData.useQuery();
  const [evaluating, setEvaluating] = useState<string | null>(null);

  const evaluateMutation = trpc.admin.evaluateGate.useMutation({
    onSuccess: (res) => {
      toast.success(`Publication Gate avaliado para ${res.articleSlug}: ${res.status}`);
      utils.admin.contentAuthorityData.invalidate();
      setEvaluating(null);
    },
    onError: (err) => {
      toast.error(`Erro ao avaliar gate: ${err.message}`);
      setEvaluating(null);
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1c5d57]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a615a]">
              <Layers className="h-3.5 w-3.5" /> Content Authority Engine V1
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#123f3b]">Central Editorial e Governança</h1>
            <p className="text-sm text-[#527068]">Cluster Ansiedade · Pillar /ansiedade · Primary Test GAD-7 · Autopublish: Disabled</p>
          </div>
          <Button 
            onClick={() => {
              setEvaluating("sintomas-de-ansiedade");
              evaluateMutation.mutate({ articleSlug: "sintomas-de-ansiedade" });
            }}
            disabled={evaluating !== null}
            className="bg-[#0a615a] hover:bg-[#074d47] text-white gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            {evaluating ? "Executando Gate..." : "Executar Publication Gate (Sintomas)"}
          </Button>
        </div>

        {/* Cobertura */}
        {data?.coverage && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[#dceae5] bg-white shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#628079]">Content Coverage</p>
                <p className="mt-2 text-3xl font-bold text-[#123f3b]">{data.coverage.contentCoverage}%</p>
                <p className="mt-1 text-xs text-[#628079]">4 de 15 oportunidades publicadas</p>
              </CardContent>
            </Card>
            <Card className="border-[#dceae5] bg-white shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#628079]">Intent Coverage</p>
                <p className="mt-2 text-3xl font-bold text-[#123f3b]">{data.coverage.intentCoverage}%</p>
                <p className="mt-1 text-xs text-[#628079]">Alinhamento de busca garantido</p>
              </CardContent>
            </Card>
            <Card className="border-[#dceae5] bg-white shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#628079]">Entity & Links</p>
                <p className="mt-2 text-3xl font-bold text-[#123f3b]">{data.coverage.internalLinkCoverage}%</p>
                <p className="mt-1 text-xs text-[#628079]">Orphan: 0 · Broken: 0</p>
              </CardContent>
            </Card>
            <Card className="border-[#dceae5] bg-white shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#628079]">YMYL Safety Gate</p>
                <p className="mt-2 text-3xl font-bold text-[#0a615a]">Active</p>
                <p className="mt-1 text-xs text-[#628079]">Clinical & evidence checking</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Oportunidades (15 itens do cluster Ansiedade) */}
        <Card className="border-[#dceae5] bg-white shadow-sm">
          <CardHeader className="border-b border-[#eef4f1] px-6 py-4">
            <CardTitle className="text-lg font-bold text-[#123f3b] flex items-center gap-2">
              <Database className="h-5 w-5 text-[#0a615a]" /> Backlog de Oportunidades do Cluster (15 itens)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-sm text-[#628079]">Carregando oportunidades do banco de dados...</div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#eef4f1] bg-[#f7f9f6] text-xs font-bold uppercase tracking-wider text-[#628079]">
                    <th className="p-4">Título</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4">Funil</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Teste Relacionado</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef4f1]">
                  {data?.opportunities?.map((opp) => (
                    <tr key={opp.id} className="hover:bg-[#fbfcfb] transition-colors">
                      <td className="p-4 font-medium text-[#123f3b] max-w-xs truncate">{opp.title}</td>
                      <td className="p-4 font-mono text-xs text-[#0a615a]">/{opp.slug}</td>
                      <td className="p-4 capitalize text-[#527068]">{opp.funnelStage}</td>
                      <td className="p-4 capitalize text-[#527068]">{opp.contentType}</td>
                      <td className="p-4 font-semibold text-[#173e39] uppercase">{opp.relatedTestSlug || "N/A"}</td>
                      <td className="p-4">
                        <Badge variant={opp.status === "published" ? "default" : "secondary"} className={opp.status === "published" ? "bg-[#0a615a] text-white" : "bg-slate-100 text-slate-700"}>
                          {opp.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Evidências e Proveniência Científica */}
        <Card className="border-[#dceae5] bg-white shadow-sm">
          <CardHeader className="border-b border-[#eef4f1] px-6 py-4">
            <CardTitle className="text-lg font-bold text-[#123f3b] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#0a615a]" /> Banco de Evidências e Proveniência (First Wave)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 divide-y divide-[#eef4f1]">
            {data?.evidence?.map((ev) => (
              <div key={ev.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-md bg-[#eef6f3] px-2.5 py-0.5 text-xs font-bold text-[#0a615a] mb-1">
                      {ev.evidenceLevel}
                    </span>
                    <p className="font-medium text-[#123f3b]">"{ev.claim}"</p>
                    <p className="mt-1 text-xs text-[#628079]">
                      Fonte: {ev.source} ({ev.year}) — Autores: {ev.authors}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-[#0a615a]/30 text-[#0a615a] shrink-0">
                    {ev.sourceType}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Publication Gates Status */}
        <Card className="border-[#dceae5] bg-white shadow-sm">
          <CardHeader className="border-b border-[#eef4f1] px-6 py-4">
            <CardTitle className="text-lg font-bold text-[#123f3b] flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-[#0a615a]" /> Status do Publication Gate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {data?.gates?.map((gate: any, idx) => {
              const checks = typeof gate.checksJson === "string" ? JSON.parse(gate.checksJson) : (gate.checks || {});
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#123f3b]">Artigo: /{gate.articleSlug}</p>
                      <p className="text-xs text-[#628079]">Última avaliação em {new Date(gate.reviewedAt || Date.now()).toLocaleString()}</p>
                    </div>
                    <Badge className={gate.status === "PASSED" ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"}>
                      {gate.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 pt-2">
                    {Object.entries(checks).map(([key, passed]) => (
                      <div key={key} className="flex items-center gap-2 rounded-lg bg-[#f7f9f6] p-2.5 text-xs">
                        {passed ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />}
                        <span className="font-medium text-[#123f3b] truncate" title={key}>{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
