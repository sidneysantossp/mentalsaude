import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { ARTICLES_DATABASE, ArticleModel } from "@/data/articlesDatabase";
import { ArrowRight, Bookmark, CheckCircle2, ChevronRight, ExternalLink, Info, Share2, Shield, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { getSavedArticles, saveArticle, removeSavedArticle, SavedArticle } from "@/lib/savedContentStorage";
import { useAuth } from "@/_core/hooks/useAuth";

export default function ArticlePage() {
  const [, params] = useRoute("/conteudos/:slug");
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const slug = params?.slug || "";
  const article: ArticleModel | undefined = ARTICLES_DATABASE[slug];

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const userId = user?.openId ?? user?.id ?? "anonymous";

  useEffect(() => {
    if (article) {
      document.title = article.seoTitle;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", article.seoDescription);

      let scriptTag = document.getElementById("json-ld-article");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-article";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.seoDescription,
        "image": window.location.origin + article.image,
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Mental Saúde",
          "url": window.location.origin
        },
        "datePublished": "2026-08-08T08:00:00Z",
        "dateModified": "2026-08-11T10:00:00Z",
        "mainEntityOfPage": window.location.origin + window.location.pathname,
        "about": {
          "@type": "Thing",
          "name": article.primaryEntity
        }
      });
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      const items = getSavedArticles(userId);
      setSaved(items.some((i: SavedArticle) => i.id === article.slug));
    }
  }, [article, userId]);

  if (!article) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-5 text-center text-[#153a36]">
        <div className="max-w-md rounded-3xl border border-[#dceae5] bg-[#fffefa] p-8 shadow-sm">
          <Info className="mx-auto h-10 w-10 text-[#0b7167]" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-[#173e39]">Artigo não encontrado</h1>
          <p className="mt-2 text-sm text-[#628079]">O conteúdo que você tentou acessar não existe ou foi movido.</p>
          <Button onClick={() => setLocation("/conteudos")} className="mt-6 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">
            Voltar para Conteúdos
          </Button>
        </div>
      </div>
    );
  }

  const handleToggleSave = () => {
    if (saved) {
      removeSavedArticle(userId, article.slug);
      setSaved(false);
    } else {
      saveArticle(userId, {
        id: article.slug,
        title: article.title,
        excerpt: article.seoDescription,
        category: article.category,
        readingTime: article.readingTime,
        slug: `/conteudos/${article.slug}`
      });
      setSaved(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      <header className="sticky top-0 z-40 border-b border-[#e2ede8] bg-[#f7f6ef]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link href="/"><Brand /></Link>
          <nav aria-label="Navegação Principal" className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Como funciona</Link>
            <Link href="/conteudos" className="text-sm font-bold text-[#0b7167] transition-colors hover:text-[#0b7167]">Conteúdos</Link>
            <Link href="/testes" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Testes</Link>
            <Link href="/privacidade" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Privacidade</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button onClick={() => setLocation("/dashboard")} className="h-10 rounded-xl bg-[#0a615a] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#074d47]">
              Meu painel
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#6e8c85]">
          <Link href="/" className="hover:text-[#0a7066]">Mental Saúde</Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/conteudos" className="hover:text-[#0a7066]">Conteúdos</Link>
          <span aria-hidden="true">&gt;</span>
          <span className="text-[#0a7066]">{article.primaryEntity}</span>
        </nav>

        <header className="mt-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#bde0d6] bg-[#e9f6f2] px-3.5 py-1 text-xs font-bold uppercase tracking-[.14em] text-[#0a7066]">
              {article.category}
            </span>
            <span className="text-xs font-semibold text-[#68857e]">{article.readingTime}</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.15] tracking-[-.04em] text-[#123f3b] sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#58756e]">
            {article.seoDescription}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-y-2 gap-x-6 border-y border-[#dcebe6] py-4 text-xs font-medium text-[#5f7d75]">
            <div>Por <strong className="text-[#173e39]">{article.author}</strong></div>
            <div>Revisado por <strong className="text-[#173e39]">{article.reviewer}</strong></div>
            <div>Atualizado em <strong className="text-[#173e39]">{article.reviewedAt}</strong></div>
            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleSave}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 font-semibold transition-colors ${saved ? "bg-[#0a7066] text-white" : "border border-[#bde0d6] bg-white text-[#0a7066] hover:bg-[#e4f4ef]"}`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                {saved ? "Salvo" : "Salvar para depois"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#bde0d6] bg-white px-3 py-1 font-semibold text-[#0a7066] hover:bg-[#e4f4ef]"
              >
                <Share2 className="h-3.5 w-3.5" />
                {copied ? "Link copiado!" : "Compartilhar"}
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#d2e4df] bg-white shadow-[0_24px_55px_-30px_rgba(11,70,62,.25)] max-w-5xl">
          <img src={article.image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start max-w-6xl">
          <article className="min-w-0">
            <section aria-label="Resumo direto" className="rounded-3xl border-2 border-[#b5dcd2] bg-[#f0faf7] p-7 shadow-sm">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">
                <Sparkles className="h-4 w-4" /> Em resumo
              </span>
              <p className="mt-3 text-base leading-7 text-[#1d4841] font-medium">
                {article.directAnswer}
              </p>
            </section>

            <section className="mt-10 rounded-3xl border border-[#d9e7e2] bg-[#fffefa] p-7">
              <h2 className="font-display text-xl font-semibold text-[#173e39]">O que você precisa saber</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#527068]">
                {article.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0a7066]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 lg:hidden rounded-2xl border border-[#d5e6e1] bg-white p-5">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="flex w-full items-center justify-between text-sm font-bold text-[#173e39]"
              >
                <span>Neste conteúdo</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${mobileTocOpen ? "rotate-90" : ""}`} />
              </button>
              {mobileTocOpen && (
                <nav className="mt-4 space-y-2 border-t border-[#edf4f1] pt-3">
                  {article.tableOfContents.map(toc => (
                    <a key={toc.id} href={`#${toc.id}`} onClick={() => setMobileTocOpen(false)} className="block text-xs font-medium text-[#58756e] hover:text-[#0a7066]">
                      {toc.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            <div className="mt-12 space-y-12 font-sans text-base leading-relaxed text-[#3b5952]">
              {article.sections.map(sec => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-semibold tracking-[-.02em] text-[#173e39] sm:text-3xl">
                    {sec.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-[1.8] text-[#4f6e67]">
                    <p>{sec.content}</p>
                  </div>
                </section>
              ))}

              {article.evidenceBox && (
                <section className="rounded-3xl border border-[#cce3dc] bg-[#f4faf8] p-7">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">
                    <Shield className="h-4 w-4" /> O que as evidências indicam
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    <div>
                      <h4 className="font-display text-sm font-semibold text-[#173e39]">O que sabemos</h4>
                      <p className="mt-2 text-xs leading-5 text-[#58756e]">{article.evidenceBox.whatWeKnow}</p>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-[#173e39]">O que sugerem</h4>
                      <p className="mt-2 text-xs leading-5 text-[#58756e]">{article.evidenceBox.whatEvidenceSuggests}</p>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-[#173e39]">Limitações</h4>
                      <p className="mt-2 text-xs leading-5 text-[#58756e]">{article.evidenceBox.whatWeDontKnowYet}</p>
                    </div>
                  </div>
                </section>
              )}

              <section id="teste-relacionado" className="scroll-mt-28 rounded-[2rem] bg-[#123f3b] p-8 text-[#f7f6ef] sm:p-10">
                <span className="rounded-full bg-[#24665f] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#82d6ca]">
                  AUTOAVALIAÇÃO EDUCATIVA
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-.03em] sm:text-3xl text-white">
                  Quer entender melhor como esses sinais aparecem para você?
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#cce8e1]">
                  A Mental Saúde disponibiliza instrumentos de autoavaliação e rastreio que podem ajudar você a observar sinais relacionados a <strong>{article.primaryEntity.toLowerCase()}</strong>.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button onClick={() => setLocation("/testes")} className="h-12 rounded-xl bg-[#82d6ca] px-6 text-sm font-bold text-[#123f3b] hover:bg-white">
                    Conhecer o teste de {article.primaryEntity.toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={() => setLocation("/conteudos")} variant="outline" className="h-12 rounded-xl border-[#3c756e] bg-transparent px-6 text-sm font-semibold text-white hover:bg-[#1a4f49]">
                    Entender como o teste funciona
                  </Button>
                </div>
              </section>

              <section id="faq" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-[-.02em] text-[#173e39]">Perguntas frequentes</h2>
                <div className="mt-6 divide-y divide-[#dcebe6] overflow-hidden rounded-3xl border border-[#dcebe6] bg-white">
                  {article.faqs.map((faq, idx) => (
                    <details key={idx} className="group p-6">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#173e39]">
                        {faq.question}
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#0a7066] transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-[#5b7871]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section id="referencias" className="scroll-mt-28 rounded-3xl border border-[#d9e7e2] bg-[#fffefa] p-7">
                <h2 className="font-display text-xl font-semibold text-[#173e39]">Referências científicas</h2>
                <ol className="mt-4 space-y-3 text-xs leading-6 text-[#5a7870]">
                  {article.references.map(ref => (
                    <li key={ref.id} className="flex items-start gap-2">
                      <span className="font-bold text-[#0a7066]">·</span>
                      <div className="flex-1">
                        <span>{ref.citation}</span>
                        {ref.url && (
                          <a href={ref.url} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-1 font-semibold text-[#0a7066] hover:underline">
                            Fonte original <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="rounded-2xl border border-[#d8e6e1] bg-[#f4faf8] p-5 text-xs leading-5 text-[#58776f]">
                <strong className="block font-semibold text-[#173e39]">Informação, não diagnóstico</strong>
                Este conteúdo possui finalidade educativa e não substitui uma avaliação individual realizada por profissional qualificado. Em caso de sofrimento intenso ou risco imediato, procure serviços de emergência (CVV 188).
              </div>
            </div>
          </article>

          <aside className="hidden lg:block sticky top-28 space-y-6">
            <div className="rounded-3xl border border-[#d5e6e1] bg-white p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold uppercase tracking-[.12em] text-[#0a7066]">Neste conteúdo</h3>
              <nav className="mt-4 space-y-2.5 border-t border-[#edf4f1] pt-4">
                {article.tableOfContents.map(toc => (
                  <a key={toc.id} href={`#${toc.id}`} className="block text-xs font-semibold text-[#58756e] hover:text-[#0a7066] transition-colors">
                    {toc.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-3xl border border-[#d5e6e1] bg-[#f4faf8] p-6 shadow-sm">
              <span className="rounded-full bg-[#e4f4ef] px-2.5 py-0.5 text-[10px] font-bold text-[#0a7066]">{article.relatedTest.acronym}</span>
              <h4 className="mt-3 font-display text-base font-semibold text-[#173e39]">{article.relatedTest.title}</h4>
              <p className="mt-2 text-xs leading-5 text-[#628079]">{article.relatedTest.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#dcebe6] pt-3 text-[11px] font-semibold text-[#5a7870]">
                <span>{article.relatedTest.questionCount} perguntas</span>
                <span>{article.relatedTest.durationMinutes} min</span>
              </div>
              <Button onClick={() => setLocation("/testes")} className="mt-4 h-9 w-full rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
                Conhecer instrumento →
              </Button>
            </div>
          </aside>
        </div>

        <section className="mt-20 border-t border-[#dcebe6] pt-16 max-w-6xl">
          <h2 className="font-display text-2xl font-semibold tracking-[-.02em] text-[#123f3b]">Continue explorando</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {article.relatedArticles.map((rel, idx) => (
              <Link key={idx} href={rel.slug} className="group flex flex-col justify-between rounded-3xl border border-[#d9e7e2] bg-white p-6 shadow-sm transition-all hover:border-[#0a7066]">
                <div>
                  <span className="rounded-full bg-[#e5f4ef] px-3 py-0.5 text-[11px] font-bold text-[#0a7066]">{rel.category}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#173e39] group-hover:text-[#0a7066] transition-colors">{rel.title}</h3>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#edf4f1] pt-4 text-xs text-[#68857e]">
                  <span>{rel.readingTime}</span>
                  <span className="font-bold text-[#0a7066]">Ler artigo →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dce9e4] bg-[#f1f8f5] py-12 px-5 sm:px-8 text-xs text-[#628079] mt-20">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Brand />
            <p className="mt-3 max-w-sm leading-5">Uma plataforma de autoconhecimento responsável. Em situações de risco imediato, procure serviços de emergência ou apoio profissional local (CVV 188).</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold text-[#3b5d56]">
            <Link href="/conteudos" className="hover:text-[#0b7167]">Conteúdos</Link>
            <Link href="/testes" className="hover:text-[#0b7167]">Testes</Link>
            <Link href="/metodologia" className="hover:text-[#0b7167]">Metodologia editorial</Link>
            <Link href="/privacidade" className="hover:text-[#0b7167]">Privacidade</Link>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] mt-8 border-t border-[#dcebe6] pt-6 text-center">
          © 2026 Mental Saúde. Autocuidado começa com informação de qualidade.
        </div>
      </footer>
    </div>
  );
}
