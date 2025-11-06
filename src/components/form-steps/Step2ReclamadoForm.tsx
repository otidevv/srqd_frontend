import { useForm } from 'react-hook-form'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Step2Props {
  formData: any
  onNext: (data: any) => void
  onPrevious: () => void
}

export function Step2ReclamadoForm({ formData, onNext, onPrevious }: Step2Props) {
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: formData
  })

  const rolReclamado = watch('rolReclamado')

  // Handle skipping this step (all fields are optional)
  const handleSkip = () => {
    // Don't pass any reclamado data if skipping
    onNext({})
  }

  // Clean up empty strings to avoid validation on optional fields
  const onSubmit = (data: any) => {
    const cleanedData: any = {}

    // Only include fields that have actual values (not empty strings)
    Object.keys(data).forEach(key => {
      const value = data[key]
      if (value !== '' && value !== null && value !== undefined) {
        cleanedData[key] = value
      }
    })

    // If no meaningful data was provided, skip this step
    if (Object.keys(cleanedData).length === 0) {
      handleSkip()
      return
    }

    onNext(cleanedData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
        <p className="text-sm font-semibold text-orange-700 mb-1">PASO 2: DATOS DEL RECLAMADO</p>
        <p className="text-xs text-muted-foreground">
          Información de la persona contra quien se presenta el caso. Si no conoce estos datos, puede dejarlos en blanco.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Rol del Reclamado</Label>
        <Select onValueChange={(value) => setValue('rolReclamado', value)} defaultValue={formData.rolReclamado}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="estudiante">Estudiante universitario</SelectItem>
            <SelectItem value="egresado">Egresado</SelectItem>
            <SelectItem value="docente">Docente universitario</SelectItem>
            <SelectItem value="administrativo">Personal administrativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nombres</Label>
          <Input {...register('nombresReclamado')} placeholder="Nombres" />
        </div>

        <div className="space-y-2">
          <Label>Sexo</Label>
          <Select onValueChange={(value) => setValue('sexoReclamado', value)} defaultValue={formData.sexoReclamado}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="femenino">Femenino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Apellido Paterno</Label>
          <Input {...register('apellidoPaternoReclamado')} />
        </div>

        <div className="space-y-2">
          <Label>Apellido Materno</Label>
          <Input {...register('apellidoMaternoReclamado')} />
        </div>

        <div className="space-y-2">
          <Label>Correo Electrónico (Opcional)</Label>
          <Input type="email" {...register('correoReclamado')} />
        </div>

        <div className="space-y-2">
          <Label>Celular (Opcional)</Label>
          <Input {...register('celularReclamado')} />
        </div>
      </div>

      {(rolReclamado === 'estudiante' || rolReclamado === 'egresado') && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Carrera Profesional</Label>
              <Select onValueChange={(value) => setValue('carreraReclamado', value)} defaultValue={formData.carreraReclamado}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administracion_negocios">Administración y Negocios Internacionales</SelectItem>
                  <SelectItem value="contabilidad_finanzas">Contabilidad y Finanzas</SelectItem>
                  <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                  <SelectItem value="derecho">Derecho y Ciencias Políticas</SelectItem>
                  <SelectItem value="educacion_matematicas">Educación Matemáticas y Computación</SelectItem>
                  <SelectItem value="educacion_primaria">Educación Primaria e Informática</SelectItem>
                  <SelectItem value="educacion_inicial">Educación Inicial y Especial</SelectItem>
                  <SelectItem value="enfermeria">Enfermería</SelectItem>
                  <SelectItem value="ingenieria_agroindustrial">Ingeniería Agroindustrial</SelectItem>
                  <SelectItem value="ingenieria_forestal">Ingeniería Forestal y Medio Ambiente</SelectItem>
                  <SelectItem value="ingenieria_sistemas">Ingeniería de Sistemas e Informática</SelectItem>
                  <SelectItem value="veterinaria">Medicina Veterinaria y Zootecnia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Código Universitario (Opcional)</Label>
              <Input {...register('codigoReclamado')} />
            </div>
          </div>
        </div>
      )}

      {rolReclamado === 'docente' && (
        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            <Label>Departamento Académico</Label>
            <Select onValueChange={(value) => setValue('departamentoReclamado', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sistemas">Sistemas</SelectItem>
                <SelectItem value="forestal">Forestal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {rolReclamado === 'administrativo' && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Oficina Administrativa</Label>
              <Input {...register('oficinaReclamado')} />
            </div>
            <div className="space-y-2">
              <Label>Cargo</Label>
              <Input {...register('cargoReclamado')} />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button type="submit" className="gap-2">
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
