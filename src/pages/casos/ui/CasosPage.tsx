import { DashboardLayout } from "@/widgets/layout";
import { CasosDataTable } from "./CasosDataTable";

export function CasosPage() {
  return (
    <DashboardLayout
      title="Casos SRQD"
      subtitle="Gestión de Reclamos, Quejas y Denuncias"
    >
      <CasosDataTable />
    </DashboardLayout>
  );
}
