import { useAuth } from "@/_core/hooks/useAuth";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpenCheck,
  ChevronLeft,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

type Area = "user" | "admin";

const userNavigation = [
  { path: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { path: "/testes", label: "Meus testes", icon: ClipboardList },
  { path: "/perfil", label: "Perfil e preferências", icon: Settings2 },
];

const adminNavigation = [
  { path: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { path: "/admin/testes", label: "Gerenciar testes", icon: BookOpenCheck },
  { path: "/admin/usuarios", label: "Usuários", icon: UsersRound },
  { path: "/dashboard", label: "Área do usuário", icon: ChevronLeft },
];

export default function DashboardLayout({ children, area = "user" }: { children: React.ReactNode; area?: Area }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigation = area === "admin" ? adminNavigation : userNavigation;
  const areaLabel = area === "admin" ? "Administração" : "Meu espaço";

  return (
    <div className="min-h-screen bg-[#f7f6ef] text-[#153a36]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-[#dbe9e4] bg-[#fcfcf8] p-5 transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-9 flex items-center justify-between">
          <Brand />
          <button className="rounded-lg p-2 text-[#557a73] lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-3 px-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#6c938b]">{areaLabel}</p>
        <nav className="space-y-1" aria-label={`Navegação ${areaLabel.toLowerCase()}`}>
          {navigation.map(item => {
            const active = location === item.path || (item.path !== "/dashboard" && location.startsWith(`${item.path}/`));
            return (
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  active ? "bg-[#d9f1ec] text-[#075e57]" : "text-[#52736e] hover:bg-[#eef6f2] hover:text-[#123f3b]",
                )}
                key={item.path}
                onClick={() => {
                  setLocation(item.path);
                  setMobileOpen(false);
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#123f3b] p-4 text-[#ecf7f2]">
          <ShieldCheck className="mb-3 h-5 w-5 text-[#82d6ca]" />
          <p className="text-sm font-semibold">Um espaço privado</p>
          <p className="mt-1 text-xs leading-relaxed text-[#c5e3dc]">Seus registros pertencem a você e podem ser consultados quando quiser.</p>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-[#e1ede9] pt-5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d9f1ec] text-sm font-bold text-[#0d6760]">
            {user?.name?.slice(0, 1).toUpperCase() ?? "M"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#173c37]">{user?.name ?? "Sua conta"}</p>
            <p className="truncate text-xs text-[#66867f]">{user?.email ?? ""}</p>
          </div>
          <button className="rounded-md p-1.5 text-[#66867f] hover:bg-[#eef6f2] hover:text-[#123f3b]" onClick={() => logout()} aria-label="Sair">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>
      {mobileOpen && <button aria-label="Fechar menu" className="fixed inset-0 z-40 bg-[#123f3b]/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <main className="min-h-screen lg:pl-[17rem]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#e1ede9] bg-[#f7f6ef]/90 px-5 backdrop-blur lg:px-9">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-[#123f3b] hover:bg-[#e6f2ee] lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-[#53736d]">{areaLabel}</span>
          </div>
          {area === "admin" && <span className="hidden items-center gap-2 rounded-full bg-[#fff0e9] px-3 py-1.5 text-xs font-semibold text-[#a84b3b] sm:flex"><BarChart3 className="h-3.5 w-3.5" />Métricas da plataforma</span>}
        </header>
        <div className="mx-auto max-w-[1500px] p-5 sm:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
