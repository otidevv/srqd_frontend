import { Scale, Users, FileText, Shield, UserCheck, Award } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="quienes-somos" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">¿Quiénes somos?</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Current Defensor Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src="/img/defensor/defendor_representante.jpg"
                      alt="Defensor Universitario"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1 text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-3">
                    <UserCheck className="h-4 w-4" />
                    <span className="text-xs font-semibold">DEFENSOR UNIVERSITARIO ACTUAL</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Mgt. Abg. DAVID SZCZCPANSKY GROBAS
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm opacity-90 flex items-center justify-center md:justify-start gap-2">
                      <Award className="h-4 w-4" />
                      Designado mediante Resolución de Consejo Universitario
                    </p>
                    <a
                      href="/img/defensor/Resolucion_Nro_113-2025-CU-UNAMAD.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 font-semibold px-4 py-2 rounded-lg transition-colors text-sm shadow-md"
                    >
                      <FileText className="h-4 w-4" />
                      Ver Resolución Nº 113-2025-CU-UNAMAD
                    </a>
                  </div>
                </div>

                {/* Decoration */}
                <div className="hidden lg:block">
                  <Award className="h-20 w-20 opacity-20 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Main Description */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Defensoría Universitaria
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  La <strong>DEFENSORÍA UNIVERSITARIA</strong> es la instancia encargada de la tutela
                  de los derechos de la comunidad universitaria (estudiantes, egresados, docentes y
                  personal administrativo) y vela por el mantenimiento del principio de autoridad responsable.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Es competente para conocer las denuncias y reclamaciones que formulen los miembros
                  de la comunidad universitaria vinculadas con la infracción de derechos individuales.
                  El Estatuto de la universidad establece los mecanismos de regulación y funcionamiento
                  de la Defensoría.
                </p>
              </div>

              {/* Defensor Role */}
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary">
                <div className="flex items-start gap-3 mb-4">
                  <UserCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <h4 className="text-xl font-semibold">El Defensor Universitario</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Es elegido por <strong>mayoría absoluta</strong> de los miembros de la Asamblea
                  Universitaria, su mandato es de <strong>tres (03) años</strong>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Su actuación se desarrolla bajo los principios de <strong>independencia</strong>,{' '}
                  <strong>autonomía</strong> y <strong>confidencialidad</strong>.
                </p>
              </div>

              {/* Creation Info */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-foreground">
                      La Dirección de Defensoría Universitaria fue creada el{' '}
                      <strong>05 de mayo del 2017</strong> y asumida por un docente de la
                      Universidad Nacional Amazónica de Madre de Dios, de acuerdo a la{' '}
                      <strong>RESOLUCIÓN N°010-2018-UNAMAD-AU</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Competencies */}
            <div className="space-y-6">
              {/* Functions */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Funciones del Defensor</h4>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Recibir y tramitar quejas y reclamos ante órganos de gobierno, tribunal de honor y servicios universitarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mediar y/o conciliar en la solución de desacuerdos y diferencias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Formular recomendaciones sobre asuntos de su conocimiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Promover iniciativas para mejorar la calidad, respeto de los derechos y libertades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Informar anualmente al Consejo Universitario de sus actividades</span>
                  </li>
                </ul>
              </div>

              {/* What we don't handle */}
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-destructive">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-destructive" />
                  <h4 className="text-xl font-semibold">Fuera de Nuestra Competencia</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  No son parte de la competencia de la Defensoría:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Denuncias vinculadas con derechos de carácter colectivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Derechos laborales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Medidas disciplinarias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Evaluaciones académicas de docentes y alumnos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Violaciones que puedan impugnarse por otras vías establecidas</span>
                  </li>
                </ul>
              </div>

              {/* Legal Reference */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">MARCO LEGAL</p>
                <p className="text-sm text-foreground">
                  Ley Universitaria, Ley N° 30220<br />
                  Capítulo XVI, Artículo 133
                </p>
              </div>
            </div>
          </div>

          {/* Stats or Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Comunidad Universitaria</h4>
              <p className="text-sm text-muted-foreground">
                Estudiantes, egresados, docentes y personal administrativo
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Tutela de Derechos</h4>
              <p className="text-sm text-muted-foreground">
                Protección de derechos individuales de la comunidad
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Autoridad Responsable</h4>
              <p className="text-sm text-muted-foreground">
                Velamos por el principio de autoridad responsable
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
