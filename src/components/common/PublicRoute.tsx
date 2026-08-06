import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/routes";

/**
 * Protects routes that should only be accessible to UNauthenticated users (e.g. Login).
 * If the user IS authenticated, redirects them to the dashboard.
 */
export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    // Send them to the page they came from, or dashboard if no state
    const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
