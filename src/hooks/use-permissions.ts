import { useAuth } from "./use-auth";

/**
 * Frontend role-to-permission mapping.
 * In a real-world app with dynamic permissions, this array would be fetched
 * from the backend during login. For this implementation, we map roles to allowed
 * permissions, or grant all to Administrator.
 */
export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Administrators have full access
    if (user.role === "Administrator") return true;

    // Define module-specific role access (adjust based on actual business logic)
    // For Brands, Categories and Units, Procurement and Production managers might have view access
    if (permission.startsWith("Permissions.Brands.View") || permission.startsWith("Permissions.ProductCategories.View") || permission.startsWith("Permissions.Units.View")) {
      return ["Procurement Manager", "Production Manager"].includes(user.role);
    }

    return false;
  };

  return { hasPermission };
}
