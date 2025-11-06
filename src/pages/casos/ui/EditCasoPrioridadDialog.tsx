import * as React from "react"
import { toast } from "sonner"
import { IconAlertTriangle, IconAlertCircle, IconFlag } from "@tabler/icons-react"
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

import { type Caso, type CasoPrioridad } from "@/entities/caso/model/types"
import { casosApi } from "@/shared/api"

interface EditCasoPrioridadDialogProps {
  caso: Caso | undefined
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const prioridadOptions: { value: CasoPrioridad; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "urgente", label: "Urgente", icon: IconAlertTriangle },
  { value: "alta", label: "Alta", icon: IconAlertCircle },
  { value: "media", label: "Media", icon: IconFlag },
  { value: "baja", label: "Baja", icon: IconFlag },
]

export function EditCasoPrioridadDialog({
  caso,
  isOpen,
  onOpenChange,
  onSuccess,
}: EditCasoPrioridadDialogProps) {
  const [nuevaPrioridad, setNuevaPrioridad] = React.useState<CasoPrioridad | "">("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Reset state when caso changes or dialog opens
  React.useEffect(() => {
    if (caso && isOpen) {
      setNuevaPrioridad(caso.prioridad)
    }
  }, [caso, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!caso || !nuevaPrioridad) {
      toast.error("Debe seleccionar una prioridad")
      return
    }

    if (nuevaPrioridad === caso.prioridad) {
      toast.error("La prioridad seleccionada es la misma que la actual")
      return
    }

    setIsSubmitting(true)

    try {
      const success = await casosApi.updateCasoPrioridad(
        caso.id,
        nuevaPrioridad,
        "", // userId - will be extracted from token on backend
        ""  // userName - will be extracted from token on backend
      )

      if (success) {
        toast.success("Prioridad actualizada exitosamente", {
          description: `El caso ${caso.codigo} ahora tiene prioridad ${prioridadOptions.find(p => p.value === nuevaPrioridad)?.label.toLowerCase()}`
        })
        onOpenChange(false)
        onSuccess()
      } else {
        throw new Error("No se pudo actualizar la prioridad")
      }
    } catch (error) {
      console.error("Error updating prioridad:", error)
      toast.error("Error al actualizar prioridad", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!caso) return null

  const currentPrioridadOption = prioridadOptions.find(p => p.value === caso.prioridad)
  const CurrentIcon = currentPrioridadOption?.icon || IconFlag

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cambiar Prioridad del Caso</DialogTitle>
          <DialogDescription>
            Actualiza la prioridad del caso {caso.codigo}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Current Prioridad */}
          <div className="space-y-2">
            <Label>Prioridad Actual</Label>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <CurrentIcon className="size-4 text-muted-foreground" />
              <Badge variant="secondary">
                {currentPrioridadOption?.label || caso.prioridad}
              </Badge>
            </div>
          </div>

          {/* New Prioridad */}
          <div className="space-y-2">
            <Label htmlFor="nuevaPrioridad">Nueva Prioridad *</Label>
            <Select
              value={nuevaPrioridad}
              onValueChange={(value) => setNuevaPrioridad(value as CasoPrioridad)}
            >
              <SelectTrigger id="nuevaPrioridad">
                <SelectValue placeholder="Seleccione una prioridad" />
              </SelectTrigger>
              <SelectContent>
                {prioridadOptions.map((option) => {
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
            <p className="text-yellow-900">
              <strong>Criterios de Prioridad:</strong>
            </p>
            <ul className="mt-2 space-y-1 text-xs text-yellow-800">
              <li>• <strong>Urgente:</strong> Requiere atención inmediata</li>
              <li>• <strong>Alta:</strong> Importante, resolver pronto</li>
              <li>• <strong>Media:</strong> Prioridad normal</li>
              <li>• <strong>Baja:</strong> Puede esperar</li>
            </ul>
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
              disabled={isSubmitting || !nuevaPrioridad || nuevaPrioridad === caso.prioridad}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar Prioridad"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
