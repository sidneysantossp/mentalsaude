import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { CalendarDays, Mail, Search, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminUsers() {
  return <ProtectedRoute adminOnly><AdminUsersContent /></ProtectedRoute>;
}

function AdminUsersContent() {
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const users = trpc.admin.users.useQuery({ search: search || undefined });
  const detail = trpc.admin.user.useQuery({ id: selectedId ?? 0 }, { enabled: selectedId !== null });
  const setRole = trpc.admin.setUserRole.useMutation({
    onSuccess: () => {
      utils.admin.users.invalidate();
      utils.admin.user.invalidate();
      toast.success("Papel de acesso atualizado.");
    },
    onError: issue => toast.error(issue.message),
  });
  const selected = users.data?.find(user => user.id === selectedId);

  return (
    <DashboardLayout area="admin">
      <div className="page-enter">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#d46c58]">Acesso e perfis</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-.045em] text-[#123f3b]">Usuários</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66837c]">Pesquise contas, consulte informações do perfil e atribua o papel administrativo quando necessário.</p>
        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_.38fr]">
          <section className="overflow-hidden rounded-3xl border border-[#dce9e4] bg-[#fffefa]">
            <div className="border-b border-[#e4eeea] p-5 sm:p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c8982]" />
                <Input value={search} onChange={event => setSearch(event.target.value)} className="h-11 border-[#cfe2dc] bg-white pl-10" placeholder="Buscar por nome ou e-mail" />
              </div>
            </div>
            {users.isLoading ? <div className="p-6"><div className="h-28 animate-pulse rounded-2xl bg-[#eef6f2]" /></div> : users.data?.length ? (
              <div className="divide-y divide-[#e5eeeb]">
                {users.data.map(user => (
                  <article key={user.id} className={`flex cursor-pointer flex-col gap-3 px-5 py-4 transition-colors sm:px-6 lg:flex-row lg:items-center ${selectedId === user.id ? "bg-[#eff8f4]" : "hover:bg-[#f7fbf9]"}`} onClick={() => setSelectedId(user.id)}>
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dff1eb] text-sm font-bold text-[#0a7066]">{user.name?.slice(0, 1).toUpperCase() ?? "M"}</div>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#254b44]">{user.name ?? "Sem nome informado"}</p><p className="truncate text-xs text-[#728e87]">{user.email ?? "Sem e-mail informado"}</p></div>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${user.role === "admin" ? "bg-[#e6eefc] text-[#375d9c]" : "bg-[#e8f5ef] text-[#087068]"}`}>{user.role === "admin" ? "Administrador" : "Usuário"}</span>
                  </article>
                ))}
              </div>
            ) : <EmptyUsers />}
          </section>
          <aside className="h-fit rounded-3xl border border-[#dce9e4] bg-[#fffefa] p-6">
            {selected ? <UserDetail selected={selected} detail={detail.data ?? undefined} loading={detail.isLoading} updating={setRole.isPending} onToggleRole={() => setRole.mutate({ userId: selected.id, role: selected.role === "admin" ? "user" : "admin" })} /> : <div className="py-8 text-center"><UserRound className="mx-auto h-7 w-7 text-[#5db5a8]" /><p className="mt-3 text-sm font-semibold text-[#385c55]">Selecione uma pessoa</p><p className="mt-1 text-xs leading-5 text-[#75918a]">Os dados básicos, preferências e controles de acesso aparecerão aqui.</p></div>}
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function UserDetail({ selected, detail, loading, updating, onToggleRole }: { selected: { id: number; name: string | null; email: string | null; role: "user" | "admin"; createdAt: Date }; detail: { totalAttempts: number; profile: { displayName: string | null; birthYear: number | null; pronouns: string | null; notificationEmail: boolean; notificationCheckIn: boolean } | null } | undefined; loading: boolean; updating: boolean; onToggleRole: () => void }) {
  return <><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e0f1eb] text-[#0a7066]"><UserRound className="h-6 w-6" /></div><h2 className="mt-5 font-display text-2xl font-semibold text-[#173e39]">{selected.name ?? "Sem nome informado"}</h2>{loading ? <div className="mt-5 h-36 animate-pulse rounded-2xl bg-[#eef6f2]" /> : <><div className="mt-5 space-y-3 text-sm text-[#627f78]"><p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#5aae9f]" />{selected.email ?? "E-mail não informado"}</p><p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#5aae9f]" />Conta criada em {new Date(selected.createdAt).toLocaleDateString("pt-BR")}</p><p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#5aae9f]" />Papel atual: {selected.role === "admin" ? "Administrador" : "Usuário"}</p><p className="flex items-center gap-2"><UsersRound className="h-4 w-4 text-[#5aae9f]" />{detail?.totalAttempts ?? 0} autoavaliações iniciadas</p></div><div className="mt-6 rounded-2xl bg-[#f2f8f5] p-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#5b8e84]">Perfil e preferências</p><p className="mt-3 text-sm text-[#355a53]">Nome de exibição: {detail?.profile?.displayName ?? "Não informado"}</p><p className="mt-1 text-sm text-[#355a53]">Ano de nascimento: {detail?.profile?.birthYear ?? "Não informado"}</p><p className="mt-1 text-sm text-[#355a53]">Pronomes: {detail?.profile?.pronouns ?? "Não informado"}</p><p className="mt-1 text-sm text-[#355a53]">E-mail: {detail?.profile?.notificationEmail ? "Ativado" : "Desativado"}</p><p className="mt-1 text-sm text-[#355a53]">Lembretes: {detail?.profile?.notificationCheckIn ? "Ativados" : "Desativados"}</p></div></>}<Button disabled={updating} onClick={onToggleRole} className="mt-7 w-full rounded-xl bg-[#0a615a] text-white hover:bg-[#074d47]">{selected.role === "admin" ? "Remover papel administrativo" : "Promover para administrador"}</Button></>;
}

function EmptyUsers() { return <div className="p-12 text-center"><UsersRound className="mx-auto h-7 w-7 text-[#5db5a8]" /><p className="mt-3 text-sm font-semibold text-[#375b54]">Nenhuma conta encontrada.</p><p className="mt-1 text-xs text-[#75918a]">Tente ajustar os termos de busca.</p></div>; }
