export const PCL5_ASSESSMENT = {
  id: "pcl-5",
  slug: "pcl-5",
  title: "Lista de Verificação de TEPT para o DSM-5 (PCL-5)",
  acronym: "PCL-5",
  category: "Trauma e Estresse",
  description: "Instrumento de 20 perguntas para autoavaliação e rastreio de sintomas de estresse pós-traumático conforme os critérios do DSM-5.",
  fullOverview: "O PCL-5 (Posttraumatic Stress Disorder Checklist for DSM-5) é um instrumento de autorrelato amplamente validado internacionalmente e adaptado para o contexto brasileiro para mensurar a gravidade dos 20 sintomas de TEPT descritos no DSM-5-TR. Permite organizar percepções sobre memórias intrusivas, evitação, alterações de humor e hiperativação no último mês.",
  questionCount: 20,
  durationMinutes: 5,
  difficulty: "Moderada" as const,
  targetRoute: "/testes/pcl-5",
  executionRoute: "/testes/pcl-5/iniciar",
  methodologyNotes: "Desenvolvido pelo National Center for PTSD (Weathers et al., 2013). Validado no Brasil. Não substitui diagnóstico clínico.",
  scoringGuide: {
    kind: "pcl-5-standard",
    cutOff: 33,
    bands: [
      { max: 32, label: "Baixo Indicador de Sintomas de TEPT", summary: "Suas respostas indicam pouca ou nenhuma frequência de sintomas pós-traumáticos significativos no último mês. Caso sinta desconforto persistente, converse com um profissional." },
      { max: 80, label: "Atenção Prioritária (Sintomas Elevados de TEPT)", summary: "Suas respostas apontam para uma pontuação elevada de sintomas relacionados ao trauma. Recomenda-se buscar avaliação especializada com psicólogo ou psiquiatra para suporte adequado." }
    ]
  },
  questions: [
    { id: 1, statement: "Lembranças, pensamentos ou imagens indesejadas sobre o evento estressante?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 2, statement: "Sonhos repetitivos e perturbadores sobre o evento estressante?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 3, statement: "Sentir ou agir repentinamente como se o evento estressante estivesse acontecendo de novo?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 4, statement: "Sentir forte sofrimento emocional quando algo lembrava o evento estressante?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 5, statement: "Ter reações físicas fortes (coração acelerado, falta de ar, suor) quando algo lembrava o evento?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 6, statement: "Evitar memórias, pensamentos ou sentimentos relacionados ao evento estressante?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 7, statement: "Evitar lembretes externos (pessoas, lugares, conversas, objetos) relacionados ao evento?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 8, statement: "Dificuldade em lembrar de alguma parte importante do evento estressante?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 9, statement: "Ter crenças negativas exageradas sobre si mesmo, os outros ou o mundo?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 10, statement: "Culpar a si mesmo ou a outra pessoa pelo evento estressante ou pelo que aconteceu depois?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 11, statement: "Sentir emoções negativas fortes como medo, horror, raiva, culpa ou vergonha?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 12, statement: "Perda marcante de interesse em atividades que antes eram importantes ou agradáveis?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 13, statement: "Sentir-se distante ou isolado de outras pessoas?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 14, statement: "Dificuldade em sentir emoções positivas (como amor ou alegria)?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 15, statement: "Comportamento irritável, explosões de raiva ou agir com agressividade?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 16, statement: "Assumir riscos excessivos ou fazer coisas que poderiam causar dano?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 17, statement: "Estar hiperalerta, excessivamente cauteloso ou na defensiva?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 18, statement: "Ter sobressaltos exagerados ou assustar-se com facilidade?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 19, statement: "Dificuldade para adormecer ou manter o sono?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] },
    { id: 20, statement: "Dificuldade de concentração?", options: [ { id: 0, label: "De modo algum", score: 0 }, { id: 1, label: "Um pouco", score: 1 }, { id: 2, label: "Moderadamente", score: 2 }, { id: 3, label: "Bastante", score: 3 }, { id: 4, label: "Extremamente", score: 4 } ] }
  ]
};
