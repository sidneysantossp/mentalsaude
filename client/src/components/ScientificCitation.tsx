import { useState, useRef, useEffect } from "react";
import { ScientificReference } from "@/data/articlesDatabase";
import { BookOpen } from "lucide-react";

type ScientificCitationProps = {
  refId: string;
  references: ScientificReference[];
  displayText?: string;
};

export function ScientificCitation({ refId, references, displayText }: ScientificCitationProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reference = references.find(r => r.id === refId) || references[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!reference) {
    return <span className="text-xs font-semibold text-[#0a7066]">({refId})</span>;
  }

  return (
    <span className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="ml-1 inline-flex items-center gap-0.5 rounded bg-[#e5f4ef] px-1.5 py-0.5 text-xs font-bold text-[#0a7066] transition-colors hover:bg-[#d0eae2]"
        title="Ver citação científica"
      >
        <span>{displayText || reference.shortLabel}</span>
      </button>

      {open && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-2xl border border-[#cbe4dd] bg-white p-4 shadow-xl text-xs text-[#2b4c46]">
          <span className="flex items-center gap-1.5 font-bold text-[#0a7066]">
            <BookOpen className="h-3.5 w-3.5" /> Referência Científica
          </span>
          <span className="mt-2 block leading-relaxed text-[#4a6b63]">{reference.fullCitation}</span>
          {reference.sourceUrl && (
            <a
              href={reference.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-semibold text-[#0a7066] hover:underline"
            >
              Acessar fonte original →
            </a>
          )}
        </span>
      )}
    </span>
  );
}
