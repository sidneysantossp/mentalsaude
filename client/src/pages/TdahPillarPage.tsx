import React from "react";
import { Link } from "wouter";
import PublicHeader from "@/components/PublicHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, CheckCircle2, ShieldAlert, ArrowRight, Activity, BookOpen, Stethoscope } from "lucide-react";

export function TdahPillarPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 px-4 md:px-8 border-b border-border/40">
          <div className="container max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-primary border-primary/30">
                Condition Pillar · Adultos
              </Badge>
              <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                YMYL Clínico Verificado
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-serif">
              TDAH em Adultos: Compreensão, Avaliação e Cuidado
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              O Transtorno do Déficit de Atenção com Hiperatividade (TDAH) manifesta-se na vida adulta com padrões persistentes de desatenção, desorganização e disfunção executiva. Conheça os fundamentos clínicos, métodos de rastreio e diretrizes de acompanhamento.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/testes/asrs">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Activity className="w-5 h-5" /> Fazer Teste de Rastreio (ASRS)
                </Button>
              </Link>
              <Link href="/testes">
                <Button size="lg" variant="outline" className="gap-2">
                  Catálogo de Instrumentos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content Hub */}
        <div className="container max-w-4xl mx-auto py-12 px-4 md:px-8 space-y-12">
          
          {/* Direct Answer */}
          <Card className="border-l-4 border-l-primary bg-card/50 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
                <Brain className="w-5 h-5 text-primary" /> O que é o TDAH em Adultos?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                O TDAH não é restrito à infância; adultos com a condição experimentam desafios contínuos na regulação da atenção, gerenciamento do tempo, manutenção de prioridades e controle de impulsos. O diagnóstico formal exige avaliação clínica especializada, enquanto ferramentas estruturadas auxiliam no rastreio inicial.
              </p>
            </CardContent>
          </Card>

          {/* Core Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  01
                </div>
                <h3 className="text-xl font-semibold text-foreground">Principais Grupos de Sinais</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Compreenda a manifestação dos sintomas cardinais: desatenção crônica, dificuldade em iniciar e concluir tarefas, desorganização espacial e mental, e impulsividade comportamental ou decisória.
                </p>
                <div className="pt-2 text-xs text-primary font-medium flex items-center gap-1">
                  <span>Sinais e Critérios Funcionais</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  02
                </div>
                <h3 className="text-xl font-semibold text-foreground">Avaliação vs. Rastreio</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Diferencie rigorosamente o rastreio padronizado (como a escala ASRS) do diagnóstico clínico formal, conduzido por médicos psiquiatras ou psicólogos especializados.
                </p>
                <div className="pt-2 text-xs text-primary font-medium flex items-center gap-1">
                  <span>Screening ≠ Diagnóstico</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  03
                </div>
                <h3 className="text-xl font-semibold text-foreground">Impactos na Vida Adulta</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Como a disfunção executiva afeta o desempenho profissional, a consistência nos estudos, a gestão da rotina doméstica e a dinâmica dos relacionamentos interpessoais.
                </p>
                <div className="pt-2 text-xs text-primary font-medium flex items-center gap-1">
                  <span>Rotina e Trabalho</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  04
                </div>
                <h3 className="text-xl font-semibold text-foreground">Tratamento e Suporte</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Visão geral das abordagens multimodais baseadas em evidências, incluindo psicoterapia cognitivo-comportamental (TCC), psicoeducação e suporte farmacológico supervisionado.
                </p>
                <div className="pt-2 text-xs text-primary font-medium flex items-center gap-1">
                  <span>Abordagem Multimodal</span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ASRS Banner */}
          <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="outline" className="text-secondary-foreground border-secondary">Instrumento Científico</Badge>
              <h3 className="text-2xl font-bold font-serif text-foreground">Escala de Autorrelato ASRS v1.1</h3>
              <p className="text-muted-foreground text-sm max-w-xl">
                Desenvolvida pela OMS em conjunto com a Universidade de Harvard, esta ferramenta auxilia na observação de sintomas em adultos.
              </p>
            </div>
            <Link href="/testes/asrs">
              <Button size="lg" className="gap-2 shrink-0">
                Conhecer o ASRS <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Clinical Disclaimer */}
          <div className="border border-border/60 rounded-xl p-6 bg-card text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> Aviso Clínico e Segurança YMYL
            </div>
            <p>
              As informações apresentadas neste portal possuem caráter estritamente educativo e informativo. O rastreio sintomático através de instrumentos digitais não substitui em hipótese alguma a consulta, avaliação diagnóstica e acompanhamento com profissional de saúde mental habilitado.
            </p>
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
