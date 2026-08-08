import { useState, useCallback, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { storage } from "@/utils/storage";
import { toast } from "@/utils/toast";
import type { CurrentUser } from "@/types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(() => storage.getUser<CurrentUser>());
  const [token, setToken] = useState<string | null>(() => storage.getToken());
  const isLoading = false;

  const login = useCallback((newToken: string, newUser: CurrentUser, rememberMe: boolean = false) => {
    storage.setToken(newToken, rememberMe);
    storage.setUser(newUser, rememberMe);
    setToken(newToken);
    setUser(newUser);
    
    const getDisplayName = (email: string) => {
      const namePart = email.split("@")[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    };
    
    toast.success(`Welcome back, ${getDisplayName(newUser.email)}!`);
  }, []);

  const logout = useCallback(() => {
    storage.clearAll();
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully.");
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      storage.clearAll();
      setToken(null);
      setUser(null);
      toast.error("Your session has expired. Please log in again.");
      navigate("/login?expired=true");
    };

    window.addEventListener("session:expired", handleSessionExpired);
    return () => {
      window.removeEventListener("session:expired", handleSessionExpired);
    };
  }, [navigate]);

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
