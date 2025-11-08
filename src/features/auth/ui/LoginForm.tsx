import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Label, Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import { useAuth } from "@/app/providers";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const result = await login({ email, password });

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || "Error al iniciar sesión");
    }
  };

  const { branding, shortName, logo } = UNIVERSITY_CONFIG;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt={shortName}
            className="h-16 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <CardTitle className="text-2xl font-bold text-center">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center">
          Sistema SRQD - Defensoría Universitaria
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              <AlertCircle className="size-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@unamad.edu.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm hover:underline"
              style={{ color: branding.primaryColor }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
            style={{
              backgroundColor: branding.primaryColor,
              color: 'white'
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          {/* Demo credentials */}
          <div className="mt-6 p-3 bg-muted rounded-md text-xs text-muted-foreground space-y-1">
            <p className="font-semibold">Credenciales de prueba:</p>
            <p><strong>Defensor:</strong> defensoria@unamad.edu.pe / defensoria123</p>
            <p><strong>Admin:</strong> admin@unamad.edu.pe / admin123</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
