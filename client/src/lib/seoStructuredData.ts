export function injectArticleSchema(article: {
  title: string;
  shortDescription: string;
  slug: string;
  createdAt: number;
  updatedAt?: number;
  category: string;
  author: string;
  authorRole: string;
  coverImage?: string;
}) {
  const url = `https://www.mentalsaude.com.br/conteudos/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": article.title,
    "description": article.shortDescription,
    "url": url,
    "datePublished": new Date(article.createdAt).toISOString(),
    "dateModified": new Date(article.updatedAt || article.createdAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mental Saúde",
      "url": "https://www.mentalsaude.com.br",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mentalsaude.com.br/favicon.ico"
      }
    },
    "about": {
      "@type": "MedicalCondition",
      "name": article.category
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  let script = document.getElementById("structured-data-article");
  if (!script) {
    script = document.createElement("script");
    script.id = "structured-data-article";
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export function injectTestSchema(test: {
  title: string;
  description: string;
  slug: string;
  durationMinutes: number;
  category: string;
}) {
  const url = `https://www.mentalsaude.com.br/testes/${test.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": test.title,
    "description": test.description,
    "url": url,
    "significance": "Educational self-assessment for psychological wellbeing and clinical screening guidance.",
    "usedToDiagnose": {
      "@type": "MedicalCondition",
      "name": test.category
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mental Saúde",
      "url": "https://www.mentalsaude.com.br"
    }
  };

  let script = document.getElementById("structured-data-test");
  if (!script) {
    script = document.createElement("script");
    script.id = "structured-data-test";
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}
