import { DashboardLayout } from "@/widgets/layout";
import { UsersDataTable } from "./UsersDataTable";

export function UsersPage() {
  return (
    <DashboardLayout
      title="Gestión de Usuarios"
      subtitle="Administra los usuarios del sistema y sus permisos"
    >
      <UsersDataTable />
    </DashboardLayout>
  );
}
