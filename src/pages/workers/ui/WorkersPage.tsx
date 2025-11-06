import { DashboardLayout } from "@/widgets/layout";
import { WorkersDataTable } from "./WorkersDataTable";

export function WorkersPage() {
  return (
    <DashboardLayout
      title="Gestión de Trabajadores"
      subtitle="Administra el personal universitario y su registro biométrico"
    >
      <WorkersDataTable />
    </DashboardLayout>
  );
}
