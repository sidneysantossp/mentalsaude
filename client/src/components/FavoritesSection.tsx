import { useState, useEffect } from "react";
import { getFavorites, removeFavorite, FavoriteItem } from "@/lib/favoritesStorage";
import { BookmarkCheck, Trash2, ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type FavoritesSectionProps = {
  userKey?: string | number;
};

export default function FavoritesSection({ userKey = "guest" }: FavoritesSectionProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(getFavorites(userKey));
  }, [userKey]);

  const handleRemove = (id: string, type: "article" | "assessment") => {
    const updated = removeFavorite(userKey, id, type);
    setFavorites(updated);
  };

  return (
    <section className="mt-6 rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-[#0a7066]">
            <BookmarkCheck className="h-4 w-4" /> Acesso rápido
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#173e39]">Favoritados</h2>
        </div>
        <span className="rounded-full bg-[#e5f4ef] px-3 py-1 text-xs font-bold text-[#0a7066]">
          {favorites.length} ite{favorites.length === 1 ? "m" : "ns"}
        </span>
      </div>

      {favorites.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map(item => (
            <div key={`${item.type}-${item.id}`} className="flex flex-col justify-between rounded-2xl border border-[#d5e6e1] bg-white p-5 shadow-sm transition-all hover:border-[#0a7066]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.type === "article" ? "bg-[#e5f4ef] text-[#0a7066]" : "bg-[#eef6f2] text-[#087068]"}`}>
                    {item.type === "article" ? <BookOpen className="h-3 w-3" /> : <ClipboardList className="h-3 w-3" />}
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id, item.type)}
                    className="text-[#84a39b] hover:text-[#b94a38]"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-[#123f3b]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-[#5e7d75] line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#edf4f1] pt-3 text-xs">
                <span className="font-semibold text-[#68857e]">{item.meta}</span>
                <Link href={item.url} className="inline-flex items-center gap-1 font-bold text-[#0a7066] hover:underline">
                  Acessar <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl bg-[#f4fbf8] px-6 py-12 text-center">
          <BookmarkCheck className="h-7 w-7 text-[#7cbdb3]" />
          <h3 className="mt-3 font-display text-base font-semibold text-[#173e39]">Nenhum item favoritado ainda</h3>
          <p className="mt-1 max-w-md text-xs leading-5 text-[#628079]">
            Clique no ícone de favorito ou "Salvar" em artigos ou testes para acessá-los rapidamente a qualquer momento por aqui.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
              <Link href="/conteudos">Explorar artigos</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-[#bde0d6] bg-white text-xs font-bold text-[#0a7066] hover:bg-[#f1f8f5]">
              <Link href="/testes">Explorar testes</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
