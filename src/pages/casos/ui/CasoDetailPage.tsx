import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  IconArrowLeft,
  IconEdit,
  IconFlag,
  IconUserCheck,
  IconFileText,
  IconClock,
  IconEye,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconDownload,
  IconUser,
  IconPhone,
  IconMail,
  IconMapPin,
  IconCalendar,
  IconPlus,
} from "@tabler/icons-react"
import { DashboardLayout } from "@/widgets/layout"
import {
  Button,
  Badge,
  Card,
  Separator,
} from "@/shared/ui"
import { type Caso } from "@/entities/caso/model/types"
import { casosApi } from "@/shared/api"
import { EditCasoEstadoDialog } from "./EditCasoEstadoDialog"
import { EditCasoPrioridadDialog } from "./EditCasoPrioridadDialog"
import { AsignarCasoDialog } from "./AsignarCasoDialog"
import { AddSeguimientoDialog } from "./AddSeguimientoDialog"

// Helper functions (same as CasosDataTable)
function getTipoBadgeVariant(tipo: string) {
  switch (tipo) {
    case "reclamo":
      return "default"
    case "queja":
      return "secondary"
    case "denuncia":
      return "destructive"
    default:
      return "outline"
  }
}

function getTipoLabel(tipo: string) {
  return tipo.charAt(0).toUpperCase() + tipo.slice(1)
}

function getEstadoBadgeVariant(estado: string) {
  switch (estado) {
    case "pendiente":
      return "secondary"
    case "en_revision":
      return "default"
    case "en_proceso":
      return "default"
    case "resuelto":
      return "default"
    case "archivado":
      return "outline"
    case "rechazado":
      return "destructive"
    default:
      return "outline"
  }
}

function getEstadoIcon(estado: string) {
  switch (estado) {
    case "pendiente":
      return IconClock
    case "en_revision":
      return IconEye
    case "en_proceso":
      return IconAlertCircle
    case "resuelto":
      return IconCheck
    case "archivado":
      return IconX
    case "rechazado":
      return IconX
    default:
      return IconClock
  }
}

function getEstadoLabel(estado: string) {
  switch (estado) {
    case "pendiente":
      return "Pendiente"
    case "en_revision":
      return "En Revisión"
    case "en_proceso":
      return "En Proceso"
    case "resuelto":
      return "Resuelto"
    case "archivado":
      return "Archivado"
    case "rechazado":
      return "Rechazado"
    default:
      return estado
  }
}

function getPrioridadBadgeVariant(prioridad: string) {
  switch (prioridad) {
    case "urgente":
      return "destructive"
    case "alta":
      return "secondary"
    case "media":
      return "default"
    case "baja":
      return "outline"
    default:
      return "outline"
  }
}

function getPrioridadIcon(prioridad: string) {
  switch (prioridad) {
    case "urgente":
      return IconAlertTriangle
    case "alta":
      return IconAlertCircle
    case "media":
    case "baja":
      return IconFlag
    default:
      return IconFlag
  }
}

function getPrioridadLabel(prioridad: string) {
  return prioridad.charAt(0).toUpperCase() + prioridad.slice(1)
}

function formatDate(date?: Date | string) {
  if (!date) return "-"
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateTime(date?: Date | string) {
  if (!date) return "-"
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function CasoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [caso, setCaso] = React.useState<Caso | null>(null)
  const [loading, setLoading] = React.useState(true)

  // Dialog states
  const [isEditEstadoDialogOpen, setIsEditEstadoDialogOpen] = React.useState(false)
  const [isEditPrioridadDialogOpen, setIsEditPrioridadDialogOpen] = React.useState(false)
  const [isAsignarDialogOpen, setIsAsignarDialogOpen] = React.useState(false)
  const [isAddSeguimientoDialogOpen, setIsAddSeguimientoDialogOpen] = React.useState(false)

  const loadCaso = React.useCallback(async () => {
    if (!id) return

    setLoading(true)
    try {
      const data = await casosApi.getCasoById(id)
      setCaso(data)
    } catch (error) {
      console.error("Error loading caso:", error)
      toast.error("Error al cargar el caso", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
      // Navigate back to casos list
      navigate("/casos")
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  React.useEffect(() => {
    loadCaso()
  }, [loadCaso])

  // Handle file download
  const handleDownloadArchivo = async (archivoId: string, filename: string) => {
    try {
      await casosApi.downloadArchivo(archivoId, filename)
      toast.success("Descargando archivo", {
        description: filename
      })
    } catch (error) {
      console.error("Error downloading archivo:", error)
      toast.error("Error al descargar archivo", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    }
  }

  if (loading) {
    return (
      <DashboardLayout
        title="Cargando caso..."
        subtitle="Por favor espere"
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Cargando detalles del caso...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!caso) {
    return (
      <DashboardLayout
        title="Caso no encontrado"
        subtitle="El caso solicitado no existe"
      >
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-muted-foreground">No se encontró el caso solicitado</p>
          <Button onClick={() => navigate("/casos")}>
            <IconArrowLeft className="size-4 mr-2" />
            Volver a Casos
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const EstadoIcon = getEstadoIcon(caso.estado)
  const PrioridadIcon = getPrioridadIcon(caso.prioridad)

  return (
    <DashboardLayout
      title={`Caso ${caso.codigo}`}
      subtitle={`${getTipoLabel(caso.tipo)} - ${getEstadoLabel(caso.estado)}`}
    >
      {/* Back button */}
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/casos")}>
          <IconArrowLeft className="size-4 mr-2" />
          Volver a Casos
        </Button>
      </div>

      {/* Header Card */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold">{caso.codigo}</h2>
              <Badge variant={getTipoBadgeVariant(caso.tipo)}>
                {getTipoLabel(caso.tipo)}
              </Badge>
              <div className="flex items-center gap-2">
                <EstadoIcon className="size-5 text-muted-foreground" />
                <Badge variant={getEstadoBadgeVariant(caso.estado)}>
                  {getEstadoLabel(caso.estado)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <PrioridadIcon className="size-5 text-muted-foreground" />
                <Badge variant={getPrioridadBadgeVariant(caso.prioridad)}>
                  {getPrioridadLabel(caso.prioridad)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconCalendar className="size-4" />
                <span>Creado: {formatDate(caso.fechaCreacion)}</span>
              </div>
              {caso.asignadoNombre && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconUserCheck className="size-4" />
                  <span>Asignado a: {caso.asignadoNombre}</span>
                </div>
              )}
              {caso.fechaResolucion && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconCheck className="size-4" />
                  <span>Resuelto: {formatDate(caso.fechaResolucion)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2 lg:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditEstadoDialogOpen(true)}
            >
              <IconEdit className="size-4 mr-2" />
              Cambiar Estado
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditPrioridadDialogOpen(true)}
            >
              <IconFlag className="size-4 mr-2" />
              Cambiar Prioridad
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAsignarDialogOpen(true)}
            >
              <IconUserCheck className="size-4 mr-2" />
              Asignar
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descripción de los Hechos */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <IconFileText className="size-5 text-primary" />
              Descripción de los Hechos
            </h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: caso.descripcionHechos }}
            />
          </Card>

          {/* Derechos Afectados */}
          {caso.derechosAfectados && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Derechos Afectados</h3>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: caso.derechosAfectados }}
              />
            </Card>
          )}

          {/* Documento de Identidad */}
          {caso.archivos?.filter(a => a.categoria === 'documento_identidad').length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <IconFileText className="size-5 text-primary" />
                Documento de Identidad
              </h3>
              <div className="space-y-2">
                {caso.archivos.filter(a => a.categoria === 'documento_identidad').map((archivo) => (
                  <div
                    key={archivo.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <IconFileText className="size-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{archivo.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {(archivo.tamano / 1024).toFixed(2)} KB • {formatDate(archivo.fechaSubida)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadArchivo(archivo.id, archivo.nombre)}
                    >
                      <IconDownload className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Pruebas Documentales */}
          {caso.archivos?.filter(a => a.categoria === 'prueba_documental' && !a.seguimientoId).length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <IconFileText className="size-5 text-primary" />
                Pruebas Documentales ({caso.archivos.filter(a => a.categoria === 'prueba_documental' && !a.seguimientoId).length})
              </h3>
              <div className="space-y-2">
                {caso.archivos.filter(a => a.categoria === 'prueba_documental' && !a.seguimientoId).map((archivo) => (
                  <div
                    key={archivo.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <IconFileText className="size-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{archivo.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {(archivo.tamano / 1024).toFixed(2)} KB • {formatDate(archivo.fechaSubida)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadArchivo(archivo.id, archivo.nombre)}
                    >
                      <IconDownload className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* PDF Generado */}
          {caso.archivos?.filter(a => a.categoria === 'pdf_generado').length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <IconFileText className="size-5 text-primary" />
                Archivo PDF Generado
              </h3>
              <div className="space-y-2">
                {caso.archivos.filter(a => a.categoria === 'pdf_generado').map((archivo) => (
                  <div
                    key={archivo.id}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <IconFileText className="size-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate text-blue-900">{archivo.nombre}</p>
                        <p className="text-xs text-blue-700">
                          {(archivo.tamano / 1024).toFixed(2)} KB • {formatDate(archivo.fechaSubida)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-200"
                      onClick={() => handleDownloadArchivo(archivo.id, archivo.nombre)}
                    >
                      <IconDownload className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Seguimientos */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <IconClock className="size-5 text-primary" />
                Historial de Seguimiento ({caso.seguimientos?.length || 0})
              </h3>
              <Button
                onClick={() => setIsAddSeguimientoDialogOpen(true)}
                size="sm"
              >
                <IconPlus className="size-4 mr-2" />
                Agregar Seguimiento
              </Button>
            </div>
            {caso.seguimientos && caso.seguimientos.length > 0 && (
              <div className="space-y-4">
                {caso.seguimientos.map((seguimiento, index) => (
                  <div key={seguimiento.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{seguimiento.accion}</p>
                          <p className="text-xs text-muted-foreground">
                            Por {seguimiento.usuarioNombre} • {formatDateTime(seguimiento.fecha)}
                          </p>
                        </div>
                        {seguimiento.estadoNuevo && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">
                              {seguimiento.estadoAnterior && `${getEstadoLabel(seguimiento.estadoAnterior)} →`}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {getEstadoLabel(seguimiento.estadoNuevo)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      {seguimiento.comentario && (
                        <p className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                          {seguimiento.comentario}
                        </p>
                      )}
                      {seguimiento.archivos && seguimiento.archivos.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Archivos adjuntos ({seguimiento.archivos.length})
                          </p>
                          <div className="space-y-1">
                            {seguimiento.archivos.map((archivo) => (
                              <div
                                key={archivo.id}
                                className="flex items-center justify-between p-2 bg-muted/50 rounded-md hover:bg-muted transition-colors"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <IconFileText className="size-4 text-muted-foreground flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{archivo.nombre}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {(archivo.tamano / 1024).toFixed(2)} KB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownloadArchivo(archivo.id, archivo.nombre)}
                                  className="flex-shrink-0"
                                >
                                  <IconDownload className="size-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!caso.seguimientos || caso.seguimientos.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay seguimientos registrados aún
              </p>
            )}
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Reclamante */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <IconUser className="size-5 text-primary" />
              Reclamante
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nombre Completo</p>
                <p className="font-medium">
                  {caso.reclamante.nombres} {caso.reclamante.apellidoPaterno} {caso.reclamante.apellidoMaterno}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rol</p>
                <p className="font-medium capitalize">{caso.reclamante.rolReclamante}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Documento</p>
                <p className="font-medium">
                  {caso.reclamante.tipoDocumento.toUpperCase()}: {caso.reclamante.numeroDocumento}
                </p>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <IconMail className="size-4 text-muted-foreground" />
                <p className="text-sm">{caso.reclamante.correo}</p>
              </div>
              <div className="flex items-center gap-2">
                <IconPhone className="size-4 text-muted-foreground" />
                <p className="text-sm">{caso.reclamante.celular}</p>
              </div>
              <div className="flex items-start gap-2">
                <IconMapPin className="size-4 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-sm">{caso.reclamante.domicilio}</p>
              </div>
            </div>
          </Card>

          {/* Reclamado */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <IconUser className="size-5 text-destructive" />
              Reclamado
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nombre Completo</p>
                <p className="font-medium">
                  {caso.reclamado.nombres} {caso.reclamado.apellidoPaterno} {caso.reclamado.apellidoMaterno}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rol</p>
                <p className="font-medium capitalize">{caso.reclamado.rolReclamado}</p>
              </div>
              {caso.reclamado.correo && (
                <>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <IconMail className="size-4 text-muted-foreground" />
                    <p className="text-sm">{caso.reclamado.correo}</p>
                  </div>
                </>
              )}
              {caso.reclamado.celular && (
                <div className="flex items-center gap-2">
                  <IconPhone className="size-4 text-muted-foreground" />
                  <p className="text-sm">{caso.reclamado.celular}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Resolución */}
          {caso.resolucion && (
            <Card className="p-6 border-green-200 bg-green-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-900">
                <IconCheck className="size-5" />
                Resolución
              </h3>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: caso.resolucion }}
              />
            </Card>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <EditCasoEstadoDialog
        caso={caso}
        isOpen={isEditEstadoDialogOpen}
        onOpenChange={setIsEditEstadoDialogOpen}
        onSuccess={loadCaso}
      />

      <EditCasoPrioridadDialog
        caso={caso}
        isOpen={isEditPrioridadDialogOpen}
        onOpenChange={setIsEditPrioridadDialogOpen}
        onSuccess={loadCaso}
      />

      <AsignarCasoDialog
        caso={caso}
        isOpen={isAsignarDialogOpen}
        onOpenChange={setIsAsignarDialogOpen}
        onSuccess={loadCaso}
      />

      <AddSeguimientoDialog
        casoId={caso.id}
        isOpen={isAddSeguimientoDialogOpen}
        onClose={() => setIsAddSeguimientoDialogOpen(false)}
        onSuccess={loadCaso}
      />
    </DashboardLayout>
  )
}
