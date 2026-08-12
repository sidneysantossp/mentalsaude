export type LocalResultRecord = {
  id: string;
  assessmentId: number;
  title: string;
  score: number;
  percentage: number;
  band: string;
  displayValue?: string;
  metricLabel?: string;
  completedAt: string;
};

const HISTORY_PREFIX = "mental-saude:result-history:";
const MAX_HISTORY_ITEMS = 40;

function storageKey(userKey?: string | number | null) {
  return `${HISTORY_PREFIX}${userKey ?? "anonymous"}`;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readLocalResultHistory(userKey?: string | number | null): LocalResultRecord[] {
  const storage = getStorage();
  if (!storage || !userKey) return [];
  try {
    const parsed = JSON.parse(storage.getItem(storageKey(userKey)) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is LocalResultRecord => Boolean(item && typeof item === "object" && "assessmentId" in item && "title" in item && "completedAt" in item))
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  } catch {
    return [];
  }
}

export function saveLocalResultHistory(userKey: string | number | null | undefined, result: Omit<LocalResultRecord, "id" | "completedAt">) {
  const storage = getStorage();
  if (!storage || !userKey) return;
  const record: LocalResultRecord = {
    ...result,
    id: `${result.assessmentId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: new Date().toISOString(),
  };
  const next = [record, ...readLocalResultHistory(userKey)].slice(0, MAX_HISTORY_ITEMS);
  try {
    storage.setItem(storageKey(userKey), JSON.stringify(next));
  } catch {
    // A falha no armazenamento local não deve impedir a conclusão da autoavaliação.
  }
}

export function clearLocalResultHistory(userKey?: string | number | null) {
  const storage = getStorage();
  if (!storage || !userKey) return;
  try {
    storage.removeItem(storageKey(userKey));
  } catch {
    // O histórico permanece intacto se o navegador bloquear a remoção.
  }
}
