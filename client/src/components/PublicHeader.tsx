import { useAuth } from "@/_core/hooks/useAuth";
import { Brand } from "@/components/Brand";
import { beginLogin } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

type PublicHeaderProps = {
  className?: string;
};

export const PUBLIC_NAV_ITEMS = [
  { key: "how-it-works", label: "Como funciona" },
  { key: "tests", label: "Testes", href: "/testes" },
  { key: "content", label: "Conteúdos", href: "/conteudos" },
  { key: "privacy", label: "Privacidade", href: "/privacidade" },
] as const;

type PublicNavKey = (typeof PUBLIC_NAV_ITEMS)[number]["key"];

export function getPublicNavHref(key: PublicNavKey, isHome: boolean) {
  if (key === "how-it-works") return isHome ? "#como-funciona" : "/#como-funciona";
  if (key === "privacy") return isHome ? "#seguranca" : "/privacidade";
  const item = PUBLIC_NAV_ITEMS.find(candidate => candidate.key === key);
  return item && "href" in item ? item.href : "/";
}

export function isPublicNavActive(key: PublicNavKey, location: string) {
  if (key === "tests") return location === "/testes" || location.startsWith("/testes/");
  if (key === "content") return location === "/conteudos" || location.startsWith("/conteudos/");
  if (key === "privacy") return location === "/privacidade";
  return location === "/";
}

const desktopLinkClass = "transition-colors hover:text-[#08736a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f6ef]";

export default function PublicHeader({ className }: PublicHeaderProps) {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location === "/";
  const closeMenu = () => setMenuOpen(false);
  const handleAccess = () => {
    closeMenu();
    if (user) {
      setLocation("/dashboard");
      return;
    }
    beginLogin();
  };

  const linkClass = (active = false) => cn(
    desktopLinkClass,
    active ? "font-bold text-[#08736a]" : "font-semibold text-[#375c56]",
  );

  return (
    <header className={cn("sticky top-0 z-40 border-b border-[#e2ede8]/80 bg-[#f7f6ef]/95 backdrop-blur-md", className)}>
      <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Ir para a página inicial" onClick={closeMenu} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f6ef]">
          <Brand />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm md:flex">
          {PUBLIC_NAV_ITEMS.map(item => (
            <Link
              key={item.key}
              href={getPublicNavHref(item.key, isHome)}
              className={linkClass(isPublicNavActive(item.key, location))}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button onClick={handleAccess} className="rounded-xl bg-[#0a615a] px-5 text-white shadow-sm hover:bg-[#074d47]">
            {user ? "Meu painel" : "Entrar"}
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-[#123f3b] transition-colors hover:bg-[#e6f2ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f6ef] md:hidden"
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-controls="public-mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>

        {menuOpen && (
          <nav id="public-mobile-menu" aria-label="Navegação principal mobile" className="absolute right-5 top-[4.5rem] flex w-[min(18rem,calc(100vw-2.5rem))] flex-col rounded-2xl border border-[#dbe9e4] bg-[#fcfcf8] p-3 shadow-xl md:hidden">
            {PUBLIC_NAV_ITEMS.map(item => (
              <Link
                key={item.key}
                href={getPublicNavHref(item.key, isHome)}
                onClick={closeMenu}
                className={cn("rounded-lg px-3 py-2 text-sm", linkClass(isPublicNavActive(item.key, location)))}
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={handleAccess} className="mt-1 rounded-lg bg-[#0a615a] text-white hover:bg-[#074d47]">
              {user ? "Meu painel" : "Entrar"}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
