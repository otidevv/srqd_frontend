import { useState } from "react"
import { toast } from "sonner"
import { IconX, IconPlus, IconTrash, IconFile, IconFileTypePdf, IconPhoto } from "@tabler/icons-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/shared/ui"
import { uploadFile } from "@/shared/api/archivos"
import { addSeguimiento } from "@/shared/api/casos"

interface AddSeguimientoDialogProps {
  casoId: string
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddSeguimientoDialog({
  casoId,
  isOpen,
  onClose,
  onSuccess,
}: AddSeguimientoDialogProps) {
  const [accion, setAccion] = useState("")
  const [comentario, setComentario] = useState("")
  const [archivos, setArchivos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    if (!isSubmitting) {
      setAccion("")
      setComentario("")
      setArchivos([])
      onClose()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setArchivos(prev => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setArchivos(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (tipo: string) => {
    if (tipo.includes('pdf')) return <IconFileTypePdf className="size-5 text-red-600" />
    if (tipo.includes('image')) return <IconPhoto className="size-5 text-blue-600" />
    return <IconFile className="size-5 text-gray-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!accion.trim() || !comentario.trim()) {
      toast.error('Por favor complete todos los campos')
      return
    }

    if (comentario.length < 10) {
      toast.error('El comentario debe tener al menos 10 caracteres')
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Subir archivos primero (si hay)
      const archivosIds: string[] = []
      if (archivos.length > 0) {
        toast.loading('Subiendo archivos...', { id: 'uploading-files' })

        for (const archivo of archivos) {
          const result = await uploadFile(casoId, archivo, 'ARCHIVO_SEGUIMIENTO')
          if (result.success && result.data) {
            archivosIds.push(result.data.id)
          } else {
            const errorMsg = result.error || 'Error desconocido'
            throw new Error(`Error al subir ${archivo.name}: ${errorMsg}`)
          }
        }

        toast.dismiss('uploading-files')
      }

      // 2. Crear seguimiento con archivos
      toast.loading('Creando seguimiento...', { id: 'creating-seguimiento' })

      console.log('Llamando a addSeguimiento con:', {
        casoId,
        accion,
        comentario,
        archivosIds
      })

      const result = await addSeguimiento(casoId, {
        accion,
        comentario,
        archivosIds: archivosIds.length > 0 ? archivosIds : undefined,
      })

      console.log('Resultado de addSeguimiento:', result)

      toast.dismiss('creating-seguimiento')
      toast.success('Seguimiento agregado exitosamente')

      // Reset y cerrar
      setAccion("")
      setComentario("")
      setArchivos([])
      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('========== ERROR AL AGREGAR SEGUIMIENTO ==========')
      console.error('Error completo:', error)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('================================================')

      toast.dismiss('uploading-files')
      toast.dismiss('creating-seguimiento')

      // Mostrar mensaje de error más específico
      const errorMessage = error.details?.message || error.message || 'Error al agregar seguimiento'
      toast.error('Error al agregar seguimiento', {
        description: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Agregar Seguimiento</DialogTitle>
          <DialogDescription>
            Registra una nueva actualización o comentario sobre este caso
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Acción */}
          <div>
            <label htmlFor="accion" className="block text-sm font-medium mb-2">
              Acción <span className="text-red-500">*</span>
            </label>
            <input
              id="accion"
              type="text"
              value={accion}
              onChange={(e) => setAccion(e.target.value)}
              placeholder="Ej: Llamada telefónica, Revisión de documentos, etc."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Comentario */}
          <div>
            <label htmlFor="comentario" className="block text-sm font-medium mb-2">
              Comentario <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Describe los detalles de esta actualización..."
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Mínimo 10 caracteres. {comentario.length} / 10
            </p>
          </div>

          {/* Archivos Adjuntos */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Archivos Adjuntos (opcional)
            </label>
            <div className="space-y-2">
              {/* Lista de archivos seleccionados */}
              {archivos.length > 0 && (
                <div className="space-y-2 mb-2">
                  {archivos.map((archivo, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border"
                    >
                      <div className="flex-shrink-0">
                        {getFileIcon(archivo.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{archivo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(archivo.size)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        disabled={isSubmitting}
                        className="flex-shrink-0"
                      >
                        <IconTrash className="size-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Botón para agregar archivos */}
              <div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileSelect}
                  disabled={isSubmitting}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <IconPlus className="size-5" />
                  <span className="text-sm font-medium">
                    Seleccionar archivos
                  </span>
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, imágenes (JPG, PNG) y documentos de Office. Máximo 10MB por archivo.
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !accion.trim() || comentario.length < 10}
              className="flex-1"
            >
              {isSubmitting ? 'Guardando...' : 'Agregar Seguimiento'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
