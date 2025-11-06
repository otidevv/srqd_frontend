import * as React from "react"
import { toast } from "sonner"
import { IconCheck, IconX, IconClock, IconEye, IconAlertCircle } from "@tabler/icons-react"
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

import { type Caso, type CasoEstado } from "@/entities/caso/model/types"
import { casosApi } from "@/shared/api"

interface EditCasoEstadoDialogProps {
  caso: Caso | undefined
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const estadoOptions: { value: CasoEstado; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "pendiente", label: "Pendiente", icon: IconClock },
  { value: "en_revision", label: "En Revisión", icon: IconEye },
  { value: "en_proceso", label: "En Proceso", icon: IconAlertCircle },
  { value: "resuelto", label: "Resuelto", icon: IconCheck },
  { value: "archivado", label: "Archivado", icon: IconX },
  { value: "rechazado", label: "Rechazado", icon: IconX },
]

export function EditCasoEstadoDialog({
  caso,
  isOpen,
  onOpenChange,
  onSuccess,
}: EditCasoEstadoDialogProps) {
  const [nuevoEstado, setNuevoEstado] = React.useState<CasoEstado | "">("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Reset state when caso changes or dialog opens
  React.useEffect(() => {
    if (caso && isOpen) {
      setNuevoEstado(caso.estado)
    }
  }, [caso, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!caso || !nuevoEstado) {
      toast.error("Debe seleccionar un estado")
      return
    }

    if (nuevoEstado === caso.estado) {
      toast.error("El estado seleccionado es el mismo que el actual")
      return
    }

    setIsSubmitting(true)

    try {
      await casosApi.updateCasoEstado(caso.id, nuevoEstado)

      toast.success("Estado actualizado exitosamente", {
        description: `El caso ${caso.codigo} ahora está ${estadoOptions.find(e => e.value === nuevoEstado)?.label.toLowerCase()}`
      })
      onOpenChange(false)
      onSuccess()
    } catch (error: any) {
      console.error("Error updating estado:", error)
      toast.error("Error al actualizar estado", {
        description: error.details?.message || error.message || "Ocurrió un error inesperado"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!caso) return null

  const currentEstadoOption = estadoOptions.find(e => e.value === caso.estado)
  const CurrentIcon = currentEstadoOption?.icon || IconClock

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cambiar Estado del Caso</DialogTitle>
          <DialogDescription>
            Actualiza el estado del caso {caso.codigo}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Current Estado */}
          <div className="space-y-2">
            <Label>Estado Actual</Label>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <CurrentIcon className="size-4 text-muted-foreground" />
              <Badge variant="secondary">
                {currentEstadoOption?.label || caso.estado}
              </Badge>
            </div>
          </div>

          {/* New Estado */}
          <div className="space-y-2">
            <Label htmlFor="nuevoEstado">Nuevo Estado *</Label>
            <Select
              value={nuevoEstado}
              onValueChange={(value) => setNuevoEstado(value as CasoEstado)}
            >
              <SelectTrigger id="nuevoEstado">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                {estadoOptions.map((option) => {
                  const OptionIcon = option.icon
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <OptionIcon className="size-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <p className="text-blue-900">
              <strong>Nota:</strong> Este cambio quedará registrado en el historial de seguimiento del caso.
            </p>
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
              disabled={isSubmitting || !nuevoEstado || nuevoEstado === caso.estado}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar Estado"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
