import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ContrastMode = "normal" | "high";
export type FontScale = "small" | "default" | "large";

type AccessibilityPreferences = {
  contrast: ContrastMode;
  fontScale: FontScale;
};

type AccessibilityContextValue = AccessibilityPreferences & {
  setContrast: (contrast: ContrastMode) => void;
  setFontScale: (fontScale: FontScale) => void;
  reset: () => void;
};

const STORAGE_KEY = "mental-saude:accessibility";
const defaults: AccessibilityPreferences = { contrast: "normal", fontScale: "default" };

function readPreferences(): AccessibilityPreferences {
  if (typeof window === "undefined") return defaults;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<AccessibilityPreferences> | null;
    return {
      contrast: stored?.contrast === "high" ? "high" : defaults.contrast,
      fontScale: stored?.fontScale === "small" || stored?.fontScale === "large" ? stored.fontScale : defaults.fontScale,
    };
  } catch {
    return defaults;
  }
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(readPreferences);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-high-contrast", preferences.contrast === "high");
    if (preferences.fontScale === "default") delete root.dataset.fontScale;
    else root.dataset.fontScale = preferences.fontScale;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // A preferência visual não deve impedir a navegação se o armazenamento estiver indisponível.
    }
  }, [preferences]);

  const value = useMemo<AccessibilityContextValue>(() => ({
    ...preferences,
    setContrast: contrast => setPreferences(current => ({ ...current, contrast })),
    setFontScale: fontScale => setPreferences(current => ({ ...current, fontScale })),
    reset: () => setPreferences(defaults),
  }), [preferences]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return context;
}
