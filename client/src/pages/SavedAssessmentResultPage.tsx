import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, ArrowLeft, LoaderCircle } from "lucide-react";
import { useLocation } from "wouter";
import { ResultScreen } from "./AssessmentFlow";

export default function SavedAssessmentResultPage({ attemptId }: { attemptId: string }) {
  return (
    <ProtectedRoute>
      <SavedAssessmentResultContent attemptId={Number(attemptId)} />
    </ProtectedRoute>
  );
}

function SavedAssessmentResultContent({ attemptId }: { attemptId: number }) {
  const [, setLocation] = useLocation();
  const result = trpc.user.attemptResult.useQuery(
    { attemptId },
    { enabled: Number.isInteger(attemptId) && attemptId > 0 },
  );

  if (!Number.isInteger(attemptId) || attemptId <= 0) {
    return <SavedResultState title="Resultado inválido" body="Não foi possível identificar a avaliação solicitada." onBack={() => setLocation("/meus-testes")} />;
  }

  if (result.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-5 text-[#153a36]">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[#0b7167]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#45665f]">Abrindo sua devolutiva…</p>
        </div>
      </div>
    );
  }

  if (result.error || !result.data) {
    return (
      <SavedResultState
        title="Não foi possível abrir este resultado"
        body={result.error?.message ?? "O resultado pode não existir, não estar concluído ou não pertencer a esta conta."}
        onBack={() => setLocation("/meus-testes")}
      />
    );
  }

  return <ResultScreen result={{ ...result.data.result, savedToPanel: true }} title={result.data.attempt.title} onFinish={() => setLocation("/meus-testes")} />;
}

function SavedResultState({ title, body, onBack }: { title: string; body: string; onBack: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-5 text-[#153a36]">
      <main className="w-full max-w-md rounded-3xl border border-[#dceae5] bg-[#fffefa] p-8 text-center shadow-[0_26px_55px_-46px_rgba(11,70,62,.8)]">
        <AlertTriangle className="mx-auto h-8 w-8 text-[#b75a48]" aria-hidden="true" />
        <h1 className="mt-5 font-display text-3xl font-semibold text-[#173e39]">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-[#66827b]">{body}</p>
        <Button onClick={onBack} className="mt-7 rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Voltar aos meus testes
        </Button>
      </main>
    </div>
  );
}
