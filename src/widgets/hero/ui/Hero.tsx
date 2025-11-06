import { Button } from "@/shared/ui";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { UNIVERSITY_CONFIG } from "@/shared/config";

export function Hero() {
  const { name, tagline, description, branding, logo } = UNIVERSITY_CONFIG;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 px-6 py-24 sm:py-32 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20">
          <div
            className="aspect-square w-[800px] rounded-full"
            style={{
              background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.accentColor}, ${branding.secondaryColor})`
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src={logo}
            alt={name}
            className="h-24 w-auto object-contain"
            onError={(e) => {
              // Fallback to icon if image fails
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur-sm">
          <GraduationCap className="size-4" style={{ color: branding.primaryColor }} />
          <span className="text-muted-foreground">
            {tagline}
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Sistema de Control de Asistencia
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="gap-2"
            style={{
              backgroundColor: branding.primaryColor,
              color: 'white'
            }}
          >
            <Link to="/login">
              Iniciar Sesión
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#features">
              Conocer Más
            </a>
          </Button>
        </div>

        {/* Additional info */}
        <p className="mt-10 text-sm text-muted-foreground">
          Plataforma de gestión de asistencia con integración ZKTeco para registro biométrico
        </p>
      </div>
    </section>
  );
}
