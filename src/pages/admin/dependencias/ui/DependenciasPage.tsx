import { DashboardLayout } from "@/widgets/layout";
import { DependenciasDataTable } from "./DependenciasDataTable";

export function DependenciasPage() {
  return (
    <DashboardLayout
      title="Gestión de Dependencias"
      subtitle="Administra facultades, departamentos, oficinas e institutos"
    >
      <DependenciasDataTable />
    </DashboardLayout>
  );
}
