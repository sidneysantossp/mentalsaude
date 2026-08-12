import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getSavedArticles, removeSavedArticle, type SavedArticle } from "@/lib/savedContentStorage";

type SavedContentSectionProps = {
  userKey?: string | number | null;
};

export default function SavedContentSection({ userKey }: SavedContentSectionProps) {
  const storageUserKey = userKey ?? "guest";
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);

  useEffect(() => {
    setSavedArticles(getSavedArticles(storageUserKey));
  }, [storageUserKey]);

  const handleRemove = (articleId: string) => {
    setSavedArticles(removeSavedArticle(storageUserKey, articleId));
  };

  return (
    <section className="mt-6 rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6 sm:p-7" aria-labelledby="saved-content-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-[#0a7066]"><Bookmark className="h-4 w-4" aria-hidden="true" /> Biblioteca pessoal</p>
          <h2 id="saved-content-title" className="mt-2 font-display text-2xl font-semibold text-[#173e39]">Salvos para depois</h2>
          <p className="mt-2 max-w-xl text-xs leading-5 text-[#6b8881]">Guarde guias e leituras do Hub Editorial para retornar quando fizer sentido para você.</p>
        </div>
        <Link href="/conteudos" className="inline-flex h-9 items-center justify-center rounded-xl border border-[#bde0d6] bg-[#f4fbf8] px-4 text-xs font-bold text-[#0a7066] transition-colors hover:bg-[#e4f4ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-2">
          Explorar conteúdos <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {savedArticles.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-[#cfe3dd] bg-[#f3f8f5] px-6 py-9 text-center">
          <Bookmark className="h-7 w-7 text-[#70b9ae]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#31584f]">Sua biblioteca está vazia.</p>
          <p className="mt-1 max-w-md text-xs leading-5 text-[#6b8881]">Ao encontrar um conteúdo interessante em /conteudos, use “Salvar para depois” para encontrá-lo aqui rapidamente.</p>
          <Link href="/conteudos" className="mt-5 text-xs font-bold text-[#0a7066] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-2">Ir para Conteúdos →</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {savedArticles.map(article => (
            <article key={article.id} className="flex flex-col justify-between rounded-2xl border border-[#dce9e4] bg-[#f8fbf8] p-5 transition-colors hover:border-[#a9d5cb]">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-[#e5f4ef] px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#0a7066]">{article.category}</span>
                  <span className="text-[11px] text-[#73908a]">Salvo em {new Date(article.savedAt).toLocaleDateString("pt-BR")}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-[#173e39]">{article.title}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#628079]">{article.excerpt}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e3eeeb] pt-4">
                <span className="text-[11px] font-semibold text-[#6e8c85]">{article.readingTime}</span>
                <div className="flex items-center gap-2">
                  <Link href={article.slug || "/conteudos"} aria-label={`Abrir ${article.title} no Hub Editorial`} className="inline-flex h-8 items-center rounded-lg bg-[#0a615a] px-3 text-xs font-bold text-white transition-colors hover:bg-[#074d47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-2">
                    Ler artigo <ExternalLink className="ml-1.5 h-3 w-3" aria-hidden="true" />
                  </Link>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleRemove(article.id)} aria-label={`Remover ${article.title} dos conteúdos salvos`} className="h-8 w-8 rounded-lg p-0 text-[#73908a] hover:bg-[#fcefeb] hover:text-[#a64d3b] focus-visible:ring-2 focus-visible:ring-[#0a7066]">
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
