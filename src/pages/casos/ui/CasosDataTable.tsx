import * as React from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconEdit,
  IconTrash,
  IconEye,
  IconUserCheck,
  IconCheck,
  IconX,
  IconClock,
  IconAlertCircle,
  IconAlertTriangle,
  IconFlag,
  IconUser,
} from "@tabler/icons-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'

import { type Caso, type CasoEstado, type CasoTipo, type CasoPrioridad } from "@/entities/caso/model/types"
import { casosApi } from "@/shared/api"
import { EditCasoEstadoDialog } from "./EditCasoEstadoDialog"
import { EditCasoPrioridadDialog } from "./EditCasoPrioridadDialog"
import { AsignarCasoDialog } from "./AsignarCasoDialog"

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

// Get badge variant for tipo
function getTipoBadgeVariant(tipo: CasoTipo) {
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

// Get tipo label
function getTipoLabel(tipo: CasoTipo) {
  switch (tipo) {
    case "reclamo":
      return "Reclamo"
    case "queja":
      return "Queja"
    case "denuncia":
      return "Denuncia"
    default:
      return tipo
  }
}

// Get badge variant for estado
function getEstadoBadgeVariant(estado: CasoEstado) {
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

// Get estado icon
function getEstadoIcon(estado: CasoEstado) {
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

// Get estado label
function getEstadoLabel(estado: CasoEstado) {
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

// Get prioridad badge variant
function getPrioridadBadgeVariant(prioridad: CasoPrioridad) {
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

// Get prioridad icon
function getPrioridadIcon(prioridad: CasoPrioridad) {
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

// Get prioridad label
function getPrioridadLabel(prioridad: CasoPrioridad) {
  switch (prioridad) {
    case "urgente":
      return "Urgente"
    case "alta":
      return "Alta"
    case "media":
      return "Media"
    case "baja":
      return "Baja"
    default:
      return prioridad
  }
}

// Format date
function formatDate(date?: Date | string) {
  if (!date) return "-"
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const columns: ColumnDef<Caso>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "codigo",
    header: "Código",
    cell: ({ row, table }) => {
      const handleViewDetails = () => {
        const meta = table.options.meta as any
        meta?.onViewCaso?.(row.original)
      }
      return (
        <div className="flex flex-col">
          <button
            onClick={handleViewDetails}
            className="font-semibold text-primary hover:underline text-left"
          >
            {row.original.codigo}
          </button>
          <span className="text-xs text-muted-foreground">
            {row.original.reclamante.nombres} {row.original.reclamante.apellidoPaterno}
          </span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => (
      <Badge variant={getTipoBadgeVariant(row.original.tipo)}>
        {getTipoLabel(row.original.tipo)}
      </Badge>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const EstadoIcon = getEstadoIcon(row.original.estado)
      return (
        <div className="flex items-center gap-2">
          <EstadoIcon className="size-4 text-muted-foreground" />
          <Badge variant={getEstadoBadgeVariant(row.original.estado)}>
            {getEstadoLabel(row.original.estado)}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "prioridad",
    header: "Prioridad",
    cell: ({ row }) => {
      const PrioridadIcon = getPrioridadIcon(row.original.prioridad)
      return (
        <div className="flex items-center gap-2">
          <PrioridadIcon className="size-4 text-muted-foreground" />
          <Badge variant={getPrioridadBadgeVariant(row.original.prioridad)}>
            {getPrioridadLabel(row.original.prioridad)}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "reclamante",
    header: "Reclamante",
    cell: ({ row }) => (
      <div className="text-sm">
        <div className="font-medium">
          {row.original.reclamante.nombres} {row.original.reclamante.apellidoPaterno}
        </div>
        <div className="text-xs text-muted-foreground capitalize">
          {row.original.reclamante.rolReclamante}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "asignadoNombre",
    header: "Asignado",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm">
        {row.original.asignadoNombre ? (
          <>
            <IconUserCheck className="size-4 text-muted-foreground" />
            {row.original.asignadoNombre}
          </>
        ) : (
          <span className="text-muted-foreground italic">Sin asignar</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "fechaCreacion",
    header: "Fecha Creación",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {formatDate(row.original.fechaCreacion)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const handleViewDetails = () => {
        const meta = table.options.meta as any
        meta?.onViewCaso?.(row.original)
      }
      const handleEditEstado = () => {
        const meta = table.options.meta as any
        meta?.onEditEstado?.(row.original)
      }
      const handleEditPrioridad = () => {
        const meta = table.options.meta as any
        meta?.onEditPrioridad?.(row.original)
      }
      const handleAsignar = () => {
        const meta = table.options.meta as any
        meta?.onAsignarCaso?.(row.original)
      }
      const handleDelete = () => {
        const meta = table.options.meta as any
        meta?.onDeleteCaso?.(row.original)
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleViewDetails}>
              <IconEye className="size-4 mr-2" />
              Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEditEstado}>
              <IconEdit className="size-4 mr-2" />
              Cambiar Estado
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEditPrioridad}>
              <IconFlag className="size-4 mr-2" />
              Cambiar Prioridad
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAsignar}>
              <IconUserCheck className="size-4 mr-2" />
              Asignar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <IconTrash className="size-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function DraggableRow({ row }: { row: Row<Caso> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function CasosDataTable() {
  const navigate = useNavigate()
  const [data, setData] = React.useState<Caso[]>([])
  const [loading, setLoading] = React.useState(true)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      reclamante: false,
      asignadoNombre: false,
      fechaCreacion: false,
    })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  // Modal states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [isEditEstadoDialogOpen, setIsEditEstadoDialogOpen] = React.useState(false)
  const [isEditPrioridadDialogOpen, setIsEditPrioridadDialogOpen] = React.useState(false)
  const [isAsignarDialogOpen, setIsAsignarDialogOpen] = React.useState(false)
  const [selectedCaso, setSelectedCaso] = React.useState<Caso | undefined>()

  // Load casos
  const loadCasos = React.useCallback(async () => {
    setLoading(true)
    try {
      const casos = await casosApi.getCasos()
      setData(casos)
    } catch (error) {
      console.error("Error loading casos:", error)
      toast.error("Error al cargar casos", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadCasos()
  }, [loadCasos])

  // View caso details
  const handleViewCaso = (caso: Caso) => {
    navigate(`/casos/${caso.id}`)
  }

  // Edit estado
  const handleEditEstado = (caso: Caso) => {
    setSelectedCaso(caso)
    setIsEditEstadoDialogOpen(true)
  }

  // Edit prioridad
  const handleEditPrioridad = (caso: Caso) => {
    setSelectedCaso(caso)
    setIsEditPrioridadDialogOpen(true)
  }

  // Asignar caso
  const handleAsignarCaso = (caso: Caso) => {
    setSelectedCaso(caso)
    setIsAsignarDialogOpen(true)
  }

  // Delete caso - Open confirmation dialog
  const handleDeleteClick = (caso: Caso) => {
    setSelectedCaso(caso)
    setIsDeleteDialogOpen(true)
  }

  // Confirm delete caso
  const handleConfirmDelete = async () => {
    if (!selectedCaso) return

    try {
      const success = await casosApi.deleteCaso(selectedCaso.id)
      if (success) {
        setIsDeleteDialogOpen(false)
        setSelectedCaso(undefined)
        await loadCasos()
        toast.success("Caso eliminado exitosamente", {
          description: `El caso ${selectedCaso.codigo} ha sido eliminado`
        })
      } else {
        throw new Error("No se pudo eliminar el caso")
      }
    } catch (error) {
      console.error("Error deleting caso:", error)
      toast.error("Error al eliminar caso", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    }
  }

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      onViewCaso: handleViewCaso,
      onEditEstado: handleEditEstado,
      onEditPrioridad: handleEditPrioridad,
      onAsignarCaso: handleAsignarCaso,
      onDeleteCaso: handleDeleteClick,
    },
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Cargando casos...</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 lg:flex-1 lg:flex-row lg:items-center">
          <Input
            placeholder="Buscar por código o reclamante..."
            value={(table.getColumn("codigo")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("codigo")?.setFilterValue(event.target.value)
            }
            className="w-full lg:max-w-sm"
          />
          <div className="flex gap-2">
            <Select
              value={(table.getColumn("tipo")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) =>
                table.getColumn("tipo")?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="reclamo">Reclamo</SelectItem>
                <SelectItem value="queja">Queja</SelectItem>
                <SelectItem value="denuncia">Denuncia</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={(table.getColumn("estado")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) =>
                table.getColumn("estado")?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en_revision">En Revisión</SelectItem>
                <SelectItem value="en_proceso">En Proceso</SelectItem>
                <SelectItem value="resuelto">Resuelto</SelectItem>
                <SelectItem value="archivado">Archivado</SelectItem>
                <SelectItem value="rechazado">Rechazado</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={(table.getColumn("prioridad")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) =>
                table.getColumn("prioridad")?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                <IconLayoutColumns className="size-4" />
                <span className="ml-2">Columnas</span>
                <IconChevronDown className="ml-auto size-4 lg:ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No se encontraron casos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} caso(s) seleccionado(s).
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Filas por página
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el caso{" "}
              <strong>{selectedCaso?.codigo}</strong> presentado por{" "}
              <strong>
                {selectedCaso?.reclamante.nombres} {selectedCaso?.reclamante.apellidoPaterno}
              </strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Estado Dialog */}
      <EditCasoEstadoDialog
        caso={selectedCaso}
        isOpen={isEditEstadoDialogOpen}
        onOpenChange={setIsEditEstadoDialogOpen}
        onSuccess={loadCasos}
      />

      {/* Edit Prioridad Dialog */}
      <EditCasoPrioridadDialog
        caso={selectedCaso}
        isOpen={isEditPrioridadDialogOpen}
        onOpenChange={setIsEditPrioridadDialogOpen}
        onSuccess={loadCasos}
      />

      {/* Asignar Caso Dialog */}
      <AsignarCasoDialog
        caso={selectedCaso}
        isOpen={isAsignarDialogOpen}
        onOpenChange={setIsAsignarDialogOpen}
        onSuccess={loadCasos}
      />
    </div>
  )
}
