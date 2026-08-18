import { useAuth } from "@/_core/hooks/useAuth";
import { getOAuthLoginConfigurationError, startLogin } from "@/const";
import { mustRedirectNonAdmin } from "@/lib/accessControl";
import { LoaderCircle, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

export function beginLogin() {
  sessionStorage.setItem("mental-saude:post-login", "/dashboard");
  return startLogin();
}

export function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const loginStarted = useRef(false);
  const [oauthUnavailable, setOauthUnavailable] = useState(false);

  useEffect(() => {
    if (!loading && !user && !loginStarted.current) {
      loginStarted.current = true;
      if (!beginLogin()) setOauthUnavailable(true);
    }
  }, [loading, user]);

  useEffect(() => {
    if (!loading && user && mustRedirectNonAdmin(adminOnly, user.role)) {
      setLocation("/dashboard");
    }
  }, [adminOnly, loading, setLocation, user]);

  if (oauthUnavailable) {
    const message = getOAuthLoginConfigurationError({
      oauthPortalUrl: import.meta.env.VITE_OAUTH_PORTAL_URL,
      appId: import.meta.env.VITE_APP_ID,
    });

    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto mb-4 h-8 w-8 text-[#b85c50]" />
          <h1 className="font-serif text-2xl text-[#123f3b]">Acesso temporariamente indisponível</h1>
          <p className="mt-3 text-sm leading-6 text-[#506461]">
            {message ?? "Não foi possível iniciar a sessão neste ambiente de revisão."}
          </p>
          <p className="mt-3 text-xs leading-5 text-[#6d7d7a]">Nenhuma informação pessoal ou resultado foi enviado.</p>
        </div>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-6">
        <div className="text-center">
          <LoaderCircle className="mx-auto mb-4 h-8 w-8 animate-spin text-[#0d6760]" />
          <p className="font-medium text-[#123f3b]">Preparando seu espaço de cuidado…</p>
        </div>
      </div>
    );
  }

  if (mustRedirectNonAdmin(adminOnly, user.role)) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f6ef] px-6">
        <div className="max-w-sm text-center">
          <ShieldAlert className="mx-auto mb-4 h-8 w-8 text-[#b85c50]" />
          <p className="font-medium text-[#123f3b]">Essa área é exclusiva para administradores.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
