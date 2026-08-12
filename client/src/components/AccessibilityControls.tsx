import { Accessibility, Contrast, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export default function AccessibilityControls() {
  const [open, setOpen] = useState(false);
  const { contrast, fontScale, setContrast, setFontScale, reset } = useAccessibility();

  return (
    <div className="accessibility-widget fixed right-4 top-20 z-50 sm:right-6">
      <Button
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        onClick={() => setOpen(current => !current)}
        className="accessibility-trigger h-10 gap-2 rounded-full border-[#9bcac0] bg-[#fffefa] px-4 text-xs font-bold text-[#0a615a] shadow-[0_14px_28px_-22px_rgba(11,70,62,.8)] hover:bg-[#eef8f5]"
      >
        {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Accessibility className="h-4 w-4" aria-hidden="true" />}
        <span className="hidden sm:inline">Acessibilidade</span>
        <span className="sr-only">{open ? "Fechar controles de acessibilidade" : "Abrir controles de acessibilidade"}</span>
      </Button>

      {open && (
        <div
          id="accessibility-panel"
          role="dialog"
          aria-label="Controles de acessibilidade"
          className="accessibility-panel mt-2 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-[#cfe4de] bg-[#fffefa] p-4 text-[#173e39] shadow-[0_22px_45px_-22px_rgba(11,70,62,.5)]"
        >
          <div className="flex items-start gap-3 border-b border-[#e5eeeb] pb-3">
            <Accessibility className="mt-0.5 h-5 w-5 shrink-0 text-[#0b7167]" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold">Leitura facilitada</p>
              <p className="mt-1 text-xs leading-5 text-[#66837c]">As preferências ficam salvas neste dispositivo.</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#6c938b]">Tamanho da fonte</p>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Tamanho da fonte">
              <Button type="button" variant="outline" aria-label="Diminuir tamanho da fonte" aria-pressed={fontScale === "small"} onClick={() => setFontScale("small")} className="h-10 rounded-xl border-[#cfe4de] bg-white text-sm font-semibold text-[#315a53] hover:bg-[#eef8f5]">
                <Minus className="mr-1 h-3.5 w-3.5" aria-hidden="true" />A−
              </Button>
              <Button type="button" variant="outline" aria-label="Usar tamanho de fonte padrão" aria-pressed={fontScale === "default"} onClick={() => setFontScale("default")} className="h-10 rounded-xl border-[#cfe4de] bg-white text-base font-semibold text-[#315a53] hover:bg-[#eef8f5]">
                A
              </Button>
              <Button type="button" variant="outline" aria-label="Aumentar tamanho da fonte" aria-pressed={fontScale === "large"} onClick={() => setFontScale("large")} className="h-10 rounded-xl border-[#cfe4de] bg-white text-lg font-semibold text-[#315a53] hover:bg-[#eef8f5]">
                <Plus className="mr-1 h-3.5 w-3.5" aria-hidden="true" />A+
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#6c938b]">Contraste</p>
            <Button type="button" variant="outline" aria-pressed={contrast === "high"} onClick={() => setContrast(contrast === "high" ? "normal" : "high")} className={`mt-2 h-10 w-full justify-start rounded-xl border-[#cfe4de] bg-white text-sm font-semibold text-[#315a53] hover:bg-[#eef8f5] ${contrast === "high" ? "ring-2 ring-[#0b7167] ring-offset-1" : ""}`}>
              <Contrast className="mr-2 h-4 w-4" aria-hidden="true" />
              {contrast === "high" ? "Desativar alto contraste" : "Ativar alto contraste"}
            </Button>
          </div>

          <Button type="button" variant="ghost" onClick={reset} className="mt-3 h-9 w-full justify-center gap-2 text-xs font-semibold text-[#5b7972] hover:bg-[#eef8f5] hover:text-[#123f3b]">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Restaurar padrão
          </Button>
        </div>
      )}
    </div>
  );
}
