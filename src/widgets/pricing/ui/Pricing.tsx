import { Button } from "@/shared/ui";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib";
import { useTenant } from "@/app/providers";

export function Pricing() {
  const { tenant } = useTenant();

  if (!tenant || !tenant.pricing.enabled) return null;

  const { pricing, branding, contact } = tenant;
  const plans = pricing.plans || [];

  // Find the most popular plan (middle one by default)
  const popularIndex = Math.floor(plans.length / 2);

  return (
    <section className="bg-muted/30 px-6 py-24 sm:py-32 lg:px-8" id="pricing">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2
            className="text-base font-semibold"
            style={{ color: branding.primaryColor }}
          >
            Pensiones
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Inversión en Educación
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Planes educativos diseñados para cada etapa del desarrollo de tus hijos.
            Incluye matrícula y pensión mensual.
          </p>
        </div>

        {/* Pricing cards */}
        <div className={cn(
          "grid gap-8",
          plans.length === 3 ? "lg:grid-cols-3" : plans.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"
        )}>
          {plans.map((plan, index) => {
            const isPopular = index === popularIndex;
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg",
                  isPopular && "ring-2 scale-105 shadow-xl"
                )}
                style={{
                  borderColor: isPopular ? branding.primaryColor : undefined,
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-flex rounded-full px-4 py-1 text-sm font-semibold text-white"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      Más Solicitado
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    {!plan.price.toLowerCase().includes('custom') && (
                      <span className="text-sm text-muted-foreground">/mes</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="size-5 shrink-0 mt-0.5"
                        style={{ color: branding.primaryColor }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={isPopular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                  style={isPopular ? {
                    backgroundColor: branding.primaryColor,
                    color: 'white'
                  } : undefined}
                >
                  Solicitar Información
                </Button>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          ¿Necesitas más información sobre nuestros planes?{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-semibold hover:underline"
            style={{ color: branding.primaryColor }}
          >
            Contáctanos
          </a>
        </p>
      </div>
    </section>
  );
}
