import { useAuth } from "@/_core/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import AssessmentFlow from "./pages/AssessmentFlow";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTests from "./pages/AdminTests";
import AdminUsers from "./pages/AdminUsers";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TestCatalog from "./pages/TestCatalog";
import UserDashboard from "./pages/UserDashboard";

function LoginRedirect() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  useEffect(() => {
    const destination = sessionStorage.getItem("mental-saude:post-login");
    if (!loading && user && destination) {
      sessionStorage.removeItem("mental-saude:post-login");
      setLocation(destination);
    }
  }, [loading, setLocation, user]);
  return null;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/testes" component={TestCatalog} /><Route path="/avaliacao/:id">{params => <AssessmentFlow id={params.id} />}</Route><Route path="/dashboard" component={UserDashboard} /><Route path="/perfil" component={Profile} /><Route path="/admin" component={AdminDashboard} /><Route path="/admin/testes" component={AdminTests} /><Route path="/admin/usuarios" component={AdminUsers} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><LoginRedirect /><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
