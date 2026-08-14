import React from "react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import PublicHeader from "@/components/PublicHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, CheckCircle2, ArrowRight, BookOpen, FileCheck, LoaderCircle } from "lucide-react";

export function AsrsEntityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 px-4 md:px-8 border-b border-border/40">
          <div className="container max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-primary border-primary/30">
                Test Entity Page · ASRS v1.1
              </Badge>
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                Instrumento de Rastreio (Screening)
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-serif">
              Escala de Autorrelato ASRS v1.1 para TDAH em Adultos
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Instrumento padronizado desenvolvido pela Organização Mundial da Saúde (OMS) em conjunto com a Universidade de Harvard para rastrear sinais de TDAH em adultos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/testes/asrs/iniciar">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Activity className="w-5 h-5" /> Iniciar Avaliação ASRS
                </Button>
              </Link>
              <Link href="/tdah">
                <Button size="lg" variant="outline" className="gap-2">
                  Voltar ao Pillar TDAH
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Details Content */}
        <div className="container max-w-4xl mx-auto py-12 px-4 md:px-8 space-y-12">
          
          {/* Direct Warning */}
          <Card className="border-l-4 border-l-amber-500 bg-amber-500/5 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" /> ASRS ≠ Diagnóstico Clínico
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                O ASRS v1.1 é uma ferramenta de <strong>rastreio (screening)</strong> e observação sintomática. Um resultado elevado sugere a conveniência de buscar uma avaliação diagnóstica formal, mas não substitui em hipótese alguma o laudo emitido por um médico ou psicólogo qualificado.
              </p>
            </CardContent>
          </Card>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> O que é o ASRS?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Criado no âmbito da Iniciativa Mundial da OMS para a Saúde Mental, o Adult ADHD Self-Report Scale (ASRS) traduz critérios diagnósticos em perguntas objetivas de autorrelato sobre os últimos 6 meses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" /> O que ele avalia?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  O questionário divide-se em duas partes fundamentais: Parte A (focada nos sintomas centrais de desatenção com maior valor preditivo em adultos) e Parte B (sintomas de hiperatividade e impulsividade).
                </p>
              </CardContent>
            </Card>

          </div>

          {/* Methodology & Limitations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">Diretrizes de Interpretação e Limitações</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                As respostas refletem a frequência de comportamentos e dificuldades cotidianas. Fatores como privação de sono, estresse agudo, ansiedade ou quadros depressivos podem mimetizar sintomas de déficits atencionais, tornando fundamental a interpretação contextual por um especialista.
              </p>
              <p>
                O sistema de salvamento local da Mental Saúde garante que seus dados de resposta permaneçam estritamente privados em seu navegador, sem exposição pública de escores ou cruzamento com dados pessoais.
              </p>
            </div>
          </div>

          {/* References */}
          <div className="border border-border/60 rounded-xl p-6 bg-card space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Referências Científicas e Proveniência</h4>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
              <li>World Health Organization (WHO). Adult ADHD Self-Report Scale (ASRS-v1.1) Symptom Checklist.</li>
              <li>Kessler RC, Adler L, Ames M, et al. The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population. <em>Psychol Med</em>. 2005;35(2):245-256.</li>
            </ul>
          </div>

        </div>
      </main>

      <footer className="border-t border-border/40 py-8 px-4 text-center text-sm text-muted-foreground bg-background">
        <div className="container max-w-4xl mx-auto">
          <p>© 2026 Mental Saúde. Ciência, Cuidado e Equilíbrio.</p>
        </div>
      </footer>
    </div>
  );
}


export function AsrsExecutionLaunchPage() {
  const [, setLocation] = useLocation();
  const { data: assessments, isLoading, error } = trpc.assessments.listPublished.useQuery();

  useEffect(() => {
    const assessment = assessments?.find(item => item.slug.includes("asrs") || item.title.toLowerCase().includes("asrs"));
    if (assessment) setLocation(`/avaliacao/${assessment.id}`);
  }, [assessments, setLocation]);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        {isLoading && <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" aria-label="Carregando execução do ASRS" />}
        <h1 className="mt-5 font-serif text-3xl font-semibold">Preparando o ASRS v1.1</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Você será encaminhado para a execução privada do instrumento. O ASRS é um rastreio e não confirma diagnóstico.
        </p>
        {error && <p className="mt-4 text-sm text-destructive">Não foi possível localizar a execução publicada. Volte ao catálogo de testes.</p>}
        <Link href="/testes" className="mt-6 inline-flex font-semibold text-primary underline underline-offset-4">Voltar ao catálogo</Link>
      </div>
    </div>
  );
}
