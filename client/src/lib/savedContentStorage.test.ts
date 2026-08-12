import { beforeEach, describe, expect, it } from "vitest";
import { getSavedArticles, isArticleSaved, removeSavedArticle, saveArticle } from "./savedContentStorage";

const memory = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => memory.set(key, value),
  removeItem: (key: string) => memory.delete(key),
  clear: () => memory.clear(),
  key: (_index: number) => null,
  length: 0,
} as unknown as Storage;

Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: { localStorage: localStorageMock },
});

const article = {
  id: "article-1",
  title: "Ansiedade: principais sinais",
  excerpt: "Um conteúdo educativo sobre sinais de ansiedade.",
  category: "Ansiedade",
  readingTime: "6 min de leitura",
  slug: "/conteudos/ansiedade-principais-sinais",
};

describe("conteúdos salvos para depois", () => {
  beforeEach(() => memory.clear());

  it("isola a biblioteca de cada usuário", () => {
    saveArticle("user-a", article);
    saveArticle("user-b", { ...article, id: "article-2", title: "Sono e saúde mental" });

    expect(getSavedArticles("user-a")).toHaveLength(1);
    expect(getSavedArticles("user-a")[0]?.title).toBe("Ansiedade: principais sinais");
    expect(getSavedArticles("user-b")[0]?.title).toBe("Sono e saúde mental");
  });

  it("não duplica o mesmo conteúdo e registra quando ele foi salvo", () => {
    saveArticle("user-a", article);
    saveArticle("user-a", article);

    const saved = getSavedArticles("user-a");
    expect(saved).toHaveLength(1);
    expect(saved[0]?.savedAt).toEqual(expect.any(Number));
    expect(isArticleSaved("user-a", "article-1")).toBe(true);
  });

  it("remove somente o conteúdo solicitado", () => {
    saveArticle("user-a", article);
    saveArticle("user-a", { ...article, id: "article-2", title: "TDAH em adultos" });

    removeSavedArticle("user-a", "article-1");

    expect(getSavedArticles("user-a")).toHaveLength(1);
    expect(getSavedArticles("user-a")[0]?.id).toBe("article-2");
    expect(isArticleSaved("user-a", "article-1")).toBe(false);
  });
});
