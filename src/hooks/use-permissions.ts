import { CurrentUser } from "@/types";
import { ROUTES } from "@/routes";
import { useAuth } from "./use-auth";

// Centralized privileged-role mechanism
export const PRIVILEGED_ROLES = ["Super Admin", "Administrator", "System Administrator"];

export function getDefaultRouteForUser(user: CurrentUser | null): string {
  if (!user) return ROUTES.DASHBOARD;

  if (PRIVILEGED_ROLES.includes(user.role)) {
    return ROUTES.DASHBOARD;
  }
  
  if (user.permissions?.includes("Permissions.Dashboard.View")) {
    return ROUTES.DASHBOARD;
  }
  if (user.permissions?.includes("Permissions.Products.View")) {
    return ROUTES.PRODUCTS;
  }
  if (user.permissions?.includes("Permissions.Brands.View")) {
    return ROUTES.BRANDS;
  }
  if (user.permissions?.includes("Permissions.ProductCategories.View")) {
    return ROUTES.CATEGORIES;
  }
  if (user.permissions?.includes("Permissions.Units.View")) {
    return ROUTES.UNITS;
  }
  if (user.permissions?.includes("Permissions.Suppliers.View")) {
    return ROUTES.SUPPLIERS;
  }

  return ROUTES.DASHBOARD;
}

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Administrators have full bypass access
    if (PRIVILEGED_ROLES.includes(user.role)) return true;

    // IMPORTANT: Per enterprise architecture rules, the frontend MUST NOT 
    // infer permissions from business roles to avoid duplicating backend logic.
    // The backend is the single source of truth.
    //
    // If the backend JWT token (or a future endpoint) provides verified permissions,
    // we consume them here.
    if ('permissions' in user && Array.isArray((user as any).permissions)) {
      return (user as any).permissions.includes(permission);
    }

    // In the absence of a verified permissions claim from the backend, we DO NOT
    // grant UI access. This avoids the flash of unauthorized content and /403 loops.
    return false;
  };

  return { hasPermission };
}
