import { Header } from '@/components/Header'
import { HeroSlider } from '@/components/HeroSlider'
import { AboutSection } from '@/components/AboutSection'
import { ChannelsSection } from '@/components/ChannelsSection'
import { DefinitionsSection } from '@/components/DefinitionsSection'
import { FormsSection } from '@/components/FormsSection'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { Footer } from '@/components/Footer'
import { AnnouncementModal } from '@/components/publicaciones/AnnouncementModal'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background overlay */}
      <div
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: 'url(/img/unamad/unamad.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        <Header />

      {/* Modal de Anuncios */}
      <AnnouncementModal />

      {/* Hero Slider */}
      <div id="inicio">
        <HeroSlider />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Channels Section */}
      <ChannelsSection />

      {/* Definitions Section */}
      <DefinitionsSection />

      {/* Forms Section */}
      <FormsSection />

      {/* Main Content */}
      <main id="como-ayudamos" className="container mx-auto px-4 py-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              ¿Cómo podemos ayudarte?
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Guía de Usuario */}
            <div className="rounded-lg border-2 border-primary/20 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center text-blue-900">Guía de Usuario</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center leading-relaxed">
                Aprende a registrar tu reclamo, queja o denuncia paso a paso.
              </p>
              <div className="text-center">
                <a
                  href="/pdf_bases_legales/formulario_fisico.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Leer Guía de Usuario
                </a>
              </div>
            </div>

            {/* Consulta de Seguimiento */}
            <div className="rounded-lg border-2 border-primary/20 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center" style={{ color: '#ed145b' }}>Consulta de Seguimiento</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center leading-relaxed">
                Coloca el código de seguimiento de tu reclamo, queja o denuncia para saber su estado de trámite.
              </p>
              <div className="text-center">
                <a
                  href="/consulta-publica"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Consultar
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Casos de Atención Section */}
      <section id="casos-atencion" className="container mx-auto px-4 py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Casos de Atención</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Atendemos casos sobre conductas indebidas que afectan la convivencia universitaria
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {/* Estudiante */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-blue-500">
              <div className="bg-blue-50 p-6 border-b">
                <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-blue-900">
                  Conductas Indebidas del Estudiante
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Las conductas indebidas son acciones u omisiones que contravienen el reglamento interno, los principios éticos y normas académicas. Ejemplos de estas conductas incluyen:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Plagio o suplantación en evaluaciones y trabajos académicos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Uso de términos o gestos inadecuados hacia docentes, compañeros o personal administrativo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Destrucción o daño intencional de bienes de la universidad.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Uso indebido de documentos o información académica.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Realizar actos de violencia, acoso o discriminación dentro del campus.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Consumir drogas o bebidas alcohólicas dentro de las instalaciones universitarias.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                    <span>Negarse a acatar disposiciones académicas o disciplinarias de la institución.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Docente */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-orange-500">
              <div className="bg-orange-50 p-6 border-b">
                <div className="h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="h-7 w-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-orange-900">
                  Conductas Indebidas del Docente Universitario
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Las acciones u omisiones que infringen los principios éticos y normativos pueden afectar la calidad educativa y la convivencia universitaria. Entre estas conductas indebidas se encuentran:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Actuar con negligencia en la enseñanza y supervisión de los estudiantes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Utilizar su posición de autoridad para obtener beneficios personales o académicos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Realizar acoso sexual, moral o psicológico contra estudiantes o colegas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Solicitar o aceptar dádivas a cambio de calificaciones o favores académicos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Demostrar favoritismo o discriminación en la evaluación y trato a los estudiantes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Incumplir normas de transparencia en la entrega de calificaciones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span>Realizar actividades políticas o comerciales dentro del horario de clases.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Personal Administrativo */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-green-500">
              <div className="bg-green-50 p-6 border-b">
                <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-green-900">
                  Conductas Indebidas del Personal Administrativo
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  El personal administrativo debe garantizar la eficiencia y transparencia en la gestión universitaria. Ejemplos de conductas indebidas incluyen:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Atender al público con términos o gestos inadecuados.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Retrasar injustificadamente trámites administrativos o solicitudes estudiantiles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Negarse a recibir documentos o registrarlos en el sistema correspondiente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Sustraer, falsificar o manipular documentos oficiales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Realizar cobros indebidos por trámites o servicios universitarios.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Actuar con negligencia en la atención de denuncias y reclamos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span>Usar los bienes y recursos de la universidad para fines personales.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base Legal Section */}
      <section id="base-legal" className="container mx-auto px-4 py-16 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Base Legal</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground">
              Documentos normativos y regulatorios de la Defensoría Universitaria
            </p>
          </div>

          {/* Documentos de la Defensoría */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documentos de la Defensoría Universitaria
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="/pdf_bases_legales/formulario_fisico.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      Formulario de Trámite de la Defensoría Universitaria
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Formato oficial para iniciar trámites ante la Defensoría
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </a>

              <a
                href="https://www.gob.pe/institucion/unamad/normas-legales/6185428-575-2024-unamad-cu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      Reglamento de la Defensoría Universitaria
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Normativa interna que regula el funcionamiento de la Defensoría
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Prevención y Atención del Hostigamiento Sexual */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Prevención y Atención del Hostigamiento Sexual
            </h3>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {/* Ley Nacional */}
              <a
                href="https://diariooficial.elperuano.pe/Normas/obtenerDocumento?idNorma=79"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 group-hover:text-red-600 transition-colors">
                      Ley N° 27942
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Ley de Prevención y Sanción del Hostigamiento Sexual
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>

              {/* Decreto Supremo */}
              <a
                href="https://www.unsa.edu.pe/wp-content/uploads/2020/10/Decreto-Supremo-N-014-2019-MIMP.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 group-hover:text-red-600 transition-colors">
                      Decreto Supremo N° 014-2019-MIMP
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Reglamento de la Ley N° 27942
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>

              {/* Resolución MINEDU */}
              <a
                href="https://www.unsa.edu.pe/wp-content/uploads/2020/10/RVM-N-294-2019-MINEDU.-Lineamientos-para-la-elaboracin-de-documentos-normativos-internos.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 group-hover:text-red-600 transition-colors">
                      Resolución Viceministerial N° 294-2019-MINEDU
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Lineamientos para la prevención e intervención en casos de hostigamiento sexual en universidades
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>

              {/* Reglamento UNAMAD */}
              <a
                href="https://www.gob.pe/institucion/unamad/informes-publicaciones/3980159-reglamento-de-prevencion-y-sancion-del-hostigamiento-sexual-de-la-unamad"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 group-hover:text-red-600 transition-colors">
                      Resolución de Consejo Universitario N° 530-2023-UNAMAD-CU
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Reglamento de Prevención y Sanción del Hostigamiento Sexual de la UNAMAD
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>

              {/* Plan Tolerancia Cero */}
              <a
                href="https://www.gob.pe/institucion/unamad/normas-legales/6005651-169-2024-unamad-r"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-5 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow group md:col-span-2 lg:col-span-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 group-hover:text-red-600 transition-colors">
                      Resolución Rectoral N° 169-2024-UNAMAD-R
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Plan de Trabajo Tolerancia Cero: Plan Integral de Acción Contra el Hostigamiento en la Comunidad Universitaria
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto y Consultas Section */}
      <section className="container mx-auto px-4 py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Canales de Contacto</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground">
              Comunícate con nosotros a través de los siguientes medios
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Correo Institucional */}
            <a
              href="mailto:defensoria@unamad.edu.pe"
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group text-center"
            >
              <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                Correo Institucional
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Envíanos tu consulta por email
              </p>
              <p className="text-sm font-medium text-blue-600">
                defensoria@unamad.edu.pe
              </p>
            </a>

            {/* WhatsApp/Consultas */}
            <a
              href="https://wa.me/51986092679"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group text-center"
            >
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                Canal de Consultas
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Contáctanos por WhatsApp
              </p>
              <p className="text-sm font-medium text-green-600">
                986 092 679
              </p>
            </a>

            {/* Formulario Físico */}
            <a
              href="/pdf_bases_legales/formulario_fisico.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                Formulario Físico
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Descarga el Anexo 1
              </p>
              <p className="text-sm font-medium text-primary">
                Descargar PDF
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
      </div>
    </div>
  )
}

export default App
