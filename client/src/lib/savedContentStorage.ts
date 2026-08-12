export type SavedArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  slug: string;
  savedAt: number;
};

const STORAGE_KEY_PREFIX = "mental_saude_saved_articles_";

export function getSavedArticles(userId: string | number = "guest"): SavedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_PREFIX + userId);
    if (!raw) return [];
    return JSON.parse(raw) as SavedArticle[];
  } catch (err) {
    console.error("Failed to load saved articles", err);
    return [];
  }
}

export function saveArticle(userId: string | number = "guest", article: Omit<SavedArticle, "savedAt">): SavedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getSavedArticles(userId);
    // Evitar duplicatas
    if (current.some(item => item.id === article.id)) {
      return current;
    }
    const updated: SavedArticle[] = [{ ...article, savedAt: Date.now() }, ...current];
    window.localStorage.setItem(STORAGE_KEY_PREFIX + userId, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save article", err);
    return getSavedArticles(userId);
  }
}

export function removeSavedArticle(userId: string | number = "guest", articleId: string): SavedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getSavedArticles(userId);
    const updated = current.filter(item => item.id !== articleId);
    window.localStorage.setItem(STORAGE_KEY_PREFIX + userId, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to remove saved article", err);
    return getSavedArticles(userId);
  }
}

export function isArticleSaved(userId: string | number = "guest", articleId: string): boolean {
  const current = getSavedArticles(userId);
  return current.some(item => item.id === articleId);
}
