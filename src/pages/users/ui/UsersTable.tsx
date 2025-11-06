import { useState } from "react";
import type { User } from "@/entities/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
} from "@/shared/ui";
import {
  IconEdit,
  IconTrash,
  IconShield,
  IconUser,
  IconUserCheck,
} from "@tabler/icons-react";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const roleLabels = {
  admin: "Administrador",
  supervisor: "Supervisor",
  operator: "Operador",
};

const roleIcons = {
  admin: IconShield,
  supervisor: IconUserCheck,
  operator: IconUser,
};

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-gray-500",
  suspended: "bg-red-500",
};

const statusLabels = {
  active: "Activo",
  inactive: "Inactivo",
  suspended: "Suspendido",
};

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (userId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setDeletingId(userId);
      try {
        await onDelete(userId);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Último Acceso</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No hay usuarios registrados
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => {
              const RoleIcon = roleIcons[user.role];
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RoleIcon className="size-4 text-muted-foreground" />
                      <span>{roleLabels[user.role]}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[user.status]} text-white`}
                    >
                      {statusLabels[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(user.lastLogin)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(user)}
                      >
                        <IconEdit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                      >
                        <IconTrash className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
