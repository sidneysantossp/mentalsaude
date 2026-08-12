import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-[#123f3b]", className)}>
      <svg aria-hidden="true" className="h-9 w-9 shrink-0" viewBox="0 0 44 44" fill="none">
        <path d="M21.7 36.3C12.1 35.8 7 30 7 20.8V8.2c9.9.4 15 6.3 14.7 15.3v12.8Z" fill="#123f3b" />
        <path d="M22.3 36.3C31.9 35.8 37 30 37 20.8V8.2c-9.9.4-15 6.3-14.7 15.3v12.8Z" fill="#65c5b8" />
        <path d="M22 10.4v24.5" stroke="#f7f6ef" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[1.35rem] font-semibold tracking-[-0.04em]">Mental Saúde</span>
          <span className="mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#5ab8ac]">Ciência · Cuidado · Equilíbrio</span>
        </span>
      )}
    </div>
  );
}
