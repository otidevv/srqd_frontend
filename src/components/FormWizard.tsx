import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Step1ReclamanteForm } from './form-steps/Step1ReclamanteForm'
import { Step2ReclamadoForm } from './form-steps/Step2ReclamadoForm'
import { Step3DescripcionForm } from './form-steps/Step3DescripcionForm'
import { Step4PruebasForm } from './form-steps/Step4PruebasForm'
import { createCaso } from '@/shared/api/casos'
import { generateAndDownloadCasoPDF } from '@/lib/generateCasoPDF' // PDF with both logos
import { toast } from 'sonner'

type FormType = 'reclamo' | 'queja' | 'denuncia'

interface FormWizardProps {
  formType: FormType
  isOpen: boolean
  onClose: () => void
}

export function FormWizard({ formType, isOpen, onClose }: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [trackingCode, setTrackingCode] = useState<string>('')

  const totalSteps = 4

  const formTypeConfig = {
    reclamo: {
      title: 'RECLAMO',
      color: 'blue',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    queja: {
      title: 'QUEJA',
      color: 'orange',
      bgColor: 'bg-orange-500',
      textColor: 'text-orange-500'
    },
    denuncia: {
      title: 'DENUNCIA',
      color: 'red',
      bgColor: 'bg-red-500',
      textColor: 'text-red-500'
    }
  }

  const config = formTypeConfig[formType]

  const stepTitles = [
    'Datos del Reclamante',
    'Datos del Reclamado',
    'Descripción de los Hechos',
    'Adjuntar Pruebas'
  ]

  const handleNext = (stepData: any) => {
    setFormData({ ...formData, ...stepData })
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async (finalData: any) => {
    const completeData = { ...formData, ...finalData, tipo: formType }

    setIsSubmitting(true)

    try {
      console.log('=== Iniciando envío del formulario ===')
      console.log('Datos completos:', completeData)

      // Show creating caso toast
      toast.loading('Creando caso...', { id: 'creating-caso' })

      // Crear el caso usando la API
      console.log('Llamando a createCaso...')
      const result = await createCaso(completeData)
      console.log('Resultado de createCaso:', result)

      // Dismiss creating toast and show success
      toast.dismiss('creating-caso')
      toast.success('Caso creado exitosamente')

      // If createCaso succeeds, it returns the result object
      if (!result.caso || !result.codigo) {
        throw new Error('Error al crear el caso: respuesta incompleta del servidor')
      }

      // Guardar el código de seguimiento
      setTrackingCode(result.codigo)
      console.log('Código de seguimiento:', result.codigo)

      // Generar y descargar el PDF con la firma
      console.log('Generando PDF...')
      console.log('Firma base64:', finalData.firmaBase64 ? 'Presente' : 'No presente')
      console.log('Archivo firma:', finalData.archivoFirma ? finalData.archivoFirma.name : 'No presente')

      const pdfData = await generateAndDownloadCasoPDF(
        result.caso,
        finalData.firmaBase64,
        finalData.archivoFirma
      )

      console.log('PDF generado exitosamente')

      // Subir el PDF al servidor también
      console.log('Subiendo PDF al servidor...')
      const { uploadFile } = await import('@/shared/api/archivos')
      const pdfFile = new File([pdfData.blob], pdfData.filename, { type: 'application/pdf' })
      const uploadResult = await uploadFile(result.caso.id, pdfFile)

      if (uploadResult.success) {
        console.log('PDF subido exitosamente al servidor')
        console.log('El servidor enviará la constancia por correo automáticamente si el usuario autorizó')
      } else {
        console.error('Error al subir PDF:', uploadResult.error)
      }

      // Mostrar pantalla de éxito
      setSubmitSuccess(true)

    } catch (error: any) {
      console.error('=== Error en handleFinish ===')
      console.error('Error completo:', error)

      // Parse validation errors from backend
      let errorMessage = 'Error al enviar el formulario'

      if (error?.response?.data?.message) {
        // Backend validation errors
        const backendMessage = error.response.data.message

        if (Array.isArray(backendMessage)) {
          // Multiple validation errors
          errorMessage = 'Errores de validación:'
          backendMessage.forEach((msg: string, index: number) => {
            const cleanMsg = msg.replace(/^(reclamante\.|reclamado\.)/, '')
            if (index < 5) { // Show max 5 errors
              toast.error(cleanMsg, { duration: 5000 })
            }
          })

          if (backendMessage.length > 5) {
            toast.error(`Y ${backendMessage.length - 5} errores más...`, { duration: 5000 })
          }
        } else if (typeof backendMessage === 'string') {
          errorMessage = backendMessage
          toast.error(errorMessage, { duration: 5000 })
        }
      } else if (error?.message) {
        errorMessage = error.message
        toast.error(errorMessage, { duration: 5000 })
      } else {
        toast.error('Error desconocido al enviar el formulario', { duration: 5000 })
      }

      console.error('Mensaje de error:', errorMessage)
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Reset states
    setCurrentStep(1)
    setFormData({})
    setIsSubmitting(false)
    setSubmitSuccess(false)
    setTrackingCode('')
    onClose()
  }

  const renderStep = () => {
    const commonProps = {
      formData,
      onNext: handleNext,
      onPrevious: handlePrevious
    }

    switch (currentStep) {
      case 1:
        return <Step1ReclamanteForm {...commonProps} />
      case 2:
        return <Step2ReclamadoForm {...commonProps} />
      case 3:
        return <Step3DescripcionForm {...commonProps} />
      case 4:
        return <Step4PruebasForm {...commonProps} onFinish={handleFinish} />
      default:
        return null
    }
  }

  // Renderizar pantalla de éxito
  if (submitSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl p-0 gap-0">
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-2">
              ¡Formulario Enviado Exitosamente!
            </h2>

            <p className="text-muted-foreground mb-6">
              Su {formType} ha sido registrado correctamente en el sistema.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                Código de Seguimiento
              </p>
              <p className="text-3xl font-bold text-blue-600 mb-3 font-mono">
                {trackingCode}
              </p>
              <p className="text-xs text-blue-800">
                Guarde este código para consultar el estado de su caso
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-yellow-900 mb-2">
                📋 Próximos Pasos
              </p>
              <ul className="text-xs text-yellow-800 space-y-1 list-disc list-inside">
                <li>El PDF con su {formType} se ha descargado automáticamente</li>
                <li>Recibirá una confirmación por correo electrónico</li>
                <li>Puede consultar el estado usando el código de seguimiento</li>
                <li>La Defensoría se pondrá en contacto en un plazo máximo de 20 días hábiles</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  window.location.href = '/consulta'
                }}
                variant="outline"
                className="flex-1"
              >
                Consultar Estado
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Finalizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className={`${config.bgColor} text-white p-6 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">
                Registro de {config.title}
              </DialogTitle>
              <p className="text-sm opacity-90">
                Paso {currentStep} de {totalSteps}: {stepTitles[currentStep - 1]}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </DialogHeader>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
