import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, ChevronRight, Loader2 } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

// Validación de archivo con tamaño y tipo
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

const step1Schema = z.object({
  rolReclamante: z.string({
    required_error: 'Debe seleccionar un rol',
    invalid_type_error: 'Debe seleccionar un rol'
  }).min(1, 'Debe seleccionar un rol'),
  tipoDocumento: z.string({
    required_error: 'Debe seleccionar un tipo de documento',
    invalid_type_error: 'Debe seleccionar un tipo de documento'
  }).min(1, 'Debe seleccionar un tipo de documento'),
  numeroDocumento: z.string({
    required_error: 'El número de documento es obligatorio',
    invalid_type_error: 'El número de documento debe ser texto'
  }).min(8, 'El número de documento debe tener al menos 8 caracteres'),
  nombres: z.string({
    required_error: 'Los nombres son obligatorios',
    invalid_type_error: 'Los nombres deben ser texto'
  }).min(1, 'Los nombres son obligatorios'),
  apellidoPaterno: z.string({
    required_error: 'El apellido paterno es obligatorio',
    invalid_type_error: 'El apellido paterno debe ser texto'
  }).min(1, 'El apellido paterno es obligatorio'),
  apellidoMaterno: z.string({
    required_error: 'El apellido materno es obligatorio',
    invalid_type_error: 'El apellido materno debe ser texto'
  }).min(1, 'El apellido materno es obligatorio'),
  sexo: z.string({
    required_error: 'Debe seleccionar el sexo',
    invalid_type_error: 'Debe seleccionar el sexo'
  }).min(1, 'Debe seleccionar el sexo'),
  celular: z.string({
    required_error: 'El celular es obligatorio',
    invalid_type_error: 'El celular debe ser texto'
  }).min(9, 'El celular debe tener al menos 9 dígitos'),
  domicilio: z.string({
    required_error: 'El domicilio es obligatorio',
    invalid_type_error: 'El domicilio debe ser texto'
  }).min(1, 'El domicilio es obligatorio'),
  correo: z.string({
    required_error: 'El correo electrónico es obligatorio',
    invalid_type_error: 'El correo electrónico debe ser texto'
  }).email('El correo electrónico no es válido'),
  autorizacionCorreo: z.boolean().refine((val) => val === true, {
    message: 'Debe autorizar la notificación por correo electrónico'
  }),
  documentoIdentidad: z.any()
    .refine((files) => files?.length > 0, 'Debe adjuntar su documento de identidad')
    .refine((files) => {
      if (!files || files.length === 0) return true
      return files[0]?.size <= MAX_FILE_SIZE
    }, 'El archivo debe ser menor a 5MB')
    .refine((files) => {
      if (!files || files.length === 0) return true
      return ACCEPTED_FILE_TYPES.includes(files[0]?.type)
    }, 'Solo se permiten archivos PDF, JPG o PNG'),
  // Campos condicionales
  carreraProfesional: z.string(),
  codigoUniversitario: z.string(),
  semestreEgreso: z.string(),
  facultad: z.string(),
  departamentoAcademico: z.string(),
  oficinaAdministrativa: z.string(),
  cargo: z.string(),
}).refine((data) => {
  // Validar campos según el rol
  if (data.rolReclamante === 'estudiante' || data.rolReclamante === 'egresado') {
    if (!data.carreraProfesional || data.carreraProfesional === '') {
      return false
    }
  }
  return true
}, {
  message: 'La carrera profesional es obligatoria',
  path: ['carreraProfesional']
}).refine((data) => {
  // Validar código universitario para estudiantes
  if (data.rolReclamante === 'estudiante') {
    if (!data.codigoUniversitario || data.codigoUniversitario === '') {
      return false
    }
  }
  return true
}, {
  message: 'El código universitario es obligatorio',
  path: ['codigoUniversitario']
}).refine((data) => {
  // Validar semestre de egreso para egresados
  if (data.rolReclamante === 'egresado') {
    if (!data.semestreEgreso || data.semestreEgreso === '') {
      return false
    }
  }
  return true
}, {
  message: 'El semestre de egreso es obligatorio',
  path: ['semestreEgreso']
}).refine((data) => {
  // Validar facultad para docentes
  if (data.rolReclamante === 'docente') {
    if (!data.facultad || data.facultad === '') {
      return false
    }
  }
  return true
}, {
  message: 'La facultad es obligatoria',
  path: ['facultad']
}).refine((data) => {
  // Validar departamento académico para docentes
  if (data.rolReclamante === 'docente') {
    if (!data.departamentoAcademico || data.departamentoAcademico === '') {
      return false
    }
  }
  return true
}, {
  message: 'El departamento académico es obligatorio',
  path: ['departamentoAcademico']
}).refine((data) => {
  // Validar oficina administrativa para administrativos
  if (data.rolReclamante === 'administrativo') {
    if (!data.oficinaAdministrativa || data.oficinaAdministrativa === '') {
      return false
    }
  }
  return true
}, {
  message: 'La oficina administrativa es obligatoria',
  path: ['oficinaAdministrativa']
}).refine((data) => {
  // Validar cargo para administrativos
  if (data.rolReclamante === 'administrativo') {
    if (!data.cargo || data.cargo === '') {
      return false
    }
  }
  return true
}, {
  message: 'El cargo es obligatorio',
  path: ['cargo']
})

interface Step1Props {
  formData: any
  onNext: (data: any) => void
}

export function Step1ReclamanteForm({ formData, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    mode: 'onChange', // Validar en cada cambio
    defaultValues: {
      rolReclamante: formData.rolReclamante || '',
      tipoDocumento: formData.tipoDocumento || '',
      numeroDocumento: formData.numeroDocumento || '',
      nombres: formData.nombres || '',
      apellidoPaterno: formData.apellidoPaterno || '',
      apellidoMaterno: formData.apellidoMaterno || '',
      sexo: formData.sexo || '',
      celular: formData.celular || '',
      domicilio: formData.domicilio || '',
      correo: formData.correo || '',
      autorizacionCorreo: formData.autorizacionCorreo || false,
      documentoIdentidad: formData.documentoIdentidad || undefined,
      carreraProfesional: formData.carreraProfesional || '',
      codigoUniversitario: formData.codigoUniversitario || '',
      semestreEgreso: formData.semestreEgreso || '',
      facultad: formData.facultad || '',
      departamentoAcademico: formData.departamentoAcademico || '',
      oficinaAdministrativa: formData.oficinaAdministrativa || '',
      cargo: formData.cargo || '',
    }
  })

  const rolReclamante = watch('rolReclamante')
  const autorizacionCorreo = watch('autorizacionCorreo')
  const tipoDocumento = watch('tipoDocumento')
  const numeroDocumento = watch('numeroDocumento')
  const sexo = watch('sexo')
  const [fileError, setFileError] = useState<string | null>(null)
  const [consultandoDNI, setConsultandoDNI] = useState(false)
  const [dniConsultado, setDniConsultado] = useState<string | null>(null)
  const [mostrarMensajeConsultado, setMostrarMensajeConsultado] = useState(false)

  // Validar archivo cuando cambia
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]

      // Validar tamaño
      if (file.size > MAX_FILE_SIZE) {
        setFileError('El archivo debe ser menor a 5MB')
        toast.error('Archivo muy grande', {
          description: `El archivo pesa ${(file.size / 1024 / 1024).toFixed(2)}MB. El tamaño máximo es 5MB.`
        })
        e.target.value = '' // Limpiar el input
        return
      }

      // Validar tipo
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setFileError('Solo se permiten archivos PDF, JPG o PNG')
        toast.error('Tipo de archivo no permitido', {
          description: 'Solo se permiten archivos PDF, JPG o PNG'
        })
        e.target.value = '' // Limpiar el input
        return
      }

      setFileError(null)
    }
  }

  // Consultar DNI en la API (usando proxy del backend)
  const consultarDNI = async (dni: string) => {
    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
      return
    }

    setConsultandoDNI(true)
    try {
      const response = await fetch(`http://localhost:3000/api/dni/consulta/${dni}`)

      if (!response.ok) {
        throw new Error('DNI no encontrado')
      }

      const result = await response.json()
      const data = result.data

      // Autocompletar campos
      setValue('nombres', data.nombres || '')
      setValue('apellidoPaterno', data.apellidoPaterno || '')
      setValue('apellidoMaterno', data.apellidoMaterno || '')

      // Dirección (domicilio)
      if (data.direccion) {
        setValue('domicilio', data.direccion)
      }

      // Sexo: "1" = Masculino, "2" = Femenino
      const sexo = data.sexo === '2' ? 'femenino' : data.sexo === '1' ? 'masculino' : ''
      if (sexo) {
        setValue('sexo', sexo)
        trigger('sexo')
      }

      // Disparar validación de los campos completados
      trigger(['nombres', 'apellidoPaterno', 'apellidoMaterno', 'domicilio'])

      // Marcar como consultado y mostrar mensaje
      setDniConsultado(dni)
      setMostrarMensajeConsultado(true)

      toast.success('DNI consultado', {
        description: `Datos de ${data.nombres} ${data.apellidoPaterno} cargados correctamente`
      })
    } catch (error) {
      toast.error('DNI no encontrado', {
        description: 'No se pudo consultar el DNI. Verifique el número ingresado.'
      })
      setMostrarMensajeConsultado(false)
    } finally {
      setConsultandoDNI(false)
    }
  }

  // Efecto para resetear el mensaje cuando cambia el DNI
  useEffect(() => {
    if (numeroDocumento !== dniConsultado) {
      setMostrarMensajeConsultado(false)
    }
  }, [numeroDocumento])

  // Efecto para detectar cuando se completa el DNI
  useEffect(() => {
    // Solo consultar si:
    // 1. Es tipo DNI
    // 2. Tiene 8 dígitos
    // 3. No se ha consultado este DNI antes
    if (
      tipoDocumento === 'dni' &&
      numeroDocumento &&
      numeroDocumento.length === 8 &&
      numeroDocumento !== dniConsultado
    ) {
      consultarDNI(numeroDocumento)
    }
  }, [tipoDocumento, numeroDocumento])

  const onSubmit = (data: any) => {
    onNext(data)
  }

  const onError = (errors: any) => {
    // Mostrar el primer error encontrado con toast
    const errorKeys = Object.keys(errors)
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0]
      const firstError = errors[firstErrorKey]

      toast.error('Formulario incompleto', {
        description: firstError?.message || 'Por favor complete todos los campos obligatorios'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
        <p className="text-sm font-semibold text-primary mb-1">PASO 1: DATOS DEL RECLAMANTE</p>
        <p className="text-xs text-muted-foreground">
          Complete todos los campos marcados con * (obligatorios)
        </p>
      </div>

      {/* Rol del Reclamante */}
      <div className="space-y-2">
        <Label htmlFor="rolReclamante">
          Rol del Reclamante <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={(value) => {
            setValue('rolReclamante', value)
            trigger('rolReclamante')
          }}
          defaultValue={formData.rolReclamante}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione su rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="estudiante">Estudiante universitario</SelectItem>
            <SelectItem value="egresado">Egresado</SelectItem>
            <SelectItem value="docente">Docente universitario</SelectItem>
            <SelectItem value="administrativo">Personal administrativo</SelectItem>
            <SelectItem value="externo">Otro externo</SelectItem>
          </SelectContent>
        </Select>
        {errors.rolReclamante && (
          <p className="text-sm text-red-500">{errors.rolReclamante.message as string}</p>
        )}
      </div>

      {/* Grid de 2 columnas para campos comunes */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Tipo de Documento */}
        <div className="space-y-2">
          <Label htmlFor="tipoDocumento">
            Tipo de Documento <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => {
              setValue('tipoDocumento', value)
              trigger('tipoDocumento')
            }}
            defaultValue={formData.tipoDocumento}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dni">DNI</SelectItem>
              <SelectItem value="carnet_extranjeria">Carnet de Extranjería</SelectItem>
              <SelectItem value="pasaporte">Pasaporte</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipoDocumento && (
            <p className="text-sm text-red-500">{errors.tipoDocumento.message as string}</p>
          )}
        </div>

        {/* Número de Documento */}
        <div className="space-y-2">
          <Label htmlFor="numeroDocumento">
            Número de Documento <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="numeroDocumento"
              {...register('numeroDocumento')}
              placeholder="Ej: 12345678"
              maxLength={tipoDocumento === 'dni' ? 8 : 20}
            />
            {consultandoDNI && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            )}
          </div>
          {tipoDocumento === 'dni' && !consultandoDNI && mostrarMensajeConsultado && (
            <p className="text-xs text-green-600">✓ DNI consultado automáticamente</p>
          )}
          {errors.numeroDocumento && (
            <p className="text-sm text-red-500">{errors.numeroDocumento.message as string}</p>
          )}
        </div>

        {/* Nombres */}
        <div className="space-y-2">
          <Label htmlFor="nombres">
            Nombres <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombres"
            {...register('nombres')}
            placeholder="Nombres completos"
          />
          {errors.nombres && (
            <p className="text-sm text-red-500">{errors.nombres.message as string}</p>
          )}
        </div>

        {/* Sexo */}
        <div className="space-y-2">
          <Label htmlFor="sexo">
            Sexo <span className="text-red-500">*</span>
          </Label>
          <Select
            value={sexo}
            onValueChange={(value) => {
              setValue('sexo', value)
              trigger('sexo')
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="femenino">Femenino</SelectItem>
            </SelectContent>
          </Select>
          {errors.sexo && (
            <p className="text-sm text-red-500">{errors.sexo.message as string}</p>
          )}
        </div>

        {/* Apellido Paterno */}
        <div className="space-y-2">
          <Label htmlFor="apellidoPaterno">
            Apellido Paterno <span className="text-red-500">*</span>
          </Label>
          <Input
            id="apellidoPaterno"
            {...register('apellidoPaterno')}
            placeholder="Apellido paterno"
          />
          {errors.apellidoPaterno && (
            <p className="text-sm text-red-500">{errors.apellidoPaterno.message as string}</p>
          )}
        </div>

        {/* Apellido Materno */}
        <div className="space-y-2">
          <Label htmlFor="apellidoMaterno">
            Apellido Materno <span className="text-red-500">*</span>
          </Label>
          <Input
            id="apellidoMaterno"
            {...register('apellidoMaterno')}
            placeholder="Apellido materno"
          />
          {errors.apellidoMaterno && (
            <p className="text-sm text-red-500">{errors.apellidoMaterno.message as string}</p>
          )}
        </div>

        {/* Celular */}
        <div className="space-y-2">
          <Label htmlFor="celular">
            Celular <span className="text-red-500">*</span>
          </Label>
          <Input
            id="celular"
            {...register('celular')}
            placeholder="999999999"
          />
          {errors.celular && (
            <p className="text-sm text-red-500">{errors.celular.message as string}</p>
          )}
        </div>

        {/* Domicilio */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="domicilio">
            Domicilio <span className="text-red-500">*</span>
          </Label>
          <Input
            id="domicilio"
            {...register('domicilio')}
            placeholder="Dirección completa"
          />
          {errors.domicilio && (
            <p className="text-sm text-red-500">{errors.domicilio.message as string}</p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="correo">
            Correo Electrónico <span className="text-red-500">*</span>
          </Label>
          <Input
            id="correo"
            type="email"
            {...register('correo')}
            placeholder="ejemplo@correo.com"
          />
          {errors.correo && (
            <p className="text-sm text-red-500">{errors.correo.message as string}</p>
          )}
        </div>
      </div>

      {/* Checkbox Autorización */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="autorizacionCorreo"
          checked={autorizacionCorreo}
          onCheckedChange={(checked) => {
            setValue('autorizacionCorreo', checked as boolean)
            trigger('autorizacionCorreo')
          }}
        />
        <Label
          htmlFor="autorizacionCorreo"
          className="text-sm font-normal leading-tight cursor-pointer"
        >
          Autorizo ser notificado a través del correo electrónico <span className="text-red-500">*</span>
        </Label>
      </div>
      {errors.autorizacionCorreo && (
        <p className="text-sm text-red-500">{errors.autorizacionCorreo.message as string}</p>
      )}

      {/* Documento de Identidad */}
      <div className="space-y-2">
        <Label htmlFor="documentoIdentidad">
          Adjuntar Documento de Identidad <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-4">
          <Input
            id="documentoIdentidad"
            type="file"
            {...register('documentoIdentidad', {
              onChange: handleFileChange
            })}
            accept=".pdf,.jpg,.jpeg,.png"
            className="cursor-pointer"
          />
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">Formatos permitidos: PDF, JPG, PNG (máx. 5MB)</p>
        {/* Mostrar archivo previamente seleccionado si existe */}
        {formData.documentoIdentidad && formData.documentoIdentidad.length > 0 && (
          <p className="text-xs text-green-600">
            ✓ Archivo cargado: {formData.documentoIdentidad[0]?.name || 'Documento seleccionado'}
          </p>
        )}
        {(errors.documentoIdentidad || fileError) && (
          <p className="text-sm text-red-500">
            {(errors.documentoIdentidad?.message as string) || fileError}
          </p>
        )}
      </div>

      {/* Campos Condicionales según el Rol */}
      {(rolReclamante === 'estudiante' || rolReclamante === 'egresado') && (
        <div className="border-t pt-4 space-y-4">
          <p className="text-sm font-semibold text-primary">Información Académica</p>

          {/* Carrera Profesional - Campo completo para evitar desbordamiento */}
          <div className="space-y-2">
            <Label>
              Carrera Profesional <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => {
                setValue('carreraProfesional', value)
                trigger('carreraProfesional')
              }}
              defaultValue={formData.carreraProfesional}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione carrera" />
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
            {errors.carreraProfesional && (
              <p className="text-sm text-red-500">{errors.carreraProfesional.message as string}</p>
            )}
          </div>

          {/* Código Universitario o Semestre de Egreso - Fila separada */}
          {rolReclamante === 'estudiante' && (
            <div className="space-y-2">
              <Label>
                Código Universitario <span className="text-red-500">*</span>
              </Label>
              <Input {...register('codigoUniversitario')} placeholder="Ej: 202012345" />
              {errors.codigoUniversitario && (
                <p className="text-sm text-red-500">{errors.codigoUniversitario.message as string}</p>
              )}
            </div>
          )}
          {rolReclamante === 'egresado' && (
            <div className="space-y-2">
              <Label>
                Semestre de Egreso <span className="text-red-500">*</span>
              </Label>
              <Input {...register('semestreEgreso')} placeholder="Ej: 2023-I" />
              {errors.semestreEgreso && (
                <p className="text-sm text-red-500">{errors.semestreEgreso.message as string}</p>
              )}
            </div>
          )}
        </div>
      )}

      {rolReclamante === 'docente' && (
        <div className="border-t pt-4 space-y-4">
          <p className="text-sm font-semibold text-primary">Información Académica</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Facultad <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue('facultad', value)
                  trigger('facultad')
                }}
                defaultValue={formData.facultad}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione facultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingenieria">Facultad de Ingeniería</SelectItem>
                  <SelectItem value="educacion">Facultad de Educación</SelectItem>
                  <SelectItem value="derecho">Facultad de Derecho</SelectItem>
                </SelectContent>
              </Select>
              {errors.facultad && (
                <p className="text-sm text-red-500">{errors.facultad.message as string}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>
                Departamento Académico <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue('departamentoAcademico', value)
                  trigger('departamentoAcademico')
                }}
                defaultValue={formData.departamentoAcademico}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sistemas">Sistemas e Informática</SelectItem>
                  <SelectItem value="forestal">Forestal y Medio Ambiente</SelectItem>
                  <SelectItem value="derecho">Derecho y Ciencias Políticas</SelectItem>
                </SelectContent>
              </Select>
              {errors.departamentoAcademico && (
                <p className="text-sm text-red-500">{errors.departamentoAcademico.message as string}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {rolReclamante === 'administrativo' && (
        <div className="border-t pt-4 space-y-4">
          <p className="text-sm font-semibold text-primary">Información Laboral</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Oficina Administrativa <span className="text-red-500">*</span>
              </Label>
              <Input {...register('oficinaAdministrativa')} placeholder="Nombre de la oficina" />
              {errors.oficinaAdministrativa && (
                <p className="text-sm text-red-500">{errors.oficinaAdministrativa.message as string}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>
                Cargo <span className="text-red-500">*</span>
              </Label>
              <Input {...register('cargo')} placeholder="Su cargo actual" />
              {errors.cargo && (
                <p className="text-sm text-red-500">{errors.cargo.message as string}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" className="gap-2">
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
