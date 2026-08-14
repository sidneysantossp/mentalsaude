import PublicHeader from "@/components/PublicHeader";
import { Button } from "@/components/ui/button";
import { ARTICLES_DATABASE, ArticleModel, ArticleModel as ArticleModelType } from "@/data/articlesDatabase";
import { getCanonicalTest, CanonicalTestEntity } from "@/data/testsCanonicalDatabase";
import { ScientificCitation } from "@/components/ScientificCitation";
import { ContextualTestCTA } from "@/components/ContextualTestCTA";
import { ArrowRight, Bookmark, CheckCircle2, ChevronRight, Info, Share2, Shield, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { getSavedArticles, saveArticle, removeSavedArticle, SavedArticle } from "@/lib/savedContentStorage";
import { useAuth } from "@/_core/hooks/useAuth";
import { calculateReadingProgress, getActiveSectionId } from "@/lib/readingProgress";

export default function ArticlePage() {
  const [, params] = useRoute("/conteudos/:slug");
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const slug = params?.slug || "";
  const article: ArticleModelType | undefined = ARTICLES_DATABASE[slug];

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("");

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

  useEffect(() => {
    if (!article) return;

    let frame = 0;
    const syncReadingState = () => {
      const documentElement = document.documentElement;
      setReadingProgress(calculateReadingProgress(window.scrollY, window.innerHeight, documentElement.scrollHeight));

      const sectionPositions = article.tableOfContents
        .map(item => {
          const element = document.getElementById(item.id);
          return element ? { id: item.id, top: element.getBoundingClientRect().top } : null;
        })
        .filter((section): section is { id: string; top: number } => section !== null);

      setActiveSectionId(getActiveSectionId(sectionPositions));
    };

    const scheduleSync = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncReadingState);
    };

    syncReadingState();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [article]);

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

  const handleSectionNavigation = (sectionId: string, closeMobileIndex = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `${window.location.pathname}#${sectionId}`);
    }
    if (closeMobileIndex) setMobileTocOpen(false);
  };

  // Mapeamento data-driven rigoroso ARTICLE -> CANONICAL TEST ENTITY.
  // Artigos novos usam somente relatedTestSlug; metadados vêm da entidade canônica.
  const relatedTestEntity: CanonicalTestEntity | null = article.relatedTestSlug
    ? (getCanonicalTest(article.relatedTestSlug) || null)
    : article.relatedTest
      ? (getCanonicalTest(article.relatedTest.acronym) || {
          id: article.relatedTest.acronym.toLowerCase(),
          slug: article.relatedTest.acronym.toLowerCase(),
          title: article.relatedTest.title,
          acronym: article.relatedTest.acronym,
          category: article.category,
          description: article.relatedTest.description,
          fullOverview: article.relatedTest.description,
          questionCount: article.relatedTest.questionCount,
          durationMinutes: article.relatedTest.durationMinutes,
          difficulty: "Leve",
          targetRoute: `/testes/${article.relatedTest.acronym.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
          executionRoute: "/testes",
          methodologyNotes: article.relatedTest.description
        })
      : null; // Fallback real: sem associação editorial explícita, o CTA não renderiza

  const relatedArticles = Object.values(ARTICLES_DATABASE).filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      <div
        className="fixed inset-x-0 top-0 z-[60] h-1 bg-[#d9ebe5]"
        role="progressbar"
        aria-label="Progresso de leitura do artigo"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={readingProgress}
      >
        <div
          className="h-full bg-[#0a7066] transition-[width] duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <PublicHeader />

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
            <div>Por <Link href={`/especialistas/${article.authorSlug}`} className="font-bold text-[#0a7066] hover:underline">{article.author}</Link></div>
            <div>Revisado por <Link href={`/especialistas/${article.reviewerSlug}`} className="font-bold text-[#0a7066] hover:underline">{article.reviewer}</Link></div>
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
                {article.keyTakeaways.map((item: string, idx: number) => (
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
                aria-expanded={mobileTocOpen}
                aria-controls="article-mobile-toc"
                className="flex w-full items-center justify-between text-sm font-bold text-[#173e39] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7066]"
              >
                <span>Neste conteúdo</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${mobileTocOpen ? "rotate-90" : ""}`} />
              </button>
              {mobileTocOpen && (
                <nav id="article-mobile-toc" aria-label="Índice do artigo" className="mt-4 space-y-2 border-t border-[#edf4f1] pt-3">
                  {article.tableOfContents.map(toc => (
                    <a
                      key={toc.id}
                      href={`#${toc.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleSectionNavigation(toc.id, true);
                      }}
                      aria-current={activeSectionId === toc.id ? "location" : undefined}
                      className={`block rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${activeSectionId === toc.id ? "bg-[#e9f6f2] font-bold text-[#0a7066]" : "text-[#58756e] hover:bg-[#f1f8f5] hover:text-[#0a7066]"}`}
                    >
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
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>
                        {p.segments.map((seg, sIdx) =>
                          seg.href ? (
                            <Link key={sIdx} href={seg.href} className="font-semibold text-[#0a7066] underline decoration-[#8bcfc0] underline-offset-2 hover:text-[#064c46]">
                              {seg.displayText ?? seg.text}
                            </Link>
                          ) : seg.refId ? (
                            <ScientificCitation key={sIdx} refId={seg.refId} references={article.references} displayText={seg.displayText} />
                          ) : (
                            <span key={sIdx}>{seg.text}</span>
                          )
                        )}
                      </p>
                    ))}
                  </div>
                  {sec.table && (
                    <div className="mt-6 overflow-x-auto rounded-2xl border border-[#d9e7e2] bg-white">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-[#eef8f4] text-[#173e39]">
                          <tr>
                            {sec.table.headers.map((header) => (
                              <th key={header} scope="col" className="px-4 py-3 font-semibold">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e5efeb] text-[#527068]">
                          {sec.table.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="align-top">
                              {row.map((cell, cellIndex) => (
                                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 leading-6">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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

              {/* Contextual Test CTA Data-Driven com suporte a fallback real */}
              <section id="teste-relacionado" className="scroll-mt-28" aria-label="Teste relacionado">
                <ContextualTestCTA test={relatedTestEntity} articleSlug={article.slug} articleId={article.slug} />
              </section>

              <section id="faq" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-[-.02em] text-[#173e39]">Perguntas frequentes</h2>
                <div className="mt-6 divide-y divide-[#dcebe6] overflow-hidden rounded-3xl border border-[#dcebe6] bg-white">
                  {article.faqs.map((faq, idx) => (
                    <details key={idx} className="group p-6">
                      <summary className="cursor-pointer font-display text-base font-semibold text-[#173e39] flex items-center justify-between">
                        {faq.question}
                        <ChevronRight className="h-4 w-4 text-[#0a7066] transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-[#527068]">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <section id="referencias" className="scroll-mt-28 rounded-3xl border border-[#d9e7e2] bg-white p-7">
                <h2 className="font-display text-xl font-semibold text-[#173e39]">Referências científicas</h2>
                <ol className="mt-4 space-y-3 text-xs leading-relaxed text-[#58756e]">
                  {article.references.map((ref, idx) => (
                    <li key={ref.id} className="flex items-start gap-2">
                      <span className="font-bold text-[#173e39]">{idx + 1}.</span>
                      <div>
                        <span>{ref.fullCitation}</span>
                        {ref.sourceUrl && (
                          <a href={ref.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-2 font-semibold text-[#0a7066] underline hover:text-[#053833]">
                            Fonte original ↗
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="rounded-2xl border border-[#dcebe6] bg-[#f7f6ef] p-5 text-xs text-[#6e8c85]">
                <strong className="font-bold text-[#173e39]">Informação, não diagnóstico</strong>
                <p className="mt-1">
                  Este conteúdo possui finalidade educativa e não substitui avaliação clínica individual. Em caso de sofrimento intenso ou urgência, procure suporte profissional (CVV 188).
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-[#173e39]">Continue explorando</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {relatedArticles.map((rel: ArticleModelType) => (
                  <Link key={rel.slug} href={`/conteudos/${rel.slug}`} className="group block rounded-3xl border border-[#d2e4df] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0a7066]">
                    <span className="rounded-full bg-[#e9f6f2] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0a7066]">
                      {rel.category}
                    </span>
                    <h3 className="mt-3 font-display text-sm font-semibold text-[#123f3b] group-hover:text-[#0a7066]">
                      {rel.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-xs font-medium text-[#68857e]">
                      <span>{rel.readingTime}</span>
                      <span className="text-[#0a7066] group-hover:underline">Ler artigo →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          <aside className="hidden lg:block sticky top-28 space-y-6">
            <div className="rounded-3xl border border-[#d9e7e2] bg-white p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold uppercase tracking-[.14em] text-[#173e39]">Neste conteúdo</h3>
              <nav aria-label="Índice do artigo" className="mt-4 space-y-2 text-xs">
                {article.tableOfContents.map(toc => (
                  <a
                    key={toc.id}
                    href={`#${toc.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSectionNavigation(toc.id);
                    }}
                    aria-current={activeSectionId === toc.id ? "location" : undefined}
                    className={`block rounded-lg px-2 py-1.5 transition-colors ${activeSectionId === toc.id ? "bg-[#e9f6f2] font-bold text-[#0a7066]" : "text-[#58756e] hover:bg-[#f1f8f5] hover:text-[#0a7066]"}`}
                  >
                    {toc.label}
                  </a>
                ))}
              </nav>
            </div>

            {relatedTestEntity && (
              <div className="rounded-3xl border border-[#d9e7e2] bg-white p-6 shadow-sm">
                <span className="rounded-full bg-[#e9f6f2] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0a7066]">
                  {relatedTestEntity.acronym}
                </span>
                <h4 className="mt-3 font-display text-sm font-semibold text-[#173e39]">{relatedTestEntity.title}</h4>
                <p className="mt-2 text-xs leading-5 text-[#58756e]">{relatedTestEntity.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#68857e]">
                  <span>{relatedTestEntity.questionCount} perguntas</span>
                  <span>{relatedTestEntity.durationMinutes} min</span>
                </div>
                <Link href={relatedTestEntity.targetRoute}>
                  <Button className="mt-4 w-full rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
                    Conhecer Instrumento →
                  </Button>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
