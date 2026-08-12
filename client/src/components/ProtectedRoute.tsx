import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { mustRedirectNonAdmin } from "@/lib/accessControl";
import { LoaderCircle, ShieldAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function beginLogin() {
  sessionStorage.setItem("mental-saude:post-login", "/dashboard");
  startLogin();
}

export function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const loginStarted = useRef(false);

  useEffect(() => {
    if (!loading && !user && !loginStarted.current) {
      loginStarted.current = true;
      beginLogin();
    }
  }, [loading, user]);

  useEffect(() => {
    if (!loading && user && mustRedirectNonAdmin(adminOnly, user.role)) {
      setLocation("/dashboard");
    }
  }, [adminOnly, loading, setLocation, user]);

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
