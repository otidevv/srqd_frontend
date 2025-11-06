import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronLeft, Upload, Smartphone, FileText, Pen, Eraser, Check } from 'lucide-react'
import SignatureCanvas from 'react-signature-canvas'
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

interface Step4Props {
  formData: any
  onPrevious: () => void
  onFinish: (data: any) => void
}

export function Step4PruebasForm({ formData, onPrevious, onFinish }: Step4Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: formData
  })

  const confirmacionDatos = watch('confirmacionDatos')
  const dispositivo = watch('dispositivo')
  const firmaWatch = watch('firma')
  const [pruebasFiles, setPruebasFiles] = useState<FileList | null>(null)
  const [firmaFile, setFirmaFile] = useState<File | null>(null)
  const [firmaBase64, setFirmaBase64] = useState<string | null>(null)
  const [firmaConfirmada, setFirmaConfirmada] = useState(false)
  const signatureRef = useRef<SignatureCanvas>(null)

  const usaTouchScreen = dispositivo === 'tablet' || dispositivo === 'movil'

  // Constantes de validación
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB por archivo
  const MAX_TOTAL_SIZE = 25 * 1024 * 1024 // 25MB total (límite seguro, backend soporta 50MB)
  const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

  // Validar archivos de pruebas
  const handlePruebasFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const invalidFiles: string[] = []
      const validFiles: File[] = []
      let totalSize = 0

      Array.from(files).forEach(file => {
        // Validar tamaño individual
        if (file.size > MAX_FILE_SIZE) {
          invalidFiles.push(`${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB - excede 5MB por archivo)`)
          return
        }

        // Validar tipo
        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
          invalidFiles.push(`${file.name} (tipo no permitido)`)
          return
        }

        validFiles.push(file)
        totalSize += file.size
      })

      // Validar tamaño total
      if (totalSize > MAX_TOTAL_SIZE) {
        toast.error('Demasiados archivos', {
          description: `El tamaño total es ${(totalSize / 1024 / 1024).toFixed(2)}MB. El límite total es 25MB. Por favor, selecciona menos archivos.`
        })
        e.target.value = ''
        return
      }

      // Mostrar errores si hay archivos inválidos
      if (invalidFiles.length > 0) {
        toast.error('Archivos rechazados', {
          description: invalidFiles.join(', ')
        })
      }

      // Si hay archivos válidos, actualizarlos
      if (validFiles.length > 0) {
        const dataTransfer = new DataTransfer()
        validFiles.forEach(file => dataTransfer.items.add(file))
        setPruebasFiles(dataTransfer.files)
        setValue('pruebas', dataTransfer.files)

        toast.success('Archivos cargados', {
          description: `${validFiles.length} archivo${validFiles.length > 1 ? 's' : ''} válido${validFiles.length > 1 ? 's' : ''} (${(totalSize / 1024 / 1024).toFixed(2)}MB total)`
        })
      } else {
        // Si todos fueron rechazados, limpiar el input
        e.target.value = ''
      }
    }
  }

  // Validar archivo de firma
  const handleFirmaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tamaño
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Archivo muy grande', {
          description: `La firma pesa ${(file.size / 1024 / 1024).toFixed(2)}MB. El tamaño máximo es 5MB.`
        })
        e.target.value = ''
        return
      }

      // Validar tipo (solo imágenes para firma)
      const FIRMA_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
      if (!FIRMA_TYPES.includes(file.type)) {
        toast.error('Tipo de archivo no permitido', {
          description: 'Solo se permiten imágenes JPG o PNG para la firma'
        })
        e.target.value = ''
        return
      }

      setFirmaFile(file)
      setValue('firma', e.target.files)
      toast.success('Firma cargada correctamente')
    }
  }

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setFirmaBase64(null)
      setFirmaConfirmada(false)
    }
  }

  const handleConfirmSignature = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const dataUrl = signatureRef.current.toDataURL()
      setFirmaBase64(dataUrl)
      setFirmaConfirmada(true)
      toast.success('Firma confirmada correctamente')
    } else {
      toast.error('Firma requerida', {
        description: 'Por favor, dibuje su firma antes de confirmar'
      })
    }
  }

  const onSubmit = (data: any) => {
    if (!confirmacionDatos) {
      toast.error('Confirmación requerida', {
        description: 'Debe confirmar que los datos son correctos'
      })
      return
    }

    // Verificar firma según dispositivo
    if (usaTouchScreen && !firmaConfirmada) {
      toast.error('Firma sin confirmar', {
        description: 'Debe confirmar su firma antes de enviar'
      })
      return
    }

    if (!usaTouchScreen && !firmaFile && (!firmaWatch || (firmaWatch as FileList).length === 0)) {
      toast.error('Firma requerida', {
        description: 'Debe adjuntar su firma antes de enviar'
      })
      return
    }

    // Agregar archivos y firma al data
    const finalData = {
      ...data,
      archivoPruebas: pruebasFiles,
      archivoFirma: usaTouchScreen ? null : (firmaFile || (firmaWatch && (firmaWatch as FileList)[0])),
      firmaBase64: usaTouchScreen ? firmaBase64 : null
    }

    onFinish(finalData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <p className="text-sm font-semibold text-green-700 mb-1">PASO 4: ADJUNTAR PRUEBAS Y FIRMA</p>
        <p className="text-xs text-muted-foreground">
          Último paso - Adjunte las pruebas documentales y su firma
        </p>
      </div>

      {/* Adjuntar Pruebas (Archivos) */}
      <div className="space-y-2">
        <Label htmlFor="pruebas">
          Adjuntar Pruebas Documentales <span className="text-red-500">*</span>
        </Label>
        <div
          className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => document.getElementById('pruebas')?.click()}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-primary hover:text-primary/80">
                Haga clic para seleccionar archivos
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                o arrastre y suelte aquí
              </p>
            </div>
            <Input
              id="pruebas"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
              onChange={handlePruebasFilesChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {pruebasFiles && pruebasFiles.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs font-semibold mb-3 text-center text-green-700">
                ✓ {pruebasFiles.length} archivo{pruebasFiles.length > 1 ? 's' : ''} seleccionado{pruebasFiles.length > 1 ? 's' : ''}
              </p>
              <div className="space-y-2">
                {Array.from(pruebasFiles).map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded p-2">
                    <FileText className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-green-900 truncate">{file.name}</p>
                      <p className="text-xs text-green-700">Tamaño: {(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Formatos permitidos: PDF, JPG, PNG, DOC, DOCX (máx. 5MB por archivo, 25MB total)
        </p>
        {errors.pruebas && (
          <p className="text-sm text-red-500">{errors.pruebas.message as string}</p>
        )}
      </div>

      {/* Dispositivo para Firma */}
      <div className="space-y-2">
        <Label htmlFor="dispositivo">
          ¿Qué Dispositivo Está Usando? <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <Select
            onValueChange={(value) => setValue('dispositivo', value)}
            defaultValue={formData.dispositivo}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione su dispositivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pc">PC de Escritorio</SelectItem>
              <SelectItem value="laptop">Laptop/Notebook</SelectItem>
              <SelectItem value="tablet">Tablet (con pantalla táctil)</SelectItem>
              <SelectItem value="movil">Teléfono Móvil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground">
          Esto determina cómo proporcionará su firma
        </p>
        {errors.dispositivo && (
          <p className="text-sm text-red-500">{errors.dispositivo.message as string}</p>
        )}
      </div>

      {/* Firma - Condicional según dispositivo */}
      {dispositivo && (
        <div className="space-y-3 border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Pen className="h-5 w-5 text-primary" />
            <Label className="text-base font-semibold">Firma Digital</Label>
          </div>

          {usaTouchScreen ? (
            // Para tablet/móvil - Firma digital con interfaz táctil
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">✍️ Firma con Pantalla Táctil</p>
              <p className="text-xs text-blue-800 mb-4">
                Dibuje su firma en el recuadro usando su dedo o stylus
              </p>
              <div className="bg-white border-2 border-blue-300 rounded-lg overflow-hidden">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: 'w-full h-48 cursor-crosshair',
                    style: { touchAction: 'none' }
                  }}
                  backgroundColor="white"
                  penColor="black"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearSignature}
                  className="flex-1 gap-2"
                >
                  <Eraser className="h-4 w-4" />
                  Limpiar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmSignature}
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  disabled={firmaConfirmada}
                >
                  <Check className="h-4 w-4" />
                  {firmaConfirmada ? 'Firma Confirmada' : 'Confirmar Firma'}
                </Button>
              </div>
              {firmaConfirmada && (
                <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded text-center">
                  <p className="text-xs text-green-800 font-medium">✓ Firma capturada correctamente</p>
                </div>
              )}
            </div>
          ) : (
            // Para PC/Laptop - Subir imagen de firma
            <div className="space-y-2">
              <Label htmlFor="firma">
                Cargar Imagen de Firma <span className="text-red-500">*</span>
              </Label>
              <div
                className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('firma')?.click()}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Pen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-primary hover:text-primary/80">
                      Haga clic para seleccionar imagen de firma
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Firma escaneada o fotografiada
                    </p>
                  </div>
                  <Input
                    id="firma"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFirmaFileChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {firmaFile && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs font-semibold mb-3 text-center text-green-700">✓ Firma seleccionada</p>
                    <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded p-3">
                      <FileText className="h-4 w-4 text-green-600" />
                      <div className="text-left">
                        <p className="text-xs font-medium text-green-900">{firmaFile.name}</p>
                        <p className="text-xs text-green-700">Tamaño: {(firmaFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    {/* Vista previa de la imagen */}
                    <div className="mt-3 border-2 border-green-200 rounded-lg p-2 bg-white">
                      <img
                        src={URL.createObjectURL(firmaFile)}
                        alt="Vista previa de firma"
                        className="max-h-24 mx-auto"
                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                      />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Formatos permitidos: JPG, PNG (fondo blanco preferiblemente)
              </p>
              {errors.firma && (
                <p className="text-sm text-red-500">{errors.firma.message as string}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Confirmación de Datos */}
      <div className="border-t pt-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Antes de finalizar</p>
          <p className="text-xs text-yellow-800">
            Por favor revise cuidadosamente todos los datos ingresados. Una vez enviado el formulario,
            no podrá modificar la información. El equipo de la Defensoría Universitaria se pondrá en
            contacto con usted en un plazo máximo de 20 días hábiles.
          </p>
        </div>

        <div className="flex items-start space-x-3 bg-white border-2 border-primary/20 rounded-lg p-4">
          <Checkbox
            id="confirmacionDatos"
            checked={confirmacionDatos}
            onCheckedChange={(checked) => setValue('confirmacionDatos', checked as boolean)}
            className="mt-1"
          />
          <Label
            htmlFor="confirmacionDatos"
            className="text-sm font-medium leading-tight cursor-pointer"
          >
            Confirmo que todos los datos ingresados son correctos y veraces. Entiendo que proporcionar
            información falsa puede resultar en el rechazo de mi caso.{' '}
            <span className="text-red-500">*</span>
          </Label>
        </div>
        {!confirmacionDatos && (
          <p className="text-xs text-muted-foreground mt-2">
            Debe confirmar que los datos son correctos para continuar
          </p>
        )}
      </div>

      {/* Resumen */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm font-semibold text-primary mb-2">📋 Resumen de su caso:</p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Tipo:</strong> {formData.formType?.toUpperCase()}</p>
          <p><strong>Reclamante:</strong> {formData.nombres} {formData.apellidoPaterno}</p>
          <p><strong>Correo:</strong> {formData.correo}</p>
          <p><strong>Celular:</strong> {formData.celular}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 gap-2 px-8"
          disabled={!confirmacionDatos}
        >
          Finalizar y Enviar
        </Button>
      </div>
    </form>
  )
}
