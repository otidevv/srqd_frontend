import { DashboardLayout } from "@/widgets/layout";
import { Card } from "@/shared/ui";
import { IconCalendar } from "@tabler/icons-react";

export function SchedulesPage() {
  return (
    <DashboardLayout
      title="Gestión de Horarios"
      subtitle="Configura los horarios de trabajo y turnos del personal"
    >
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <IconCalendar className="size-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground text-center max-w-md">
            El módulo de gestión de horarios estará disponible próximamente.
            Aquí podrás configurar turnos, horarios de entrada/salida y
            asignarlos al personal.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
