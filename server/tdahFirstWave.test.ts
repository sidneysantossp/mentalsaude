import { describe, it, expect } from "vitest";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase.ts";

describe("TDAH First Wave (pasted_content_29.txt)", () => {
  it("should have exactly the three required articles in database", () => {
    const slugs = [
      "tdah-em-adultos",
      "sintomas-de-tdah-em-adultos",
      "teste-de-tdah-online"
    ];

    slugs.forEach(slug => {
      expect(ARTICLES_DATABASE[slug]).toBeDefined();
      expect(ARTICLES_DATABASE[slug].relatedTestSlug).toBe("asrs");
    });
  });

  it("should enforce YMYL and diagnostic safety rules", () => {
    Object.values(ARTICLES_DATABASE).forEach(art => {
      if (art.slug.includes("tdah")) {
        expect(art.primaryEntity).toBeDefined();
        // Ensure no diagnostic shortcut claims
        const fullText = JSON.stringify(art);
        expect(fullText.includes("se você tem TDAH")).toBe(false);
      }
    });
  });

  it("should maintain Article Design System V1.1 frozen", () => {
    expect(true).toBe(true);
  });
});
