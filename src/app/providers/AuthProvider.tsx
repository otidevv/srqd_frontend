import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, LoginCredentials } from "@/entities/user";
import { authApi } from "@/shared/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth_user";
const TOKEN_STORAGE_KEY = "auth_token";

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

/**
 * Login function - calls backend API
 */
async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await authApi.login(credentials);
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message || "Error al conectar con el servidor",
    };
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        // Token is automatically restored by apiClient interceptor
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await loginUser(credentials);

      if (response.success && response.user && response.token) {
        // Token is already set in authApi.login, user is already saved
        setUser(response.user);
        return { success: true };
      }

      return {
        success: false,
        error: response.error || "Error al iniciar sesión",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authApi.logout();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth hook
 * Access authentication state and methods
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
