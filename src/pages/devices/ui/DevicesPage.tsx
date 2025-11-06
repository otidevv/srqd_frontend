import { DashboardLayout } from "@/widgets/layout";
import { Card } from "@/shared/ui";
import { IconFingerprint } from "@tabler/icons-react";

export function DevicesPage() {
  return (
    <DashboardLayout
      title="Dispositivos ZKTeco"
      subtitle="Administra los dispositivos biométricos y sincroniza datos"
    >
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <IconFingerprint className="size-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground text-center max-w-md">
            El módulo de gestión de dispositivos ZKTeco estará disponible próximamente.
            Aquí podrás configurar dispositivos, sincronizar registros biométricos
            y enrollar trabajadores en los lectores.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
