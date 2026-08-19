import { useState } from "react";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export function EditorialImage({ src, alt, className }: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative isolate overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(130,214,202,.75),transparent_30%),linear-gradient(135deg,#e6f3ee_0%,#cfe7df_48%,#a8d6c9_100%)]",
          className,
        )}
      >
        <span aria-hidden="true" className="absolute -left-10 -top-12 h-36 w-36 rounded-full border-[22px] border-[#78bdae]/60" />
        <span aria-hidden="true" className="absolute -bottom-14 -right-12 h-44 w-44 rounded-full bg-[#f8f4ec]/70" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b584f]/15 to-transparent" />
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" decoding="async" />;
}
