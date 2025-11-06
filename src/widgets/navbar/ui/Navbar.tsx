import { Button } from "@/shared/ui";
import { useAuth } from "@/app/providers";
import { useNavigate } from "react-router-dom";
import { LogIn, User } from "lucide-react";
import { UNIVERSITY_CONFIG } from "@/shared/config";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const { branding, shortName, logo } = UNIVERSITY_CONFIG;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt={shortName}
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-semibold text-lg">{shortName}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <User className="size-4" />
                {user.name}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => navigate("/login")}
                className="gap-2"
                style={{
                  backgroundColor: branding.primaryColor,
                  color: 'white'
                }}
              >
                <LogIn className="size-4" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
