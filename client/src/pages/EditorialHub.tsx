import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { EDITORIAL_SEARCH_SUGGESTIONS, EDITORIAL_SPECIALISTS, EDITORIAL_TOPICS, ESSENTIAL_GUIDES, FEATURED_ARTICLES, RECENT_ARTICLES, START_PATHS, SYMPTOMS_LIST, EditorialItem } from "@/data/editorialMock";
import { Activity, AlertCircle, ArrowRight, BookOpen, Bookmark, CheckCircle, Compass, Flame, Heart, Moon, Search, Shield, Smile, Users, X, Zap } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { getSavedArticles, saveArticle, removeSavedArticle, isArticleSaved } from "@/lib/savedContentStorage";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";

const iconMap: Record<string, typeof Activity> = {
  Activity,
  Heart,
  Zap,
  Shield,
  Moon,
  Compass,
  AlertCircle,
  Users,
  Flame,
  Smile,
};

const EDITORIAL_CONTENT = Array.from(
  new Map(
    [...FEATURED_ARTICLES, ...ESSENTIAL_GUIDES, ...RECENT_ARTICLES].map(item => [item.id, item] as const),
  ).values(),
);

const editorialMatches = (item: EditorialItem, query: string, category: string) => {
  const categoryMatches = category === "Todos" || item.category === category;
  if (!categoryMatches) return false;
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  if (!normalizedQuery) return true;
  return [item.title, item.excerpt, item.primaryEntity, item.category, item.contentType]
    .join(" ")
    .toLocaleLowerCase("pt-BR")
    .includes(normalizedQuery);
};

export default function EditorialHub() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const userId = user?.openId ?? user?.id ?? "guest";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const items = getSavedArticles(userId);
    setSavedIds(items.map(i => i.id));
  }, [userId]);

  const handleToggleSave = (e: React.MouseEvent, article: { id: string; title: string; excerpt: string; category: string; readingTime: string; slug: string }) => {
    e.preventDefault();
    e.stopPropagation();
    if (isArticleSaved(userId, article.id)) {
      removeSavedArticle(userId, article.id);
      setSavedIds(prev => prev.filter(id => id !== article.id));
    } else {
      saveArticle(userId, article);
      setSavedIds(prev => [...prev, article.id]);
    }
  };

  // Configurar metadata SEO e Structured Data JSON-LD ao montar a página editorial
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Saúde Mental: Guias, Sintomas e Conteúdos | Mental Saúde";

    let metaDesc = document.querySelector('meta[name="description"]');
    const createdMeta = !metaDesc;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.getAttribute("content") ?? "";
    metaDesc.setAttribute("content", "Entenda ansiedade, depressão, TDAH, estresse, sono e outros temas de saúde mental com conteúdos claros, referências confiáveis, testes e guias da Mental Saúde.");

    let canonical = document.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const prevCanonical = canonical.getAttribute("href") ?? "";
    canonical.setAttribute("href", window.location.origin + "/conteudos");

    // Inserir JSON-LD Structured Data (WebSite, CollectionPage, BreadcrumbList)
    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.id = "editorial-jsonld";
    scriptTag.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": window.location.origin + "/#website",
          "url": window.location.origin,
          "name": "Mental Saúde",
          "inLanguage": "pt-BR"
        },
        {
          "@type": "CollectionPage",
          "@id": window.location.origin + "/conteudos#webpage",
          "url": window.location.origin + "/conteudos",
          "name": "Saúde Mental: Guias, Sintomas e Conteúdos | Mental Saúde",
          "description": "Entenda ansiedade, depressão, TDAH, estresse, sono e outros temas de saúde mental com conteúdos claros, referências confiáveis, testes e guias.",
          "isPartOf": { "@id": window.location.origin + "/#website" },
          "inLanguage": "pt-BR"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Mental Saúde", "item": window.location.origin },
            { "@type": "ListItem", "position": 2, "name": "Conteúdos", "item": window.location.origin + "/conteudos" }
          ]
        }
      ]
    });
    document.head.appendChild(scriptTag);

    return () => {
      document.title = prevTitle;
      if (createdMeta && metaDesc) metaDesc.remove();
      else if (metaDesc) metaDesc.setAttribute("content", prevDesc);
      if (createdCanonical && canonical) canonical.remove();
      else if (canonical) canonical.setAttribute("href", prevCanonical);
      const injected = document.getElementById("editorial-jsonld");
      if (injected) injected.remove();
    };
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return EDITORIAL_SEARCH_SUGGESTIONS.slice(0, 6);
    const query = searchQuery.toLocaleLowerCase("pt-BR");
    return EDITORIAL_SEARCH_SUGGESTIONS.filter(item => item.label.toLocaleLowerCase("pt-BR").includes(query) || item.type.toLocaleLowerCase("pt-BR").includes(query));
  }, [searchQuery]);

  const filteredEditorialItems = useMemo(
    () => EDITORIAL_CONTENT.filter(item => editorialMatches(item, searchQuery, selectedCategory)),
    [searchQuery, selectedCategory],
  );

  const categoryOptions = useMemo(
    () => ["Todos", ...Array.from(new Set([...EDITORIAL_TOPICS.map(topic => topic.category), ...EDITORIAL_CONTENT.map(item => item.category)]))],
    [],
  );

  const isFiltering = Boolean(searchQuery.trim() || selectedCategory !== "Todos");

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      {/* Navbar institucional reutilizada com "Conteúdos" ativo */}
      <header className="sticky top-0 z-40 border-b border-[#e2ede8] bg-[#f7f6ef]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link href="/"><Brand /></Link>
          <nav aria-label="Navegação Principal" className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Como funciona</Link>
            <Link href="/conteudos" className="text-sm font-bold text-[#0b7167] transition-colors hover:text-[#0b7167]">Conteúdos</Link>
            <Link href="/testes" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Testes</Link>
            <Link href="/privacidade" className="text-sm font-semibold text-[#3b5d56] transition-colors hover:text-[#0b7167]">Privacidade</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button onClick={() => setLocation("/dashboard")} className="h-10 rounded-xl bg-[#0a615a] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_-14px_rgba(10,97,90,.8)] hover:bg-[#074d47]">
              Meu painel
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* BREADCRUMB */}
        <div className="mx-auto max-w-[1200px] px-5 pt-6 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#6e8c85]">
            <Link href="/" className="hover:text-[#0a7066]">Mental Saúde</Link>
            <span aria-hidden="true">&gt;</span>
            <span className="text-[#0a7066]">Conteúdos</span>
          </nav>
        </div>

        {/* HERO EDITORIAL */}
        <section className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pt-14">
          <div className="mx-auto max-w-[960px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bde0d6] bg-[#e9f6f2] px-4 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#0a7066]">
              CONHECIMENTO SOBRE SAÚDE MENTAL
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.12] tracking-[-.04em] text-[#123f3b] sm:text-6xl">
              Entender o que você sente é um bom lugar para começar.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#58756e] sm:text-lg">
              Conteúdos sobre ansiedade, depressão, TDAH, sono, estresse e outros temas de saúde mental, construídos com referências confiáveis e linguagem que você consegue entender.
            </p>

            {/* BUSCA EDITORIAL */}
            <div className="relative mx-auto mt-10 max-w-2xl text-left">
              <div className="relative flex items-center rounded-2xl border-2 border-[#b5dcd2] bg-white shadow-[0_18px_40px_-24px_rgba(11,70,62,.3)] transition-all focus-within:border-[#0a7066] focus-within:ring-4 focus-within:ring-[#0a7066]/10">
                <Search className="ml-5 h-5 w-5 text-[#589c92]" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Busque uma dúvida, sintoma ou condição"
                  className="h-14 w-full bg-transparent px-4 text-base text-[#153a36] placeholder-[#819e97] outline-none"
                  aria-label="Busque uma dúvida, sintoma ou condição"
                />
                <Button type="button" className="m-1.5 h-11 rounded-xl bg-[#0a615a] px-6 font-semibold text-white hover:bg-[#074d47]">
                  Buscar
                </Button>
              </div>
              <p className="mt-2.5 text-center text-xs text-[#6e8c85]">
                Ex.: ansiedade à noite, sintomas de TDAH, como funciona o GAD-7
              </p>

              {/* SEARCH SUGGESTIONS DROPDOWN */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-[#cfe4de] bg-[#fffefa] shadow-[0_24px_50px_-20px_rgba(11,70,62,.4)]">
                  <div className="p-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#71928a] border-b border-[#e9f2ef]">
                    Sugestões populares
                  </div>
                  <div className="divide-y divide-[#f0f6f4]">
                    {filteredSuggestions.map((item, index) => (
                      <Link key={index} href={item.slug} className="flex items-center justify-between px-4 py-3 hover:bg-[#f1f8f5] transition-colors">
                        <span className="text-sm font-semibold text-[#1f4741]">{item.label}</span>
                        <span className="rounded-full bg-[#e4f4ef] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#0a7066]">{item.type}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FILTROS E RESULTADOS EM TEMPO REAL */}
        <section aria-label="Busca e filtros de conteúdos" className="mx-auto max-w-[1200px] px-5 pb-4 sm:px-8">
          <div className="rounded-[2rem] border border-[#d2e4df] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(11,70,62,.35)] sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Filtre sua leitura</p>
                <h2 className="mt-1 font-display text-xl font-semibold text-[#173e39]">Encontre um conteúdo para este momento</h2>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#6a8880]">
                <span aria-live="polite">{isFiltering ? `${filteredEditorialItems.length} resultado${filteredEditorialItems.length === 1 ? "" : "s"}` : `${EDITORIAL_CONTENT.length} conteúdos disponíveis`}</span>
                {isFiltering && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[#0a7066] hover:bg-[#e9f6f2]"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" /> Limpar filtros
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map(category => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-2 ${selectedCategory === category ? "border-[#0a7066] bg-[#0a7066] text-white" : "border-[#cfe4de] bg-[#f4fbf8] text-[#35645b] hover:border-[#0a7066] hover:text-[#0a7066]"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {isFiltering && (
              <div className="mt-6" aria-live="polite">
                {filteredEditorialItems.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEditorialItems.map(article => (
                      <Link key={article.id} href={article.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-[#d9e7e2] bg-[#fffefa] transition-all hover:-translate-y-0.5 hover:border-[#0a7066] hover:shadow-[0_16px_30px_-22px_rgba(11,70,62,.4)]">
                        {article.image && <img src={article.image} alt={`Ilustração editorial sobre ${article.primaryEntity}`} className="aspect-[16/8] w-full object-cover" />}
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full bg-[#e5f4ef] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#0a7066]">{article.category}</span>
                            <span className="text-[11px] font-semibold text-[#68857e]">{article.readingTime}</span>
                          </div>
                          <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-[#173e39] group-hover:text-[#0a7066]">{article.title}</h3>
                          <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#628079]">{article.excerpt}</p>
                          <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#edf4f1] pt-4">
                            <span className="text-xs font-bold text-[#0a7066]">Ler artigo →</span>
                            <button
                              type="button"
                              aria-label={`${savedIds.includes(article.id) ? "Remover" : "Salvar"} ${article.title}`}
                              onClick={(e) => handleToggleSave(e, { id: article.id, title: article.title, excerpt: article.excerpt, category: article.category, readingTime: article.readingTime, slug: article.slug })}
                              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${savedIds.includes(article.id) ? "bg-[#0a7066] text-white" : "border border-[#bde0d6] bg-[#f4fbf8] text-[#0a7066] hover:bg-[#e4f4ef]"}`}
                            >
                              <Bookmark className="h-3 w-3" aria-hidden="true" />
                              {savedIds.includes(article.id) ? "Salvo" : "Salvar"}
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#b9d8d0] bg-[#f4fbf8] px-6 py-8 text-center">
                    <Search className="mx-auto h-7 w-7 text-[#82b8b0]" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-semibold text-[#173e39]">Nenhum conteúdo encontrado</h3>
                    <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-[#628079]">Tente buscar por outro termo ou escolha uma categoria diferente. Você também pode explorar todos os conteúdos.</p>
                    <button type="button" onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }} className="mt-4 rounded-xl bg-[#0a615a] px-4 py-2 text-xs font-bold text-white hover:bg-[#074d47]">Ver todos os conteúdos</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* EXPLORE POR TEMA */}
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Temas centrais</p>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Explore por tema</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#617f78]">
              Encontre conteúdos, testes e guias organizados pelos principais temas de saúde mental.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {EDITORIAL_TOPICS.map(topic => {
              const Icon = iconMap[topic.iconName] || BookOpen;
              return (
                <Link key={topic.id} href="/testes" className="group flex flex-col justify-between rounded-3xl border border-[#d9e7e2] bg-[#fffefa] p-6 transition-all hover:-translate-y-1 hover:border-[#0a7066] hover:shadow-[0_20px_40px_-24px_rgba(11,70,62,.35)]">
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5f4ef] text-[#0a7066] transition-colors group-hover:bg-[#0a7066] group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="mt-5 block text-[11px] font-bold uppercase tracking-[.14em] text-[#6e8e86]">{topic.category}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-[#173e39]">{topic.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#628079]">{topic.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#0a7066] transition-transform group-hover:translate-x-1">
                    Explorar testes <span aria-hidden="true">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FEATURED CONTENT (Composição Assimétrica) */}
        <section className="bg-[#edf6f3] py-16 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Seleção editorial</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Em destaque</h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_.9fr]">
              {/* Card Principal (2/3) */}
              {FEATURED_ARTICLES[0] && (
                <Link href="/testes" className="group flex flex-col justify-between rounded-[2rem] border border-[#d2e4df] bg-white p-4 shadow-[0_22px_45px_-30px_rgba(11,70,62,.3)] transition-all hover:border-[#0a7066] sm:p-7">
                  {FEATURED_ARTICLES[0].image && <img src={FEATURED_ARTICLES[0].image} alt="Ilustração editorial sobre ansiedade" className="mb-6 aspect-[16/8] w-full rounded-[1.5rem] object-cover" />}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#0a7066] px-3.5 py-1 text-xs font-bold text-white">{FEATURED_ARTICLES[0].category}</span>
                      <span className="text-xs font-semibold text-[#68857e]">{FEATURED_ARTICLES[0].readingTime}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-[-.03em] text-[#123f3b] sm:text-3xl group-hover:text-[#0a7066] transition-colors">
                      {FEATURED_ARTICLES[0].title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#5b7871]">
                      {FEATURED_ARTICLES[0].excerpt}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 border-t border-[#e8f2ef] pt-5 sm:flex-row sm:items-center sm:justify-between text-xs text-[#628079]">
                    <span>Por <strong>{FEATURED_ARTICLES[0].author}</strong>{FEATURED_ARTICLES[0].reviewer ? ` · Revisado por ${FEATURED_ARTICLES[0].reviewer}` : ""}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => handleToggleSave(e, { id: FEATURED_ARTICLES[0].id, title: FEATURED_ARTICLES[0].title, excerpt: FEATURED_ARTICLES[0].excerpt, category: FEATURED_ARTICLES[0].category, readingTime: FEATURED_ARTICLES[0].readingTime, slug: FEATURED_ARTICLES[0].slug })}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition-colors ${savedIds.includes(FEATURED_ARTICLES[0].id) ? "bg-[#0a7066] text-white" : "border border-[#bde0d6] bg-[#f4fbf8] text-[#0a7066] hover:bg-[#e4f4ef]"}`}
                      >
                        <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                        {savedIds.includes(FEATURED_ARTICLES[0].id) ? "Salvo" : "Salvar para depois"}
                      </button>
                      <span className="font-bold text-[#0a7066] flex items-center gap-1 group-hover:translate-x-1 transition-transform">Ver testes →</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Dois conteúdos menores empilhados */}
              <div className="flex flex-col gap-6">
                {FEATURED_ARTICLES.slice(1, 3).map(article => (
                  <Link key={article.id} href="/testes" className="group flex flex-col justify-between rounded-[2rem] border border-[#d2e4df] bg-white p-4 shadow-[0_16px_35px_-26px_rgba(11,70,62,.25)] transition-all hover:border-[#0a7066] sm:p-6">
                    {article.image && <img src={article.image} alt={`Ilustração editorial sobre ${article.primaryEntity}`} className="mb-5 aspect-[16/8] w-full rounded-[1.25rem] object-cover" />}
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#e5f4ef] px-3 py-0.5 text-[11px] font-bold text-[#0a7066]">{article.category}</span>
                        <span className="text-xs font-semibold text-[#68857e]">{article.readingTime}</span>
                      </div>
                      <h4 className="mt-3 font-display text-lg font-semibold leading-tight text-[#173e39] group-hover:text-[#0a7066] transition-colors">
                        {article.title}
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-[#628079] line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[#edf4f1] pt-3 text-[11px] text-[#6d8a83]">
                      <span>{article.author}</span>
                      <button
                        type="button"
                        onClick={(e) => handleToggleSave(e, { id: article.id, title: article.title, excerpt: article.excerpt, category: article.category, readingTime: article.readingTime, slug: article.slug })}
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-colors ${savedIds.includes(article.id) ? "bg-[#0a7066] text-white" : "border border-[#bde0d6] bg-[#f4fbf8] text-[#0a7066] hover:bg-[#e4f4ef]"}`}
                      >
                        <Bookmark className="h-3 w-3" aria-hidden="true" />
                        {savedIds.includes(article.id) ? "Salvo" : "Salvar"}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMEÇE POR AQUI */}
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Navegação por intenção</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Comece por aqui</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#617f78]">
              Escolha o caminho que mais se aproxima do que você está procurando neste momento.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {START_PATHS.map((path, idx) => (
              <div key={path.id} className={`flex flex-col justify-between rounded-3xl border border-[#d9e7e2] bg-[#fffefa] p-7 transition-all hover:border-[#0a7066] hover:shadow-[0_20px_40px_-24px_rgba(11,70,62,.3)] ${idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div>
                  <span className="font-display text-2xl font-semibold text-[#82b8b0]">0{idx + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-[#173e39]">{path.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#628079]">{path.description}</p>
                </div>
                <div className="mt-8">
                  <Button onClick={() => setLocation(path.href)} variant="outline" className="h-10 w-full justify-between rounded-xl border-[#bde0d6] bg-[#f4fbf8] text-xs font-bold text-[#0a7066] hover:bg-[#0a7066] hover:text-white">
                    {path.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GUIAS ESSENCIAIS */}
        <section className="bg-[#123f3b] py-16 px-5 text-white sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#82d6ca]">Aprofundamento</p>
                <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-white">Guias essenciais</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#c2dfd8]">
                Materiais estruturados para oferecer uma visão completa e acessível sobre condições e métodos.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ESSENTIAL_GUIDES.map(guide => (
                <Link key={guide.id} href="/testes" className="group flex flex-col justify-between rounded-3xl border border-[#235852] bg-[#184e48] p-4 transition-all hover:border-[#82d6ca] hover:bg-[#1f5b54] sm:p-6">
                  {guide.image && <img src={guide.image} alt={`Ilustração editorial sobre ${guide.primaryEntity}`} className="mb-5 aspect-[16/8] w-full rounded-2xl object-cover" />}
                  <div>
                    <span className="rounded-full bg-[#27665f] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#82d6ca]">GUIA MENTAL SAÚDE</span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-white group-hover:text-[#a2e6dc] transition-colors">{guide.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#b8d8d0]">{guide.excerpt}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-[#255f58] pt-4 text-xs text-[#a2e6dc]">
                    <span>{guide.readingTime}</span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleSave(e, { id: guide.id, title: guide.title, excerpt: guide.excerpt, category: guide.category, readingTime: guide.readingTime, slug: guide.slug })}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-colors ${savedIds.includes(guide.id) ? "bg-[#82d6ca] text-[#123f3b]" : "border border-[#38746c] bg-[#1a554f] text-[#82d6ca] hover:bg-[#22675f]"}`}
                    >
                      <Bookmark className="h-3 w-3" aria-hidden="true" />
                      {savedIds.includes(guide.id) ? "Salvo" : "Salvar"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ ESTÁ SENTINDO? (Sintomas navegáveis por Link) */}
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Sintomas comuns</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">O que você está sentindo?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#617f78]">
              Às vezes a busca começa por um sintoma, não pelo nome de uma condição.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SYMPTOMS_LIST.map((symptom, idx) => (
              <Link key={idx} href="/testes" className="rounded-2xl border border-[#d2e4df] bg-white px-5 py-3 text-xs font-semibold text-[#254b45] shadow-sm transition-all hover:border-[#0a7066] hover:bg-[#e9f6f2] hover:text-[#0a7066]">
                {symptom}
              </Link>
            ))}
          </div>
        </section>

        {/* TESTES RELACIONADOS (Exatamente 3 cards de testes) */}
        <section className="bg-[#edf6f3] py-16 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Autoavaliação baseada em evidências</p>
                <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Quer entender melhor como você tem se sentido?</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#5b7871]">
                Os testes utilizam instrumentos de triagem que ajudam você a observar sinais. Eles não substituem avaliação profissional.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl border border-[#d0e4df] bg-white p-6 shadow-sm">
                <div>
                  <span className="rounded-full bg-[#e4f4ef] px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#0a7066]">ASRS v1.1</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#173e39]">Screener de TDAH em Adultos</h3>
                  <p className="mt-2 text-xs leading-5 text-[#628079]">6 perguntas baseadas na OMS para observar atenção e impulsividade.</p>
                </div>
                <Button onClick={() => setLocation("/testes")} className="mt-6 h-9 w-full rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
                  Fazer autoavaliação →
                </Button>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#d0e4df] bg-white p-6 shadow-sm">
                <div>
                  <span className="rounded-full bg-[#e4f4ef] px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#0a7066]">Autoobservação</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#173e39]">Teste de Ansiedade</h3>
                  <p className="mt-2 text-xs leading-5 text-[#628079]">Observe sinais de preocupação excessiva e tensão cotidiana.</p>
                </div>
                <Button onClick={() => setLocation("/testes")} className="mt-6 h-9 w-full rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
                  Fazer autoavaliação →
                </Button>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#d0e4df] bg-white p-6 shadow-sm">
                <div>
                  <span className="rounded-full bg-[#e4f4ef] px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#0a7066]">Autoobservação</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#173e39]">Teste de Depressão</h3>
                  <p className="mt-2 text-xs leading-5 text-[#628079]">Avalie sentimentos de desânimo, energia e interesse em atividades.</p>
                </div>
                <Button onClick={() => setLocation("/testes")} className="mt-6 h-9 w-full rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
                  Fazer autoavaliação →
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button onClick={() => setLocation("/testes")} className="h-11 rounded-xl bg-[#0a615a] px-6 text-sm font-semibold text-white hover:bg-[#074d47]">
                Ver todos os testes
              </Button>
              <Button onClick={() => setLocation("/testes")} variant="outline" className="h-11 rounded-xl border-[#bde0d6] bg-white px-6 text-sm font-semibold text-[#0a7066] hover:bg-[#f1f8f5]">
                Não sei qual teste fazer
              </Button>
            </div>
          </div>
        </section>

        {/* LEITURAS RECOMENDADAS & RECENTES */}
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Atualizações recentes</p>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Leituras recomendadas</h2>
            </div>
            <button onClick={() => setLocation("/testes")} className="text-sm font-bold text-[#0a7066] hover:text-[#064b46]">
              Ver catálogo completo de testes →
            </button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RECENT_ARTICLES.map(article => (
              <Link key={article.id} href="/testes" className="group flex flex-col justify-between rounded-3xl border border-[#d9e7e2] bg-[#fffefa] p-4 transition-all hover:border-[#0a7066] hover:shadow-[0_20px_40px_-24px_rgba(11,70,62,.3)] sm:p-6">
                {article.image && <img src={article.image} alt={`Ilustração editorial sobre ${article.primaryEntity}`} className="mb-5 aspect-[16/8] w-full rounded-2xl object-cover" />}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#e5f4ef] px-3 py-0.5 text-[11px] font-bold text-[#0a7066]">{article.category}</span>
                    <span className="text-xs font-semibold text-[#68857e]">{article.readingTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-[#173e39] group-hover:text-[#0a7066] transition-colors">{article.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#628079]">{article.excerpt}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#edf4f1] pt-4 text-xs text-[#6e8c85]">
                  <span>{article.author}</span>
                  <button
                    type="button"
                    onClick={(e) => handleToggleSave(e, { id: article.id, title: article.title, excerpt: article.excerpt, category: article.category, readingTime: article.readingTime, slug: article.slug })}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-colors ${savedIds.includes(article.id) ? "bg-[#0a7066] text-white" : "border border-[#bde0d6] bg-[#f4fbf8] text-[#0a7066] hover:bg-[#e4f4ef]"}`}
                  >
                    <Bookmark className="h-3 w-3" aria-hidden="true" />
                    {savedIds.includes(article.id) ? "Salvo" : "Salvar"}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* KNOWLEDGE TRUST SECTION (Com CTA de Metodologia Editorial) */}
        <section className="bg-[#e9f5f2] py-16 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Compromisso rigoroso</p>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Informação que você consegue verificar</h2>
              <p className="mt-3 text-sm leading-6 text-[#5b7871]">
                Queremos que você saiba de onde uma informação veio, quem a revisou e quais são os limites do que podemos afirmar.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-[#cbe4de] bg-white p-6 shadow-sm">
                <Shield className="h-6 w-6 text-[#0a7066]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#173e39]">Fontes transparentes</h3>
                <p className="mt-2 text-xs leading-5 text-[#628079]">Referências científicas e diretrizes clínicas disponíveis em nossos conteúdos.</p>
              </div>
              <div className="rounded-3xl border border-[#cbe4de] bg-white p-6 shadow-sm">
                <CheckCircle className="h-6 w-6 text-[#0a7066]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#173e39]">Revisão especializada</h3>
                <p className="mt-2 text-xs leading-5 text-[#628079]">Conteúdos sensíveis contam com validação por profissionais habilitados.</p>
              </div>
              <div className="rounded-3xl border border-[#cbe4de] bg-white p-6 shadow-sm">
                <BookOpen className="h-6 w-6 text-[#0a7066]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#173e39]">Atualização contínua</h3>
                <p className="mt-2 text-xs leading-5 text-[#628079]">Materiais são revisados periodicamente conforme novas evidências.</p>
              </div>
              <div className="rounded-3xl border border-[#cbe4de] bg-white p-6 shadow-sm">
                <Compass className="h-6 w-6 text-[#0a7066]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#173e39]">Limites explicados</h3>
                <p className="mt-2 text-xs leading-5 text-[#628079]">Quando a evidência não permite conclusão definitiva, isso é explicitado.</p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button onClick={() => setLocation("/metodologia")} variant="outline" className="h-11 rounded-xl border-[#0a7066] bg-white px-6 text-sm font-bold text-[#0a7066] hover:bg-[#0a7066] hover:text-white">
                Conheça nossa metodologia editorial →
              </Button>
            </div>
          </div>
        </section>

        {/* ESPECIALISTAS (Com CTA 'Conhecer especialista') */}
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0a7066]">Corpo Clínico e Consultivo</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-.03em] text-[#123f3b]">Quem ajuda a revisar nossos conteúdos</h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {EDITORIAL_SPECIALISTS.map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-5 rounded-3xl border border-[#d9e7e2] bg-[#fffefa] p-6 shadow-sm text-center sm:text-left">
                <img src={spec.avatar} alt={spec.name} className="h-16 w-16 rounded-2xl object-cover shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#173e39]">{spec.name}</h3>
                  <p className="text-xs font-medium text-[#0a7066]">{spec.role}</p>
                  <p className="mt-1 text-[11px] text-[#6e8c85]">{spec.credentials}</p>
                  <span className="mt-2 inline-block rounded-full bg-[#eef8f5] px-2.5 py-0.5 text-[10px] font-bold text-[#0a7066]">{spec.reviewedCount}</span>
                  <div className="mt-4">
                    <Button onClick={() => setLocation("/testes")} size="sm" variant="ghost" className="h-8 p-0 text-xs font-bold text-[#0a7066] hover:bg-transparent hover:text-[#064b46]">
                      Conhecer especialista →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA EDITORIAL FINAL */}
        <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#123f3b] p-8 text-white sm:p-14 text-center relative">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#1b5a53] opacity-40 blur-2xl" aria-hidden="true" />
            <h2 className="relative font-display text-3xl font-semibold tracking-[-.03em] sm:text-4xl">Não sabe por onde começar?</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-6 text-[#c5ded8] sm:text-base">
              Responda algumas perguntas e encontre conteúdos e testes relacionados ao que você está sentindo.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Button onClick={() => setLocation("/testes")} className="h-12 rounded-xl bg-[#82d6ca] px-8 text-sm font-bold text-[#123f3b] hover:bg-[#6fc7bc]">
                Encontrar meu teste
              </Button>
              <Button onClick={() => setLocation("/testes")} variant="outline" className="h-12 rounded-xl border-[#397a72] bg-transparent px-8 text-sm font-semibold text-white hover:bg-[#1f5952]">
                Ver todos os testes
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer institucional reutilizado */}
      <footer className="border-t border-[#dce9e4] bg-[#f1f8f5] py-12 px-5 sm:px-8 text-xs text-[#628079]">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Brand compact />
            <p className="mt-3 max-w-sm leading-5">Uma plataforma de autoconhecimento responsável. Em situações de risk imediato, procure serviços de emergência ou apoio profissional local (CVV 188).</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold text-[#3b5d56]">
            <Link href="/conteudos" className="hover:text-[#0b7167]">Conteúdos</Link>
            <Link href="/testes" className="hover:text-[#0b7167]">Testes</Link>
            <Link href="/termos" className="hover:text-[#0b7167]">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-[#0b7167]">Privacidade</Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1200px] border-t border-[#e2ede8] pt-6 text-center text-[#7a9991]">
          © 2026 Mental Saúde. Autocuidado começa com informação de qualidade.
        </div>
      </footer>
    </div>
  );
}
