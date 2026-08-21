import { Brand } from "@/components/Brand";
import { beginLogin } from "@/components/ProtectedRoute";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const menuWasMountedRef = useRef(false);

  const isHome = location === "/";

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setMenuMounted(true);
    setMenuOpen(true);
    window.requestAnimationFrame(() => setMenuVisible(true));
  };

  const closeMenu = () => {
    clearCloseTimer();
    setMenuOpen(false);
    setMenuVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setMenuMounted(false);
      closeTimerRef.current = null;
    }, 220);
  };

  useEffect(() => {
    if (menuMounted) {
      menuWasMountedRef.current = true;
      window.requestAnimationFrame(() => closeButtonRef.current?.focus());
      return;
    }
    if (menuWasMountedRef.current) {
      menuWasMountedRef.current = false;
      menuTriggerRef.current?.focus();
    }
  }, [menuMounted]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const reducedMotionPreview = import.meta.env.DEV && new URLSearchParams(window.location.search).get("reduced_motion") === "1";
    document.documentElement.dataset.reducedMotionPreview = reducedMotionPreview ? "true" : "false";
    return () => {
      delete document.documentElement.dataset.reducedMotionPreview;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => () => clearCloseTimer(), []);

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
          ref={menuTriggerRef}
          type="button"
          className="rounded-xl border border-[#d8e9e3] bg-[#fcfcf8] p-2.5 text-[#123f3b] shadow-sm transition-colors hover:bg-[#e6f2ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f6ef] md:hidden"
          onClick={menuOpen ? closeMenu : openMenu}
          aria-expanded={menuOpen}
          aria-controls="public-mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {menuMounted && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            data-public-mobile-menu-overlay
            className={cn("fixed inset-0 z-[55] bg-[#123f3b]/35 backdrop-blur-[2px] transition-opacity duration-200 md:hidden", menuVisible ? "opacity-100" : "pointer-events-none opacity-0")}
            onClick={closeMenu}
          />
          <aside
            id="public-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="public-mobile-menu-title"
            data-public-mobile-menu-panel
            className={cn("fixed inset-y-0 left-0 z-[60] flex w-[min(22rem,calc(100vw-3.5rem))] flex-col border-r border-[#dbe9e4] bg-[#fcfcf8] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 shadow-[18px_0_45px_rgba(18,63,59,0.16)] transition-transform duration-200 ease-out md:hidden", menuVisible ? "translate-x-0" : "-translate-x-full")}
          >
            <div className="flex items-center justify-between border-b border-[#e1ede9] pb-5">
              <div>
                <p id="public-mobile-menu-title" className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c938b]">Navegação</p>
                <p className="mt-1 text-sm font-semibold text-[#123f3b]">Mental Saúde</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="rounded-xl p-2.5 text-[#557a73] transition-colors hover:bg-[#e6f2ee] hover:text-[#123f3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066]"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navegação principal mobile" className="mt-6 space-y-2">
              {PUBLIC_NAV_ITEMS.map(item => {
                const active = isPublicNavActive(item.key, location);
                return (
                  <Link
                    key={item.key}
                    href={getPublicNavHref(item.key, isHome)}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn("flex min-h-12 items-center rounded-2xl px-4 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066]", active ? "bg-[#d9f1ec] font-bold text-[#075e57]" : "font-semibold text-[#375c56] hover:bg-[#eef6f2]")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-2xl bg-[#123f3b] p-4 text-[#ecf7f2]">
              <p className="text-sm font-semibold">Um cuidado no seu ritmo</p>
              <p className="mt-1 text-xs leading-relaxed text-[#c5e3dc]">Acesse seus testes, conteúdos e preferências com privacidade.</p>
              <Button onClick={handleAccess} className="mt-4 w-full rounded-xl bg-[#82d6ca] text-[#123f3b] hover:bg-[#a1e3da]">
                {user ? "Ir para meu painel" : "Entrar ou criar conta"}
              </Button>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
