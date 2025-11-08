import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/ui";
import { rolesApi } from "@/shared/api";
import { toast } from "sonner";
import type { Role } from "@/entities/role";
import { Loader2, UserMinus } from "lucide-react";

interface RoleUsersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onSuccess?: () => void;
}

export function RoleUsersDialog({ open, onOpenChange, role, onSuccess }: RoleUsersDialogProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && role) {
      loadUsers();
    }
  }, [open, role]);

  const loadUsers = async () => {
    if (!role) return;

    try {
      setIsLoading(true);
      const data = await rolesApi.getRoleWithUsers(role.id);
      setUsers(data.users || []);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      await rolesApi.removeUserFromRole(userId);
      toast.success("Usuario removido del rol");
      loadUsers();
      onSuccess?.();
    } catch (error) {
      toast.error("Error al remover usuario");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Usuarios asignados: {role?.name}</DialogTitle>
          <DialogDescription>
            {users.length} usuario(s) con este rol
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No hay usuarios asignados a este rol
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
              >
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  <UserMinus className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
