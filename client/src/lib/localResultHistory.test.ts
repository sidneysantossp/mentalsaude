import { beforeEach, describe, expect, it } from "vitest";
import { clearLocalResultHistory, readLocalResultHistory, saveLocalResultHistory } from "./localResultHistory";

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

describe("histórico local de resultados", () => {
  beforeEach(() => memory.clear());

  it("salva registros isolados por usuário e devolve o mais recente primeiro", () => {
    saveLocalResultHistory("user-a", { assessmentId: 4, title: "Ansiedade", score: 4, percentage: 40, band: "atenção inicial" });
    saveLocalResultHistory("user-b", { assessmentId: 4, title: "Ansiedade", score: 8, percentage: 80, band: "atenção prioritária" });

    expect(readLocalResultHistory("user-a")).toHaveLength(1);
    expect(readLocalResultHistory("user-a")[0]?.percentage).toBe(40);
    expect(readLocalResultHistory("user-b")[0]?.percentage).toBe(80);
  });

  it("preserva a identificação do instrumento e os metadados de apresentação", () => {
    saveLocalResultHistory("user-a", { assessmentId: 1, title: "ASRS v1.1", score: 4, percentage: 67, band: "Converse com profissional habilitado", displayValue: "4 de 6", metricLabel: "respostas destacadas" });

    const [record] = readLocalResultHistory("user-a");
    expect(record).toMatchObject({ assessmentId: 1, title: "ASRS v1.1", displayValue: "4 de 6", metricLabel: "respostas destacadas" });
    expect(record?.completedAt).toEqual(expect.any(String));
    expect(record?.id).toEqual(expect.any(String));
  });

  it("limpa somente o histórico do usuário solicitado", () => {
    saveLocalResultHistory("user-a", { assessmentId: 2, title: "Depressão", score: 2, percentage: 20, band: "atenção inicial" });
    saveLocalResultHistory("user-b", { assessmentId: 3, title: "Compulsão Alimentar", score: 6, percentage: 60, band: "atenção intermediária" });

    clearLocalResultHistory("user-a");

    expect(readLocalResultHistory("user-a")).toEqual([]);
    expect(readLocalResultHistory("user-b")).toHaveLength(1);
  });
});
