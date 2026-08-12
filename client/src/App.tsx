import { useAuth } from "@/_core/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import AccessibilityControls from "./components/AccessibilityControls";
import { TooltipProvider } from "./components/ui/tooltip";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AssessmentFlow from "./pages/AssessmentFlow";
import EditorialHub from "./pages/EditorialHub";
import MethodologyPage from "./pages/MethodologyPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTests from "./pages/AdminTests";
import AdminUsers from "./pages/AdminUsers";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TestCatalog from "./pages/TestCatalog";
import UserDashboard from "./pages/UserDashboard";
import LegalPage from "./pages/LegalPage";
import ArticlePage from "./pages/ArticlePage";
import ExpertProfilePage from "./pages/ExpertProfilePage";

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
  return <Switch><Route path="/" component={Home} /><Route path="/conteudos" component={EditorialHub} /><Route path="/conteudos/:slug" component={ArticlePage} /><Route path="/especialistas/:slug" component={ExpertProfilePage} /><Route path="/metodologia" component={MethodologyPage} /><Route path="/testes" component={TestCatalog} /><Route path="/termos">{() => <LegalPage kind="terms" />}</Route><Route path="/privacidade">{() => <LegalPage kind="privacy" />}</Route><Route path="/avaliacao/:id">{params => <AssessmentFlow id={params.id} />}</Route><Route path="/dashboard" component={UserDashboard} /><Route path="/perfil" component={Profile} /><Route path="/admin" component={AdminDashboard} /><Route path="/admin/testes" component={AdminTests} /><Route path="/admin/usuarios" component={AdminUsers} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><AccessibilityProvider><TooltipProvider><LoginRedirect /><Toaster /><AccessibilityControls /><Router /></TooltipProvider></AccessibilityProvider></ThemeProvider></ErrorBoundary>;
}
