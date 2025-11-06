import { DashboardLayout } from "@/widgets/layout";
import { RolesDataTable } from "./RolesDataTable";

export function RolesPage() {
  return (
    <DashboardLayout
      title="Roles y Privilegios"
      subtitle="Gestiona roles y asigna permisos granulares por módulo"
    >
      <RolesDataTable />
    </DashboardLayout>
  );
}
