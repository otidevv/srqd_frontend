import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label, Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import { authApi } from "@/shared/api";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import { Lock, AlertCircle, Loader2, CheckCircle } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      setIsValidating(true);
      try {
        const result = await authApi.validateResetToken(token);
        if (result.success) {
          setTokenValid(true);
        } else {
          setError("El enlace de recuperación es inválido o ha expirado");
        }
      } catch (err: any) {
        setError(err.message || "El enlace de recuperación es inválido o ha expirado");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authApi.resetPassword(token, password);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Ocurrió un error al restablecer la contraseña");
      }
    } catch (err: any) {
      setError(err.message || "Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
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
          Nueva Contraseña
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tu nueva contraseña
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isValidating ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : !tokenValid ? (
          <div className="space-y-4">
            {/* Error message */}
            <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              <AlertCircle className="size-5 shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">
                  Enlace inválido
                </p>
                <p>
                  {error || "El enlace de recuperación es inválido o ha expirado"}
                </p>
              </div>
            </div>

            {/* Back to forgot password */}
            <Link to="/forgot-password">
              <Button
                className="w-full"
                variant="outline"
              >
                Solicitar nuevo enlace
              </Button>
            </Link>
          </div>
        ) : success ? (
          <div className="space-y-4">
            {/* Success message */}
            <div className="flex items-center gap-2 p-4 text-sm bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              <CheckCircle className="size-5 shrink-0 text-green-600 dark:text-green-400" />
              <div className="space-y-1">
                <p className="font-medium text-green-900 dark:text-green-100">
                  Contraseña actualizada
                </p>
                <p className="text-green-700 dark:text-green-300">
                  Tu contraseña ha sido actualizada exitosamente. Redirigiendo...
                </p>
              </div>
            </div>

            {/* Back to login button */}
            <Link to="/login">
              <Button
                className="w-full"
                style={{
                  backgroundColor: branding.primaryColor,
                  color: 'white'
                }}
              >
                Ir al inicio de sesión
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                <AlertCircle className="size-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Nueva Contraseña</Label>
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
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Confirm Password field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  autoComplete="new-password"
                  required
                />
              </div>
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
                  Actualizando...
                </>
              ) : (
                "Restablecer Contraseña"
              )}
            </Button>

            {/* Back to login link */}
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm hover:underline"
                style={{ color: branding.primaryColor }}
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
