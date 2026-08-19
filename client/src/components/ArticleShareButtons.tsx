import { Check, Copy, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { useMemo, useState } from "react";

type ArticleShareButtonsProps = {
  title: string;
};

export function ArticleShareButtons({ title }: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData = useMemo(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${title} — Mental Saúde`;
    return {
      url,
      text,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}: ${url}`)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
  }, [title]);

  const copyLink = async () => {
    if (!shareData.url) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
      } else {
        const helper = document.createElement("textarea");
        helper.value = shareData.url;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    if (!navigator.share || !shareData.url) return;
    try {
      await navigator.share({ title, text: shareData.text, url: shareData.url });
    } catch {
      // Cancelamento pelo usuário não deve produzir erro visível nem telemetria.
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2" aria-label="Compartilhar artigo">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5f7d75]">
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
        Compartilhar
      </span>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-[#bde0d6] bg-white px-2.5 py-1 text-xs font-semibold text-[#0a7066] transition-colors hover:bg-[#e4f4ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7066]"
        aria-label={copied ? "Link copiado" : "Copiar link do artigo"}
      >
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {copied ? "Copiado!" : "Copiar link"}
      </button>
      <a
        href={shareData.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-[#bde0d6] bg-[#e5f4ef] px-2.5 py-1 text-xs font-semibold text-[#0a7066] transition-colors hover:bg-[#d0ece3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7066]"
        aria-label="Compartilhar artigo no WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={shareData.x}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-[#bde0d6] bg-[#e5f4ef] px-2.5 py-1 text-xs font-semibold text-[#0a7066] transition-colors hover:bg-[#d0ece3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7066]"
        aria-label="Compartilhar artigo no X"
      >
        <span className="text-sm font-bold leading-none" aria-hidden="true">𝕏</span>
        X
      </a>
      <a
        href={shareData.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-[#bde0d6] bg-[#e5f4ef] px-2.5 py-1 text-xs font-semibold text-[#0a7066] transition-colors hover:bg-[#d0ece3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7066]"
        aria-label="Compartilhar artigo no LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        LinkedIn
      </a>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-[#bde0d6] bg-white px-2.5 py-1 text-xs font-semibold text-[#0a7066] transition-colors hover:bg-[#e4f4ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7066]"
          aria-label="Abrir opções de compartilhamento do dispositivo"
        >
          Mais opções
        </button>
      )}
      <span className="sr-only" aria-live="polite">{copied ? "Link do artigo copiado." : ""}</span>
    </div>
  );
}
