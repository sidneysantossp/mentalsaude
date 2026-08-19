import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowRight, CheckCircle2, Clock3, Gauge, History, ListChecks, Play } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const difficultyLabel = { leve: "Leve", moderada: "Moderada", aprofundada: "Aprofundada" };

export default function UserTestsPage() {
  return (
    <ProtectedRoute>
      <UserTestsContent />
    </ProtectedRoute>
  );
}

function UserTestsContent() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [tab, setTab] = useState<"meus" | "disponiveis">("meus");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const attempts = trpc.user.attempts.useQuery();
  const catalog = trpc.assessments.listPublished.useQuery();

  const categories = ["todos", ...(catalog.data ? Array.from(new Set(catalog.data.map(i => i.category))) : [])];
  const filteredCatalog = catalog.data?.filter(item => selectedCategory === "todos" || item.category === selectedCategory);

  return (
    <DashboardLayout area="user">
      <div className="max-w-6xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[.18em] text-[#0a7066]">Área de autoavaliações</span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#173e39]">Meus testes e disponíveis</h1>
          <p className="mt-2 text-sm leading-6 text-[#5f7d75]">Acompanhe seus históricos de respostas ou explore novas autoavaliações diretamente no seu espaço seguro.</p>
        </div>

        <div className="flex gap-2 border-b border-[#dcebe6] pb-4">
          <button
            onClick={() => setTab("meus")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${tab === "meus" ? "bg-[#0b7167] text-white shadow-sm" : "border border-[#bde0d6] bg-white text-[#0a7066] hover:bg-[#e4f4ef]"}`}
          >
            <History className="h-4 w-4" />
            Meus testes realizados
          </button>
          <button
            onClick={() => setTab("disponiveis")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${tab === "disponiveis" ? "bg-[#0b7167] text-white shadow-sm" : "border border-[#bde0d6] bg-white text-[#0a7066] hover:bg-[#e4f4ef]"}`}
          >
            <ListChecks className="h-4 w-4" />
            Testes disponíveis
          </button>
        </div>

        {tab === "meus" ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-[#173e39]">Histórico de avaliações</h2>
              <span className="text-xs font-semibold text-[#6e8c85]">{attempts.data?.length ?? 0} registros</span>
            </div>
            {attempts.isLoading ? (
              <div className="h-40 animate-pulse rounded-3xl bg-[#edf5f2]" />
            ) : attempts.data?.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {attempts.data.map(item => (
                  <article key={item.id} className="rounded-3xl border border-[#dcebe6] bg-[#fffefa] p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "concluido" ? "bg-[#e4f4ef] text-[#087068]" : "bg-[#fff1de] text-[#9a641b]"}`}>
                        {item.status === "concluido" ? item.resultBand ?? "Concluído" : "Não concluído"}
                      </span>
                      <span className="text-xs text-[#738f89]">{item.completedAt ? new Date(item.completedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : "Em andamento"}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-[#173e39]">{item.title}</h3>
                    <div className="mt-6 flex items-center justify-between border-t border-[#eaf2f0] pt-4">
                      <span className="text-xs font-semibold text-[#5a7b73]">Pontuação: <strong>{item.score ?? 0}</strong></span>
                      <Button size="sm" onClick={() => setLocation(`/avaliacao/${item.assessmentId}`)} className="rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">
                        {item.status === "concluido" ? "Refazer teste" : "Continuar"} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#dcebe6] bg-[#fffefa] p-12 text-center">
                <History className="mx-auto h-10 w-10 text-[#5db5a8]" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-[#173e39]">Nenhuma avaliação concluída ainda</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#628079]">Explore os testes disponíveis na aba ao lado para iniciar sua primeira jornada de autoconhecimento.</p>
                <Button onClick={() => setTab("disponiveis")} className="mt-6 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">
                  Ver testes disponíveis
                </Button>
              </div>
            )}
          </section>
        ) : (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 border-b border-[#e5eeeb] pb-4">
              <span className="mr-2 text-xs font-bold uppercase tracking-[.14em] text-[#63847c]">Filtrar por tema:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${selectedCategory === cat ? "bg-[#0b7167] text-white shadow-sm" : "border border-[#d0e4df] bg-white text-[#3f645c] hover:bg-[#e5f4ef]"}`}
                >
                  {cat === "todos" ? "Todos os testes" : cat}
                </button>
              ))}
            </div>

            {catalog.isLoading ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-3xl bg-[#e5efeb]" />
                ))}
              </div>
            ) : filteredCatalog?.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredCatalog.map(assessment => (
                  <article key={assessment.id} className="group relative overflow-hidden rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 shadow-sm">
                    <Badge className="border-0 bg-[#e6f4f0] text-[#0a7066] hover:bg-[#e6f4f0]">{assessment.category}</Badge>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-.035em] text-[#143e39]">{assessment.title}</h3>
                    <p className="mt-3 min-h-12 text-sm leading-6 text-[#67827b]">{assessment.shortDescription}</p>
                    <div className="mt-6 flex items-center gap-4 border-y border-[#e5eeeb] py-3 text-xs font-semibold text-[#618179]">
                      <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#0b7167]" />{assessment.durationMinutes} min</span>
                      <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-[#0b7167]" />{difficultyLabel[assessment.difficulty]}</span>
                    </div>
                    <Button onClick={() => setLocation(`/avaliacao/${assessment.id}`)} className="mt-6 w-full rounded-xl bg-[#0b675f] text-white hover:bg-[#084e49]">
                      Iniciar no Dashboard <Play className="ml-2 h-4 w-4" />
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-12 text-center">
                <ListChecks className="mx-auto h-10 w-10 text-[#5db5a8]" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-[#173e39]">Nenhum teste nesta categoria</h3>
                <p className="mt-2 text-sm text-[#628078]">Selecione outro tema acima para ver os instrumentos disponíveis.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
