import { AlertCircle, MessageSquareWarning, ShieldAlert, Clock } from 'lucide-react'

export function DefinitionsSection() {
  return (
    <section id="diferencias-rqd" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              ¿Sabes cuál es la diferencia entre un Reclamo, una Queja y una Denuncia?
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Es importante conocer las diferencias para presentar tu caso correctamente
            </p>
          </div>

          {/* Definitions Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* RECLAMO */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">RECLAMO</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Expresión de <strong>insatisfacción relacionada directamente con los servicios
                  prestados por la universidad</strong>, cuando el reclamante considera que ha sido
                  tratado de manera injusta o inadecuada.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <p className="text-xs font-semibold">
                      Plazo de atención: máximo 20 días hábiles
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Ejemplo:</strong> Insatisfacción con la atención recibida en un servicio universitario.
                  </p>
                </div>
              </div>
            </div>

            {/* QUEJA */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30">
                    <MessageSquareWarning className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">QUEJA</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Manifestación de <strong>disconformidad, malestar o insatisfacción</strong> respecto
                  a defectos, demoras o irregularidades ocurridas durante la tramitación de un
                  procedimiento administrativo, que se expresa en la paralización o infracción de
                  los plazos legalmente establecidos.
                </p>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-orange-900">
                    <strong>Requisito:</strong> Haber agotado todas las vías disponibles para
                    obtener una solución.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <p className="text-xs font-semibold">
                      Plazo de atención: máximo 20 días hábiles
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Ejemplo:</strong> Demora excesiva en la tramitación de un certificado.
                  </p>
                </div>
              </div>
            </div>

            {/* DENUNCIA */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30">
                    <ShieldAlert className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">DENUNCIA</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Comunicación formal mediante la cual se pone en conocimiento del defensor
                  universitario <strong>hechos que podrían constituir una vulneración de derechos
                  individuales</strong> reconocidos en la normativa aplicable y los reglamentos de
                  la UNAMAD.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-red-900">
                    <strong>Requisito:</strong> Los hechos no deben estar siendo tramitados por
                    otro órgano administrativo competente.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <p className="text-xs font-semibold">
                      Plazo de atención: máximo 20 días hábiles*
                    </p>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    *Si requiere más tiempo, se comunicará previamente al recurrente.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Ejemplo:</strong> Vulneración de derechos individuales durante un proceso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
              <h3 className="text-xl font-bold text-center">Comparación Rápida</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Aspecto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Reclamo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-orange-700">Queja</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-700">Denuncia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">Se refiere a</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Servicios prestados</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Procedimientos administrativos</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Vulneración de derechos</td>
                  </tr>
                  <tr className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">Naturaleza</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Insatisfacción con atención</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Defectos o demoras</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Infracción normativa</td>
                  </tr>
                  <tr className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">Plazo de atención</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-700">20 días hábiles</td>
                    <td className="px-6 py-4 text-sm font-semibold text-orange-700">20 días hábiles</td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-700">20 días hábiles*</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <button className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
              Presentar mi caso ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
