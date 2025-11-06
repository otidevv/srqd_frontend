import { UNIVERSITY_CONFIG } from "@/shared/config";
import { iconMap } from "@/shared/lib/icon-map";

export function FeaturesSection() {
  const { features, branding } = UNIVERSITY_CONFIG;

  return (
    <section id="features" className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Características del Sistema
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Solución completa para el control y gestión de asistencia del personal universitario
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className="mb-4 inline-flex rounded-lg p-3"
                  style={{
                    backgroundColor: `${branding.primaryColor}15`,
                  }}
                >
                  {Icon && (
                    <Icon
                      className="size-6"
                      style={{ color: branding.primaryColor }}
                    />
                  )}
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
