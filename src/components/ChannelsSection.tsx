import { MapPin, Clock, Mail, FileText, Globe, Building2 } from 'lucide-react'

export function ChannelsSection() {
  return (
    <section id="canales-atencion" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">¿Cuáles son los canales de atención?</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4">
              Ponemos a tu disposición diferentes canales para atender tus consultas
            </p>
          </div>

          {/* Channels Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* PRESENCIAL */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-primary">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8" />
                  <div>
                    <h3 className="text-2xl font-bold">PRESENCIAL</h3>
                    <p className="text-sm opacity-90">Visítanos en nuestras oficinas</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">Ubicación</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      <strong>Oficina Ciudad Universitaria</strong>
                    </p>
                    <p className="text-muted-foreground text-sm mb-1">
                      Av. Jorge Chávez Nº 1160
                    </p>
                    <p className="text-muted-foreground text-sm">
                      2do Piso – Biblioteca, al costado del rectorado
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">Horario de Atención</h4>
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-sm">LUNES A VIERNES</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">Turno mañana:</span> 8:00 am - 1:00 pm
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Turno tarde:</span> 3:00 pm - 6:00 pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NO PRESENCIAL */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-primary">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8" />
                  <div>
                    <h3 className="text-2xl font-bold">NO PRESENCIAL</h3>
                    <p className="text-sm opacity-90">Atención remota disponible</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Option 1 - Email */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        OPCIÓN 1
                      </span>
                      <h4 className="font-semibold text-lg">Correo Electrónico</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete el Formulario físico (Anexo 01), disponible en el Reglamento
                      General de la Defensoría Universitaria. Escanee y adjunte los documentos
                      exigidos conforme al Artículo 29°.
                    </p>
                    <a
                      href="mailto:defensoria@unamad.edu.pe"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      defensoria@unamad.edu.pe
                    </a>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  {/* Option 2 - RQD System */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                          OPCIÓN 2
                        </span>
                        <h4 className="font-semibold text-lg">Sistema RQD</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Registre su reclamo, queja o denuncia a través del Sistema RQD
                        (Registro de Quejas, Reclamos y Denuncias).
                      </p>
                      <button className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg">
                        Acceder al Sistema RQD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div className="text-sm text-foreground">
                <p className="font-semibold mb-2">Importante:</p>
                <p className="text-muted-foreground">
                  Para la atención por correo electrónico, es indispensable adjuntar toda la
                  documentación requerida según el Artículo 29° del Reglamento General de la
                  Defensoría Universitaria. El Formulario físico (Anexo 01) está disponible en
                  el reglamento oficial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
