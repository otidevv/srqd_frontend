import * as React from "react"
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
  IconPlus,
  IconEdit,
  IconTrash,
  IconBuilding,
  IconMapPin,
  IconPhone,
  IconMail,
  IconUser,
  IconCheck,
  IconX,
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { toast } from 'sonner'

import { type Sede, type CreateSedeDTO, type UpdateSedeDTO } from "@/entities/sede"
import { sedesApi } from "@/shared/api"
import { SedeForm } from "./SedeForm"

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon" className="text-muted-foreground size-7 hover:bg-transparent">
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<Sede>[] = [
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
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <IconBuilding className="size-4 text-muted-foreground" />
          <span className="font-medium">{row.original.nombre}</span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
    cell: ({ row }) => (
      <div className="text-sm max-w-[200px] truncate" title={row.original.direccion}>
        {row.original.direccion || <span className="text-muted-foreground">Sin dirección</span>}
      </div>
    ),
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <IconPhone className="size-3 text-muted-foreground" />
        <span>{row.original.telefono || <span className="text-muted-foreground">Sin teléfono</span>}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <IconMail className="size-3 text-muted-foreground" />
        <span>{row.original.email || <span className="text-muted-foreground">Sin email</span>}</span>
      </div>
    ),
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={row.original.activo ? "default" : "outline"}>
        {row.original.activo ? <IconCheck className="size-3 mr-1" /> : <IconX className="size-3 mr-1" />}
        {row.original.activo ? "Activa" : "Inactiva"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const sede = row.original
      const meta = table.options.meta as any

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => meta?.onEditSede?.(sede)}>
              <IconEdit className="size-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => meta?.onDeleteSede?.(sede)}>
              <IconTrash className="size-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function DraggableRow({ row }: { row: Row<Sede> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{ transform: CSS.Transform.toString(transform), transition: transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function SedesDataTable() {
  const [data, setData] = React.useState<Sede[]>([])
  const [loading, setLoading] = React.useState(true)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const sortableId = React.useId()
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [selectedSede, setSelectedSede] = React.useState<Sede | null>(null)

  const loadSedes = React.useCallback(async () => {
    setLoading(true)
    try {
      const sedes = await sedesApi.getSedes()
      setData(sedes)
    } catch (error) {
      console.error("Error loading sedes:", error)
      toast.error("Error al cargar sedes", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadSedes()
  }, [loadSedes])

  // CRUD Handlers
  const handleCreateSede = async (data: CreateSedeDTO) => {
    try {
      await sedesApi.createSede(data)
      setIsCreateDialogOpen(false)
      await loadSedes()
      toast.success("Sede creada exitosamente", {
        description: `La sede ${data.name} ha sido creada correctamente`
      })
    } catch (error) {
      console.error("Error creating sede:", error)
      toast.error("Error al crear sede", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
      throw error
    }
  }

  const handleEditSede = (sede: Sede) => {
    setSelectedSede(sede)
    setIsEditDialogOpen(true)
  }

  const handleUpdateSede = async (data: UpdateSedeDTO) => {
    if (!selectedSede) return
    try {
      await sedesApi.updateSede(selectedSede.id, data)
      setIsEditDialogOpen(false)
      setSelectedSede(null)
      await loadSedes()
      toast.success("Sede actualizada exitosamente", {
        description: `La sede ha sido actualizada correctamente`
      })
    } catch (error) {
      console.error("Error updating sede:", error)
      toast.error("Error al actualizar sede", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
      throw error
    }
  }

  const handleDeleteClick = (sede: Sede) => {
    setSelectedSede(sede)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedSede) return
    try {
      await sedesApi.deleteSede(selectedSede.id)
      setIsDeleteDialogOpen(false)
      setSelectedSede(null)
      await loadSedes()
      toast.success("Sede eliminada exitosamente", {
        description: `La sede ${selectedSede.name} ha sido eliminada`
      })
    } catch (error) {
      console.error("Error deleting sede:", error)
      toast.error("Error al eliminar sede", {
        description: (error as any).message || "Ocurrió un error inesperado"
      })
    }
  }

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
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
      onEditSede: handleEditSede,
      onDeleteSede: handleDeleteClick,
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

  if (loading) return <div className="flex items-center justify-center py-12"><p className="text-muted-foreground">Cargando sedes...</p></div>

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input placeholder="Buscar por nombre..." value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("nombre")?.setFilterValue(event.target.value)} className="max-w-sm" />
          <Select value={(table.getColumn("activo")?.getFilterValue() as string) ?? "all"} onValueChange={(value) => table.getColumn("activo")?.setFilterValue(value === "all" ? "" : value === "true")}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filtrar por estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="true">Activas</SelectItem>
              <SelectItem value="false">Inactivas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><IconLayoutColumns /><span className="hidden lg:inline">Columnas</span><IconChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>{column.id}</DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}><IconPlus /><span className="hidden lg:inline">Nueva Sede</span></Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors} id={sortableId}>
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row) => (<DraggableRow key={row.id} row={row} />))}
                </SortableContext>
              ) : (
                <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No se encontraron sedes.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">{table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} sede(s) seleccionada(s).</div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">Filas por página</Label>
            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger size="sm" className="w-20" id="rows-per-page"><SelectValue placeholder={table.getState().pagination.pageSize} /></SelectTrigger>
              <SelectContent side="top">{[10, 20, 30, 40, 50].map((pageSize) => (<SelectItem key={pageSize} value={`${pageSize}`}>{pageSize}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}><span className="sr-only">Go to first page</span><IconChevronsLeft /></Button>
            <Button variant="outline" className="size-8" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><span className="sr-only">Go to previous page</span><IconChevronLeft /></Button>
            <Button variant="outline" className="size-8" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><span className="sr-only">Go to next page</span><IconChevronRight /></Button>
            <Button variant="outline" className="hidden size-8 lg:flex" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}><span className="sr-only">Go to last page</span><IconChevronsRight /></Button>
          </div>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nueva Sede</DialogTitle>
            <DialogDescription>
              Ingresa los datos de la nueva sede
            </DialogDescription>
          </DialogHeader>
          <SedeForm
            onSubmit={handleCreateSede}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Sede</DialogTitle>
            <DialogDescription>
              Modifica los datos de la sede
            </DialogDescription>
          </DialogHeader>
          {selectedSede && (
            <SedeForm
              sede={selectedSede}
              onSubmit={handleUpdateSede}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setSelectedSede(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará la sede{" "}
              <span className="font-semibold">{selectedSede?.name}</span> permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedSede(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
