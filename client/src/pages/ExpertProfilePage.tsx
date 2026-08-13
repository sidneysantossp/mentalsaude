import PublicHeader from "@/components/PublicHeader";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";

const EXPERTS_DATA: Record<string, {
  name: string;
  role: string;
  credential: string;
  bio: string;
  avatar: string;
  expertise: string[];
}> = {
  "camila-mendes": {
    name: "Dra. Camila Mendes",
    role: "Psicóloga Clínica e Pesquisadora",
    credential: "CRP 06/88921 · Doutorado em Psicologia Clínica (USP)",
    bio: "Especialista em regulação emocional e avaliação psicológica baseada em evidências. Atua na revisão técnica e metodológica de conteúdos voltados a ansiedade, estresse e estratégias de enfrentamento.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    expertise: ["Ansiedade e Tensão", "Psicoterapia Baseada em Evidências", "Avaliação Psicológica"]
  },
  "roberto-s": {
    name: "Dr. Roberto S.",
    role: "Médico Psiquiatra",
    credential: "CRM 112340 · RQE Psiquiatria",
    bio: "Médico psiquiatra com foco em neurodesenvolvimento em adultos, transtornos de humor e psicoeducação responsável. Participa do comitê de checagem clínica da Mental Saúde.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    expertise: ["Depressão", "TDAH em Adultos", "Psiquiatria Clínica"]
  },
  "equipe-editorial": {
    name: "Equipe Editorial Mental Saúde",
    role: "Comitê de Conteúdo e Ciência Acessível",
    credential: "Pesquisa primária baseada em diretrizes OMS, NIMH e NICE",
    bio: "Grupo multidisciplinar de jornalistas científicos, pesquisadores e revisores clínicos dedicados a traduzir literatura científica rigorosa em guias acessíveis e acolhedores.",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=80",
    expertise: ["Ciência Acessível", "Revisão Baseada em Evidências", "Psicoeducação"]
  }
};

export default function ExpertProfilePage() {
  const [, params] = useRoute("/especialistas/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "equipe-editorial";
  const expert = EXPERTS_DATA[slug] || EXPERTS_DATA["equipe-editorial"];

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      <PublicHeader />

      <main className="mx-auto max-w-[800px] px-5 py-12 sm:px-8">
        <div className="rounded-[2.5rem] border border-[#d2e4df] bg-white p-8 sm:p-12 shadow-[0_24px_55px_-30px_rgba(11,70,62,.2)]">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-8">
            <img src={expert.avatar} alt={expert.name} className="h-32 w-32 rounded-3xl object-cover shadow-md border-2 border-[#bde0d6]" />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5f4ef] px-3.5 py-1 text-xs font-bold text-[#0a7066]">
                <ShieldCheck className="h-4 w-4" /> Especialista Verificado
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold text-[#173e39] sm:text-4xl">{expert.name}</h1>
              <p className="mt-1 font-semibold text-[#0a7066]">{expert.role}</p>
              <p className="mt-1 text-xs font-medium text-[#68857e]">{expert.credential}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-[#dcebe6] pt-8">
            <h2 className="font-display text-xl font-semibold text-[#173e39]">Sobre a atuação</h2>
            <p className="mt-3 text-base leading-7 text-[#4b6d65]">{expert.bio}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-sm font-bold uppercase tracking-[.12em] text-[#0a7066]">Áreas de especialidade</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {expert.expertise.map((item, idx) => (
                <span key={idx} className="rounded-xl border border-[#d2e4df] bg-[#f4faf8] px-3 py-1.5 text-xs font-semibold text-[#27544d]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl bg-[#f0faf7] p-6 border border-[#cdeae3] flex items-center justify-between">
            <div>
              <h4 className="font-display text-base font-semibold text-[#173e39]">Compromisso com a rigorosidade</h4>
              <p className="mt-1 text-xs text-[#58776f]">Nossos conteúdos passam por checagem clínica e baseiam-se em diretrizes internacionais.</p>
            </div>
            <Button onClick={() => setLocation("/metodologia")} className="rounded-xl bg-[#0a615a] text-xs font-bold text-white hover:bg-[#074d47]">
              Nossa Metodologia
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
