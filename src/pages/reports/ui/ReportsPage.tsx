import { DashboardLayout } from "@/widgets/layout";
import { Card } from "@/shared/ui";
import { IconFileText } from "@tabler/icons-react";

export function ReportsPage() {
  return (
    <DashboardLayout
      title="Reportes de Asistencia"
      subtitle="Genera y exporta reportes detallados de asistencia"
    >
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <IconFileText className="size-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground text-center max-w-md">
            El módulo de reportes estará disponible próximamente.
            Aquí podrás generar reportes personalizados de asistencia
            y exportarlos en formatos PDF y Excel.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
