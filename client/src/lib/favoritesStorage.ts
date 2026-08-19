export type FavoriteItemType = "article" | "assessment";

export type FavoriteItem = {
  id: string;
  type: FavoriteItemType;
  title: string;
  description: string;
  category: string;
  meta: string; // ex.: "7 min de leitura" ou "6 perguntas · ASRS"
  url: string; // ex.: "/conteudos/ansiedade-o-que-e-sintomas-causas" ou "/testes/asrs"
  savedAt: number;
};

const FAVORITES_KEY_PREFIX = "mental_saude_favorites_";

export function getFavorites(userId: string | number = "guest"): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY_PREFIX + userId);
    if (!raw) return [];
    return JSON.parse(raw) as FavoriteItem[];
  } catch (err) {
    console.error("Failed to load favorites", err);
    return [];
  }
}

export function addFavorite(userId: string | number = "guest", item: Omit<FavoriteItem, "savedAt">): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getFavorites(userId);
    if (current.some(existing => existing.id === item.id && existing.type === item.type)) {
      return current;
    }
    const updated: FavoriteItem[] = [{ ...item, savedAt: Date.now() }, ...current];
    window.localStorage.setItem(FAVORITES_KEY_PREFIX + userId, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to add favorite", err);
    return getFavorites(userId);
  }
}

export function removeFavorite(userId: string | number = "guest", id: string, type: FavoriteItemType): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getFavorites(userId);
    const updated = current.filter(item => !(item.id === id && item.type === type));
    window.localStorage.setItem(FAVORITES_KEY_PREFIX + userId, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to remove favorite", err);
    return getFavorites(userId);
  }
}

export function isFavorite(userId: string | number = "guest", id: string, type: FavoriteItemType): boolean {
  const current = getFavorites(userId);
  return current.some(item => item.id === id && item.type === type);
}
