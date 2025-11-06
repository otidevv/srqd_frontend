import { DashboardLayout } from "@/widgets/layout";
import { Card } from "@/shared/ui";
import { IconClock } from "@tabler/icons-react";

export function AttendancePage() {
  return (
    <DashboardLayout
      title="Registro de Asistencias"
      subtitle="Visualiza y gestiona los registros de asistencia del personal"
    >
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <IconClock className="size-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground text-center max-w-md">
            El módulo de registro de asistencias estará disponible próximamente.
            Aquí podrás visualizar los registros de entrada y salida del personal
            sincronizados desde los dispositivos ZKTeco.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
