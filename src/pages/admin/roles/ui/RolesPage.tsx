import { useState } from "react";
import { DashboardLayout } from "@/widgets/layout";
import { RolesDataTable } from "./RolesDataTable";
import { CreateRoleDialog } from "./CreateRoleDialog";
import { EditRoleDialog } from "./EditRoleDialog";
import { RoleUsersDialog } from "./RoleUsersDialog";
import { DeleteRoleDialog } from "./DeleteRoleDialog";
import type { Role } from "@/entities/role";

export function RolesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setEditOpen(true);
  };

  const handleViewUsers = (role: Role) => {
    setSelectedRole(role);
    setUsersOpen(true);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setDeleteOpen(true);
  };

  return (
    <DashboardLayout
      title="Roles y Privilegios"
      subtitle="Gestiona roles y asigna permisos granulares por módulo"
    >
      <RolesDataTable
        key={refreshKey}
        onCreateRole={() => setCreateOpen(true)}
        onEditRole={handleEdit}
        onViewUsers={handleViewUsers}
        onDeleteRole={handleDelete}
      />

      <CreateRoleDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={handleRefresh}
      />

      <EditRoleDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        role={selectedRole}
        onSuccess={handleRefresh}
      />

      <RoleUsersDialog
        open={usersOpen}
        onOpenChange={setUsersOpen}
        role={selectedRole}
        onSuccess={handleRefresh}
      />

      <DeleteRoleDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        role={selectedRole}
        onSuccess={handleRefresh}
      />
    </DashboardLayout>
  );
}
