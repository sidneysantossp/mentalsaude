import { BookOpenText, ClipboardCheck, Home, LayoutDashboard, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { beginLogin } from "@/components/ProtectedRoute";
import { useAuth } from "@/_core/hooks/useAuth";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  href: string;
  label: string;
  icon: typeof Home;
};

const publicItems: MobileNavItem[] = [
  { href: "/", label: "Início", icon: Home },
  { href: "/testes", label: "Testes", icon: ClipboardCheck },
  { href: "/conteudos", label: "Conteúdos", icon: BookOpenText },
];

const userItems: MobileNavItem[] = [
  { href: "/dashboard", label: "Início", icon: LayoutDashboard },
  { href: "/meus-testes", label: "Meus testes", icon: ClipboardCheck },
  { href: "/conteudos", label: "Conteúdos", icon: BookOpenText },
  { href: "/perfil", label: "Perfil", icon: UserRound },
];

const adminItems: MobileNavItem[] = [
  { href: "/admin", label: "Início", icon: LayoutDashboard },
  { href: "/admin/testes", label: "Testes", icon: ClipboardCheck },
  { href: "/admin/usuarios", label: "Usuários", icon: UsersRound },
  { href: "/admin/content-authority", label: "Conteúdo", icon: ShieldCheck },
];

function isRouteActive(location: string, href: string) {
  if (href === "/" || href === "/dashboard" || href === "/admin") return location === href;
  return location === href || location.startsWith(`${href}/`);
}

function isAssessmentFlow(location: string) {
  return location.startsWith("/avaliacao/");
}

function isDashboardArea(location: string) {
  return location === "/dashboard" || location.startsWith("/meus-testes") || location.startsWith("/perfil");
}

function isAdminArea(location: string) {
  return location === "/admin" || location.startsWith("/admin/");
}

export default function MobileBottomNav() {
  const [location] = useLocation();
  const { user } = useAuth();
  const hidden = isAssessmentFlow(location);
  const area = isAdminArea(location) ? "admin" : isDashboardArea(location) ? "user" : "public";
  const items = area === "admin" ? adminItems : area === "user" ? userItems : publicItems;
  const showAccessAction = area === "public";

  useEffect(() => {
    const forceMobilePreview = import.meta.env.DEV && new URLSearchParams(window.location.search).get("mobile_preview") === "1";
    document.body.dataset.mobileBottomNav = hidden ? "false" : "true";
    document.documentElement.dataset.mobilePreview = forceMobilePreview ? "true" : "false";
    return () => {
      delete document.body.dataset.mobileBottomNav;
      delete document.documentElement.dataset.mobilePreview;
    };
  }, [hidden]);

  if (hidden) return null;

  const accessHref = user ? "/dashboard" : undefined;
  const accessLabel = user ? "Painel" : "Entrar";

  return (
    <nav
      aria-label="Navegação mobile"
      data-mobile-bottom-nav
      data-mobile-preview-nav
      className="fixed inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-[1.75rem] border border-b-0 border-[#dcebe6]/90 bg-[#fcfcf8]/78 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_32px_rgba(20,75,67,0.14)] backdrop-blur-2xl md:hidden"
    >
      <div className={cn("mx-auto grid min-h-[4.35rem] max-w-lg items-stretch px-2", showAccessAction ? "grid-cols-4" : "grid-cols-4")}>
        {items.map(item => {
          const active = isRouteActive(location, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[0.68rem] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-inset",
                active ? "text-[#08736a]" : "text-[#6c8983] hover:text-[#0a615a]",
              )}
            >
              <span className={cn("absolute top-1 h-1 w-8 rounded-full transition-opacity", active ? "bg-[#58b8a8] opacity-100" : "opacity-0")} aria-hidden="true" />
              <span className={cn("grid h-7 w-10 place-items-center rounded-xl transition-colors", active ? "bg-[#d9f1ec]" : "group-hover:bg-[#eef6f2]")}>
                <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={active ? 2.4 : 2} aria-hidden="true" />
              </span>
              <span className="max-w-full truncate leading-none">{item.label}</span>
            </Link>
          );
        })}
        {showAccessAction && (
          accessHref ? (
            <Link
              href={accessHref}
              aria-current={isRouteActive(location, accessHref) ? "page" : undefined}
              className="group relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[0.68rem] font-semibold text-[#6c8983] transition-colors hover:text-[#0a615a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-inset"
            >
              <span className={cn("grid h-7 w-10 place-items-center rounded-xl transition-colors", isRouteActive(location, accessHref) ? "bg-[#d9f1ec] text-[#08736a]" : "group-hover:bg-[#eef6f2]")}>
                <UserRound className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="max-w-full truncate leading-none">{accessLabel}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => beginLogin()}
              className="group flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[0.68rem] font-semibold text-[#6c8983] transition-colors hover:text-[#0a615a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7066] focus-visible:ring-inset"
            >
              <span className="grid h-7 w-10 place-items-center rounded-xl transition-colors group-hover:bg-[#eef6f2]">
                <UserRound className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="max-w-full truncate leading-none">{accessLabel}</span>
            </button>
          )
        )}
      </div>
    </nav>
  );
}

export { isRouteActive, isAssessmentFlow };
