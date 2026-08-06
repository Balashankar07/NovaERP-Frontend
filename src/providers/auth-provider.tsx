import { useState, useCallback, useEffect, type ReactNode } from "react";
import { AuthContext } from "@/context/auth-context";
import { storage } from "@/utils/storage";
import { toast } from "@/utils/toast";
import type { CurrentUser } from "@/types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(() => storage.getUser<CurrentUser>());
  const [token, setToken] = useState<string | null>(() => storage.getToken());
  // Set isLoading to false initially since we load state synchronously
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((newToken: string, newUser: CurrentUser, rememberMe: boolean = false) => {
    storage.setToken(newToken, rememberMe);
    storage.setUser(newUser, rememberMe);
    setToken(newToken);
    setUser(newUser);
    toast.success(`Welcome back, ${newUser.firstName}!`);
  }, []);

  const logout = useCallback(() => {
    storage.clearAll();
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully.");
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
