import { describe, it, expect } from "vitest";

describe("Schema.org Structured Data Integrity", () => {
  it("generates valid medical web page schema structure", () => {
    const mockArticle = {
      title: "Teste de Artigo",
      shortDescription: "Descrição curta",
      slug: "teste-artigo",
      createdAt: Date.now(),
      category: "Ansiedade",
      author: "Dr. Teste",
      authorRole: "Psiquiatra",
      coverImage: "/manus-storage/test.png"
    };

    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "headline": mockArticle.title,
      "description": mockArticle.shortDescription,
      "url": `https://www.mentalsaude.com.br/conteudos/${mockArticle.slug}`,
      "author": {
        "@type": "Person",
        "name": mockArticle.author,
        "jobTitle": mockArticle.authorRole
      }
    };

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("MedicalWebPage");
    expect(schema.headline).toBe(mockArticle.title);
    expect(schema.author.name).toBe("Dr. Teste");
  });

  it("generates valid medical test schema structure", () => {
    const mockTest = {
      title: "PCL-5 (TEPT)",
      description: "Avaliação de estresse pós-traumático",
      slug: "pcl-5",
      durationMinutes: 6,
      category: "Trauma"
    };

    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalTest",
      "name": mockTest.title,
      "description": mockTest.description,
      "url": `https://www.mentalsaude.com.br/testes/${mockTest.slug}`
    };

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("MedicalTest");
    expect(schema.name).toBe("PCL-5 (TEPT)");
  });
});
