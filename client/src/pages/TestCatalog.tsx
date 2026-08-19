import PublicHeader from "@/components/PublicHeader";
import { useAuth } from "@/_core/hooks/useAuth";
import { beginLogin } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Clock3, Gauge, Info, ListChecks, Bookmark } from "lucide-react";
import { Link, useLocation } from "wouter";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favoritesStorage";
import { useState, useEffect } from "react";

const difficultyLabel = { leve: "Leve", moderada: "Moderada", aprofundada: "Aprofundada" };

export default function TestCatalog() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { data, isLoading } = trpc.assessments.listPublished.useQuery();
  const userId = user?.openId ?? user?.id ?? "guest";
  const [, setFavTick] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const categories = ["todos", ...(data ? Array.from(new Set(data.map(i => i.category))) : [])];
  const filteredData = data?.filter(item => selectedCategory === "todos" || item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      <PublicHeader />
      <main className="mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#59ac9f]">Autoavaliações</p><h1 className="mt-3 font-display text-5xl font-semibold tracking-[-.05em] text-[#123f3b]">Escolha por onde começar.</h1><p className="mt-5 text-base leading-7 text-[#628078]">Encontre um teste de autoavaliação alinhado ao que você vem percebendo. Antes de começar, confira a finalidade e o tempo estimado.</p></div>
      {data && data.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#e5eeeb] pb-6">
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
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{isLoading && Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-3xl bg-[#e5efeb]" />)}{filteredData?.map((assessment, index) => <article key={assessment.id} className="group relative overflow-hidden rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 shadow-[0_20px_45px_-37px_rgba(12,65,58,.8)]"><div className="absolute -right-8 -top-9 h-32 w-32 rounded-full bg-[#d8f0ea] transition-transform duration-300 group-hover:scale-110" /><div className="relative"><div className="flex items-center justify-between"><Badge className="border-0 bg-[#e6f4f0] text-[#0a7066] hover:bg-[#e6f4f0]">{assessment.category}</Badge><button type="button" onClick={() => { const idStr = String(assessment.id); if (isFavorite(userId, idStr, "assessment")) { removeFavorite(userId, idStr, "assessment"); } else { addFavorite(userId, { id: idStr, type: "assessment", title: assessment.title, description: assessment.shortDescription, category: assessment.category, meta: `${assessment.durationMinutes} min · ${difficultyLabel[assessment.difficulty]}`, url: `/avaliacao/${assessment.id}` }); } setFavTick(c => c + 1); }} className={`grid h-8 w-8 place-items-center rounded-xl transition-colors ${isFavorite(userId, String(assessment.id), "assessment") ? "bg-[#0a7066] text-white" : "border border-[#bde0d6] bg-white text-[#0a7066] hover:bg-[#e4f4ef]"}`} title={isFavorite(userId, String(assessment.id), "assessment") ? "Remover dos favoritos" : "Salvar nos favoritos"}><Bookmark className="h-4 w-4" /></button></div><h2 className="mt-6 font-display text-2xl font-semibold tracking-[-.035em] text-[#143e39]">{assessment.title}</h2><p className="mt-3 min-h-12 text-sm leading-6 text-[#67827b]">{assessment.shortDescription}</p><div className="mt-7 flex items-center gap-4 border-y border-[#e5eeeb] py-3 text-xs font-semibold text-[#618179]"><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#0b7167]" />{assessment.durationMinutes} min</span><span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-[#0b7167]" />{difficultyLabel[assessment.difficulty]}</span></div><Button className="mt-6 w-full rounded-xl bg-[#0b675f] text-white hover:bg-[#084e49]" onClick={() => { if (user) { setLocation(`/avaliacao/${assessment.id}`); return; } beginLogin(`/avaliacao/${assessment.id}`); }}>Fazer autoavaliação <ArrowRight className="ml-2 h-4 w-4" /></Button></div></article>)}
      {!isLoading && !data?.length && <div className="relative col-span-full overflow-hidden rounded-3xl border border-dashed border-[#b9d9d1] bg-[#fcfcf8] px-6 py-16 text-center"><div className="absolute -left-16 -top-16 h-44 w-44 rounded-full border-[22px] border-[#d9efe8]" /><div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-[90%_0_90%_0] bg-[#dff1eb] rotate-[-18deg]" /><div className="relative"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#e4f3ed] shadow-[0_14px_28px_-22px_rgba(11,91,82,.7)]"><ListChecks className="h-7 w-7 text-[#4dad9f]" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[#5cad9f]">Um espaço em construção</p><h2 className="mt-3 font-display text-3xl font-semibold text-[#173e39]">O catálogo está sendo preparado.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#66837c]">A equipe responsável ainda não publicou testes. Quando disponíveis, as autoavaliações aparecerão aqui com instruções claras e duração estimada.</p><p className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 text-xs leading-5 text-[#78948e]"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />Nenhuma informação fornecida aqui substitui avaliação de profissional habilitado.</p></div></div>}</div></main>
    </div>
  );
}
