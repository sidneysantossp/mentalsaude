import { describe, expect, it } from "vitest";
import { calculateReadingProgress, getActiveSectionId } from "./readingProgress";

describe("reading progress utilities", () => {
  it("clamps the reading progress between 0 and 100", () => {
    expect(calculateReadingProgress(-50, 800, 1800)).toBe(0);
    expect(calculateReadingProgress(500, 800, 1800)).toBe(50);
    expect(calculateReadingProgress(1400, 800, 1800)).toBe(100);
    expect(calculateReadingProgress(2000, 800, 1800)).toBe(100);
  });

  it("returns 100 when the document does not require scrolling", () => {
    expect(calculateReadingProgress(0, 900, 900)).toBe(100);
    expect(calculateReadingProgress(0, 900, 700)).toBe(100);
  });

  it("selects the last section that crossed the activation offset", () => {
    expect(getActiveSectionId([
      { id: "intro", top: -120 },
      { id: "symptoms", top: 60 },
      { id: "treatment", top: 420 },
    ])).toBe("symptoms");
  });

  it("falls back to the first section before the index reaches the first heading", () => {
    expect(getActiveSectionId([
      { id: "intro", top: 420 },
      { id: "symptoms", top: 920 },
    ])).toBe("intro");
    expect(getActiveSectionId([])).toBe("");
  });
});
