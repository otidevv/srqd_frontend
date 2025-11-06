import { DashboardLayout } from "@/widgets/layout";
import { SedesDataTable } from "./SedesDataTable";

export function SedesPage() {
  return (
    <DashboardLayout
      title="Gestión de Sedes"
      subtitle="Administra las sedes y campus de la universidad"
    >
      <SedesDataTable />
    </DashboardLayout>
  );
}
