import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="saas-theme">
        {children}
        <Toaster position="top-right" richColors expand={false} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export { useTheme } from "./ThemeProvider";
export { useAuth } from "./AuthProvider";
