import { useState } from 'react'
import { AlertCircle, MessageSquareWarning, ShieldAlert, FileText } from 'lucide-react'
import { FormWizard } from './FormWizard'

type FormType = 'reclamo' | 'queja' | 'denuncia' | null

export function FormsSection() {
  const [selectedForm, setSelectedForm] = useState<FormType>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFormSelect = (type: FormType) => {
    setSelectedForm(type)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedForm(null)
  }

  return (
    <section
      id="formularios"
      className="py-16 relative bg-background"
      style={{
        backgroundImage: 'url(/img/unamad/pabellonb.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">SISTEMA DE REGISTRO</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Formularios de Registro
            </h2>
            <div className="h-1 w-24 bg-white mx-auto rounded-full mb-4"></div>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Selecciona el tipo de caso que deseas registrar en nuestro sistema
            </p>
          </div>

          {/* Form Type Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* RECLAMO */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500 hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30 group-hover:scale-110 transition-transform">
                    <AlertCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">RECLAMO</h3>
                  <p className="text-sm opacity-90">
                    Insatisfacción con servicios universitarios
                  </p>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Atención inadecuada o injusta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Problemas con servicios prestados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Atención en 20 días hábiles</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleFormSelect('reclamo')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Registrar Reclamo
                </button>
              </div>
            </div>

            {/* QUEJA */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-500 hover:scale-105">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30 group-hover:scale-110 transition-transform">
                    <MessageSquareWarning className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">QUEJA</h3>
                  <p className="text-sm opacity-90">
                    Disconformidad con trámites administrativos
                  </p>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Demoras o irregularidades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Paralización de procedimientos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Atención en 20 días hábiles</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleFormSelect('queja')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Registrar Queja
                </button>
              </div>
            </div>

            {/* DENUNCIA */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-red-500 hover:scale-105">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">DENUNCIA</h3>
                  <p className="text-sm opacity-90">
                    Vulneración de derechos individuales
                  </p>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>Infracción de derechos individuales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>Hechos según normativa UNAMAD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>Atención en 20 días hábiles</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleFormSelect('denuncia')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Registrar Denuncia
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-white border-l-4 border-primary rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-2">Antes de comenzar:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Ten a mano tu documento de identidad en formato digital</li>
                  <li>• Prepara la descripción detallada de los hechos</li>
                  <li>• Prepara las pruebas documentales que respalden tu caso (PDF, imágenes)</li>
                  <li>• El proceso toma aproximadamente 10-15 minutos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Wizard Dialog */}
      {selectedForm && (
        <FormWizard
          formType={selectedForm}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </section>
  )
}
