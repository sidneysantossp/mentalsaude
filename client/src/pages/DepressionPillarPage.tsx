import React from "react";
import { Link } from "wouter";
import PublicHeader from "@/components/PublicHeader";
import { ContextualTestCTA } from "@/components/ContextualTestCTA";
import { ScientificCitation } from "@/components/ScientificCitation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CANONICAL_TESTS } from "@/data/testsCanonicalDatabase";
import { 
  Heart, 
  Brain, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  PhoneCall, 
  FileText,
  Compass
} from "lucide-react";

export function DepressionPillarPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50/60 to-background dark:from-teal-950/20 py-12 md:py-20 border-b border-border/40">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-teal-700 dark:text-teal-300 border-teal-300 bg-teal-50/50">
              Condição Clínica · Topic Hub Oficial
            </Badge>
            <Badge variant="secondary" className="text-muted-foreground">
              Revisado por Especialistas
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground mb-6">
            Depressão: Entendimento, Avaliação e Cuidado Baseado em Evidências
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
            A depressão é uma condição médica tratável que afeta o humor, a energia e a forma como encaramos o cotidiano. Conheça os sinais, os caminhos de avaliação profissional e os recursos de apoio disponíveis.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="#avaliar">
              <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-8 shadow-sm">
                Fazer o PHQ-9 (Rastreio) <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/conteudos/depressao-sintomas-causas-tratamento">
              <Button size="lg" variant="outline" className="rounded-full px-6 border-teal-700/30 text-teal-800 dark:text-teal-200">
                Ler Guia Editorial Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Hub Layout */}
      <main className="container max-w-5xl mx-auto px-4 py-12 flex-1 space-y-16">
        
        {/* Entenda a Depressão */}
        <section id="entenda" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
              <Brain className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Entenda a Condição
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-600" /> Mais do que Tristeza Passageira
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Diferente da tristeza comum ou de oscilações normais de humor, a depressão clínica caracteriza-se pela persistência de sintomas por duas semanas ou mais, interferindo significativamente nas atividades diárias, no trabalho e nos relacionamentos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-teal-600" /> Tratabilidade e Suporte
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Organizações de saúde em todo o mundo destacam que a depressão possui tratamentos altamente eficazes, combinando psicoterapia baseada em evidências, acompanhamento psiquiátrico e suporte psicossocial adequado.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sinais e Sintomas */}
        <section id="sintomas" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Sinais e Sintomas Comuns
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            A manifestação da depressão varia entre indivíduos, envolvendo aspectos físicos, emocionais e cognitivos. O <Link href="/conteudos/depressao-sintomas-causas-tratamento" className="text-teal-700 dark:text-teal-300 underline font-medium">Guia Editorial Completo de Sintomas e Causas</Link> aprofunda cada um destes domínios:
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-border/60 bg-card/50">
              <h4 className="font-semibold text-foreground mb-2">Humor e Emoção</h4>
              <p className="text-sm text-muted-foreground">Sentimento persistente de vazio, desesperança ou apatia generalizada.</p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card/50">
              <h4 className="font-semibold text-foreground mb-2">Energia e Corpo</h4>
              <p className="text-sm text-muted-foreground">Fadiga crônica, alterações no sono (insônia/hipersonia) e apetite.</p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card/50">
              <h4 className="font-semibold text-foreground mb-2">Cognição</h4>
              <p className="text-sm text-muted-foreground">Dificuldade de concentração, indecisão e pensamentos autocríticos.</p>
            </div>
          </div>
        </section>

        {/* Comparação: Tristeza vs Depressão */}
        <section id="comparacao" className="p-6 md:p-8 rounded-2xl bg-teal-900/5 dark:bg-teal-950/30 border border-teal-900/10 space-y-4">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-semibold text-sm uppercase tracking-wider">
            <Compass className="h-4 w-4" /> Artigo de Comparação Recomendado
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
            Tristeza ou depressão: como entender a diferença?
          </h3>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Nem toda tristeza prolongada configura um quadro clínico. Leia nossa análise aprofundada comparando a experiência emocional humana com a condição clínica da depressão.
          </p>
          <div>
            <Link href="/conteudos/tristeza-ou-depressao">
              <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full">
                Ler Artigo Comparativo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Avaliação e Rastreio / PHQ-9 */}
        <section id="avaliar" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Avaliação e Rastreio (PHQ-9)
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Ferramentas padronizadas de rastreio, como o questionário <strong>PHQ-9</strong> (Patient Health Questionnaire-9), auxiliam na observação dos sintomas nas últimas duas semanas. O instrumento serve para reflexão e organização de percepções, <em>não substituindo de forma alguma o diagnóstico médico formal</em>.
          </p>

          <div className="bg-card border border-border/60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-foreground">Conheça o Teste de Depressão Online (PHQ-9)</h4>
              <p className="text-sm text-muted-foreground max-w-xl">
                Entenda como funciona o questionário validado internacionalmente, sua estrutura de pontuação e como interpretar os resultados com segurança.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link href="/conteudos/teste-de-depressao-online">
                <Button variant="outline" className="w-full sm:w-auto border-teal-700/30 text-teal-800 dark:text-teal-200 rounded-full">
                  Ler Guia do Teste
                </Button>
              </Link>
            <Link href={CANONICAL_TESTS["phq-9"].targetRoute}>
              <Button className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white rounded-full">
                Iniciar PHQ-9 agora
              </Button>
            </Link>
            </div>
          </div>
        </section>

        {/* Contextual CTA for PHQ-9 */}
        <div className="my-8">
          <ContextualTestCTA test={CANONICAL_TESTS["phq-9"]} articleSlug="depressao" articleId="depression-pillar" />
        </div>

        {/* Quando Procurar Ajuda e Apoio */}
        <section id="ajuda" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
              <PhoneCall className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Quando Procurar Ajuda Profissional
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Se você ou alguém próximo tem enfrentado sentimentos persistentes de desesperança, esgotamento ou sofrimento emocional intenso, buscar suporte de um psicólogo ou psiquiatra é o passo mais seguro e eficaz. 
          </p>

          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-card-foreground flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Apoio Emocional Imediato (CVV)</h4>
              <p className="text-sm text-muted-foreground">
                O Centro de Valorização da Vida (CVV) oferece apoio emocional e prevenção do suicídio gratuito e sigiloso 24 horas por dia. Ligue <strong>188</strong> ou acesse <a href="https://www.cvv.org.br" target="_blank" rel="noreferrer" className="underline text-teal-700 dark:text-teal-300">cvv.org.br</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Cluster Navigation / Explore: grupos semânticos, não lista plana */}
        <section className="border-t border-border/60 pt-12 space-y-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-foreground">Explore o Cluster de Depressão</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Navegue por intenção: primeiro compreenda a condição, depois explore sinais, avaliação, comparação, cuidado e busca de ajuda.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300"><BookOpen className="h-4 w-4" /> Entenda a depressão</h4>
              <Link href="/conteudos/depressao-sintomas-causas-tratamento" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">Guia geral</span>
                <h5 className="mt-1 font-semibold text-foreground">Sintomas, causas, tratamento e quando procurar ajuda</h5>
                <p className="mt-1 text-xs text-muted-foreground">Visão ampla da condição clínica.</p>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300"><Heart className="h-4 w-4" /> Sintomas</h4>
              <Link href="/conteudos/sintomas-de-depressao" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">SYMPTOM</span>
                <h5 className="mt-1 font-semibold text-foreground">Sintomas de depressão</h5>
                <p className="mt-1 text-xs text-muted-foreground">Sinais emocionais, cognitivos e físicos sem diagnóstico automático.</p>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300"><FileText className="h-4 w-4" /> Avaliação</h4>
              <Link href="/conteudos/teste-de-depressao-online" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">Rastreio</span>
                <h5 className="mt-1 font-semibold text-foreground">Teste de Depressão Online (PHQ-9)</h5>
                <p className="mt-1 text-xs text-muted-foreground">Entenda o instrumento antes de iniciar a autoavaliação.</p>
              </Link>
              <Link href="/testes/phq-9" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">Entidade canônica</span>
                <h5 className="mt-1 font-semibold text-foreground">Página do PHQ-9</h5>
                <p className="mt-1 text-xs text-muted-foreground">Metodologia, limites e fluxo de execução.</p>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300"><Compass className="h-4 w-4" /> Comparações</h4>
              <Link href="/conteudos/tristeza-ou-depressao" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">Comparison</span>
                <h5 className="mt-1 font-semibold text-foreground">Tristeza ou depressão</h5>
                <p className="mt-1 text-xs text-muted-foreground">Diferenças entre uma emoção humana e uma condição clínica.</p>
              </Link>
              <Link href="/conteudos/ansiedade-ou-depressao" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">Ponte cross-cluster</span>
                <h5 className="mt-1 font-semibold text-foreground">Ansiedade ou depressão</h5>
                <p className="mt-1 text-xs text-muted-foreground">Conteúdo de diferenciação entre clusters preservado.</p>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300"><ShieldCheck className="h-4 w-4" /> Tratamento</h4>
              <Link href="/conteudos/tratamento-depressao" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">TREATMENT</span>
                <h5 className="mt-1 font-semibold text-foreground">Depressão tem tratamento?</h5>
                <p className="mt-1 text-xs text-muted-foreground">Abordagens gerais, acompanhamento e limites de segurança.</p>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300"><PhoneCall className="h-4 w-4" /> Ajuda profissional</h4>
              <Link href="/conteudos/qual-profissional-procurar-depressao" className="block rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-teal-600">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">PROFESSIONAL_HELP</span>
                <h5 className="mt-1 font-semibold text-foreground">Qual profissional procurar?</h5>
                <p className="mt-1 text-xs text-muted-foreground">Como psicólogo, psiquiatra e atenção primária podem participar do cuidado.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Evidence Sources */}
        <section className="border-t border-border/60 pt-8 text-xs text-muted-foreground space-y-2">
          <p className="font-semibold uppercase tracking-wider text-foreground">Fontes e Diretrizes Oficiais</p>
          <p>
            O conteúdo do cluster de Depressão da Mental Saúde fundamenta-se nas diretrizes da Organização Mundial da Saúde (OMS), do National Institute for Health and Care Excellence (NICE) e do National Institute of Mental Health (NIMH).
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8 bg-card/50 mt-16 text-center text-sm text-muted-foreground">
        <div className="container max-w-5xl mx-auto px-4 space-y-2">
          <p>© 2026 Mental Saúde. Ciência, Cuidado e Equilíbrio.</p>
          <p className="text-xs">As informações deste portal possuem caráter educacional e não substituem o diagnóstico ou acompanhamento profissional.</p>
        </div>
      </footer>
    </div>
  );
}
