import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Label, Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import { authApi } from "@/shared/api";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import { Mail, AlertCircle, Loader2, CheckCircle } from "lucide-react";

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authApi.requestPasswordReset(email);

      if (result.success) {
        setSuccess(true);
        onSuccess?.();
      } else {
        setError("Ocurrió un error al enviar el correo");
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
          Recuperar Contraseña
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tu correo electrónico y te enviaremos instrucciones
        </CardDescription>
      </CardHeader>

      <CardContent>
        {success ? (
          <div className="space-y-4">
            {/* Success message */}
            <div className="flex items-center gap-2 p-4 text-sm bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              <CheckCircle className="size-5 shrink-0 text-green-600 dark:text-green-400" />
              <div className="space-y-1">
                <p className="font-medium text-green-900 dark:text-green-100">
                  Correo enviado
                </p>
                <p className="text-green-700 dark:text-green-300">
                  Si el correo existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.
                </p>
              </div>
            </div>

            {/* Back to login button */}
            <Link to="/login">
              <Button
                className="w-full"
                variant="outline"
              >
                Volver al inicio de sesión
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
                  Enviando...
                </>
              ) : (
                "Enviar instrucciones"
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
