import { useTenant } from "@/app/providers";
import { getIconComponent } from "@/shared/lib";

export function Features() {
  const { tenant } = useTenant();

  if (!tenant) return null;

  const { features, content, branding } = tenant;

  return (
    <section className="bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2
            className="text-base font-semibold"
            style={{ color: branding.primaryColor }}
          >
            ¿Por qué elegir {content.shortName}?
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Nuestra Propuesta Educativa
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Conoce las características que hacen de {content.name} la mejor
            opción para la educación de tus hijos.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = getIconComponent(feature.icon);
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border bg-card p-8 transition-all hover:shadow-lg"
                style={{
                  borderColor: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${branding.primaryColor}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 inline-flex rounded-lg p-3 ring-1 transition-all group-hover:scale-110"
                  style={{
                    backgroundColor: `${branding.primaryColor}15`,
                    color: branding.primaryColor,
                  }}
                >
                  <Icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
