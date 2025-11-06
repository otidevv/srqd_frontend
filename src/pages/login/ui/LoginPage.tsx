import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/features/auth";
import { useAuth } from "@/app/providers";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import { Shield, FileText, Clock, Scale } from "lucide-react";

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const { branding, name, logo } = UNIVERSITY_CONFIG;

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo clickeable para volver al inicio */}
          <div
            className="flex items-center gap-2 mb-8 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <img
              src="/img/logounamad.png"
              alt="UNAMAD Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">SRQD</span>
              <span className="text-xs text-muted-foreground leading-tight">
                Sistema de Registro de Reclamos, Quejas y Denuncias
              </span>
            </div>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>

      {/* Right side - Branded background */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-6 max-w-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt={name}
              className="h-24 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1 className="text-4xl font-bold">Sistema SRQD</h1>
          <p className="text-lg text-white/90">
            Defensoría Universitaria - UNAMAD
          </p>
          <p className="text-sm text-white/80">
            Registro de Reclamos, Quejas y Denuncias
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Tutela de Derechos</div>
              <div className="text-xs text-white/80">Protección</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Registro Digital</div>
              <div className="text-xs text-white/80">Seguimiento</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Respuesta en 20 Días</div>
              <div className="text-xs text-white/80">Hábiles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Scale className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Mediación</div>
              <div className="text-xs text-white/80">Confidencial</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
