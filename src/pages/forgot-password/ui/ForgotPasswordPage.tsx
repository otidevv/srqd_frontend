import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "@/features/auth";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import { Shield, Mail } from "lucide-react";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { branding, name, logo } = UNIVERSITY_CONFIG;

  return (
    <div className="min-h-screen flex">
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Left side - Forgot Password Form */}
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

          <ForgotPasswordForm />
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
              src="/img/logounamad.png"
              alt={name}
              className="h-24 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1 className="text-4xl font-bold">Recuperación de Contraseña</h1>
          <p className="text-lg text-white/90">
            Defensoría Universitaria - UNAMAD
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Proceso Seguro</div>
              <div className="text-xs text-white/80">Recuperación verificada por correo</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Mail className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Enlace de Recuperación</div>
              <div className="text-xs text-white/80">Válido por 1 hora</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
