import * as React from "react"
import { toast } from "sonner"
import { IconUserCheck, IconUser } from "@tabler/icons-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from '@/shared/ui'

import { type Caso } from "@/entities/caso/model/types"
import { type User } from "@/entities/user"
import { casosApi, usersApi } from "@/shared/api"

interface AsignarCasoDialogProps {
  caso: Caso | undefined
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AsignarCasoDialog({
  caso,
  isOpen,
  onOpenChange,
  onSuccess,
}: AsignarCasoDialogProps) {
  const [usuarioAsignado, setUsuarioAsignado] = React.useState<string>("")
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Load users when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      loadUsers()
      if (caso?.asignadoA) {
        setUsuarioAsignado(caso.asignadoA)
      } else {
        setUsuarioAsignado("")
      }
    }
  }, [caso, isOpen])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const allUsers = await usersApi.getUsers()
      // Filter to only show active admins and supervisors
      const eligibleUsers = allUsers.filter(
        user => user.status === "active" && (user.role === "admin" || user.role === "supervisor")
      )
      setUsers(eligibleUsers)
    } catch (error) {
      console.error("Error loading users:", error)
      toast.error("Error al cargar usuarios", {
        description: "No se pudieron cargar los usuarios disponibles"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!caso || !usuarioAsignado) {
      toast.error("Debe seleccionar un usuario")
      return
    }

    if (usuarioAsignado === caso.asignadoA) {
      toast.error("El usuario seleccionado ya es el responsable actual")
      return
    }

    setIsSubmitting(true)

    try {
      const success = await casosApi.asignarCaso(caso.id, usuarioAsignado)

      if (success) {
        const selectedUser = users.find(u => u.id === usuarioAsignado)
        toast.success("Caso asignado exitosamente", {
          description: `El caso ${caso.codigo} ha sido asignado a ${selectedUser?.name || 'el usuario'}`
        })
        onOpenChange(false)
        onSuccess()
      } else {
        throw new Error("No se pudo asignar el caso")
      }
    } catch (error) {
      console.error("Error assigning caso:", error)
      toast.error("Error al asignar caso", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!caso) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar Caso</DialogTitle>
          <DialogDescription>
            Asigna el caso {caso.codigo} a un responsable
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Current Assignment */}
          <div className="space-y-2">
            <Label>Asignación Actual</Label>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              {caso.asignadoNombre ? (
                <>
                  <IconUserCheck className="size-4 text-muted-foreground" />
                  <span className="font-medium">{caso.asignadoNombre}</span>
                </>
              ) : (
                <>
                  <IconUser className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground italic">Sin asignar</span>
                </>
              )}
            </div>
          </div>

          {/* New Assignment */}
          <div className="space-y-2">
            <Label htmlFor="usuarioAsignado">Asignar a *</Label>
            <Select
              value={usuarioAsignado}
              onValueChange={setUsuarioAsignado}
              disabled={loading}
            >
              <SelectTrigger id="usuarioAsignado">
                <SelectValue placeholder={loading ? "Cargando usuarios..." : "Seleccione un usuario"} />
              </SelectTrigger>
              <SelectContent>
                {users.length === 0 && !loading && (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    No hay usuarios disponibles
                  </div>
                )}
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <IconUser className="size-4" />
                      <span>{user.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {user.role === "admin" ? "Admin" : "Supervisor"}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Solo se muestran administradores y supervisores activos
            </p>
          </div>

          {/* Caso Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <p className="text-blue-900 font-medium mb-2">Información del Caso</p>
            <div className="space-y-1 text-xs text-blue-800">
              <p><strong>Código:</strong> {caso.codigo}</p>
              <p><strong>Tipo:</strong> {caso.tipo.charAt(0).toUpperCase() + caso.tipo.slice(1)}</p>
              <p><strong>Reclamante:</strong> {caso.reclamante.nombres} {caso.reclamante.apellidoPaterno}</p>
              <p><strong>Estado:</strong> {caso.estado.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || loading || !usuarioAsignado || usuarioAsignado === caso.asignadoA}
            >
              {isSubmitting ? "Asignando..." : "Asignar Caso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
