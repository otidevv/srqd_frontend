import { MapPin, Clock, Mail, FileText, Globe, Building2 } from 'lucide-react'

export function ChannelsSection() {
  return (
    <section
      id="canales-atencion"
      className="py-16 relative bg-background"
      style={{
        backgroundImage: 'url(/img/unamad/unamadprincipal.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">¿Cuáles son los canales de atención?</h2>
            <div className="h-1 w-24 bg-white mx-auto rounded-full"></div>
            <p className="text-white/90 mt-4 text-lg">
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
                <a
                  href="https://www.google.com/maps/place/Universidad+Nacional+Amaz%C3%B3nica+de+Madre+de+Dios,+Puerto+Maldonado+17001/@-12.5883528,-69.211589,17z/data=!4m15!1m8!3m7!1s0x917b49441850fe49:0x2881b0658744e313!2sUniversidad+Nacional+Amaz%C3%B3nica+de+Madre+de+Dios,+Puerto+Maldonado+17001!3b1!8m2!3d-12.5885658!4d-69.2095274!16s%2Fg%2F11hy9l896x!3m5!1s0x917b49441850fe49:0x2881b0658744e313!8m2!3d-12.5885658!4d-69.2095274!16s%2Fg%2F11hy9l896x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:bg-primary/5 p-3 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Ubicación</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      <strong>Oficina Ciudad Universitaria</strong>
                    </p>
                    <p className="text-muted-foreground text-sm mb-1">
                      Av. Jorge Chávez Nº 1160
                    </p>
                    <p className="text-muted-foreground text-sm mb-2">
                      2do Piso – Biblioteca, al costado del rectorado
                    </p>
                    <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:underline">
                      <MapPin className="h-3 w-3" />
                      Ver en Google Maps y trazar ruta
                    </span>
                  </div>
                </a>

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
                      <a
                        href="#formularios"
                        className="inline-block bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
                      >
                        Rellenar Formulario
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white border-l-4 border-primary rounded-lg p-6 shadow-lg">
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
