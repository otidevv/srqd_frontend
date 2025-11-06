import { useState } from "react";
import { DashboardLayout } from "@/widgets/layout";
import { Card, Button } from "@/shared/ui";
import { getCasoByCodigo } from "@/shared/api/casos";
import type { Caso } from "@/entities/caso/model/types";
import { IconSearch, IconFileText } from "@tabler/icons-react";

const estadoLabels = {
  pendiente: 'Pendiente',
  en_revision: 'En Revisión',
  en_proceso: 'En Proceso',
  resuelto: 'Resuelto',
  archivado: 'Archivado',
  rechazado: 'Rechazado',
};

export function ConsultaPage() {
  const [codigo, setCodigo] = useState("");
  const [caso, setCaso] = useState<Caso | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigo.trim()) {
      setError("Por favor ingrese un código de caso");
      return;
    }

    setLoading(true);
    setError("");
    setCaso(null);

    try {
      const resultado = await getCasoByCodigo(codigo.trim().toUpperCase());

      if (resultado) {
        setCaso(resultado);
      } else {
        setError("No se encontró ningún caso con ese código");
      }
    } catch (err) {
      setError("Error al buscar el caso. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Consulta de Caso"
      subtitle="Ingrese el código de su caso para consultar el estado"
    >
      {/* Search Form */}
      <Card className="p-6 mb-6">
        <form onSubmit={handleBuscar} className="space-y-4">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium mb-2">
              Código de Caso
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              Ejemplo: REC-2025-0001, QUE-2025-0001, DEN-2025-0001
            </p>
            <div className="flex gap-3">
              <input
                id="codigo"
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="REC-2025-0001"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                <IconSearch className="size-4 mr-2" />
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </form>
      </Card>

      {/* Resultado */}
      {caso && (
        <Card className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <h2 className="text-2xl font-bold mb-2">{caso.codigo}</h2>
                <div className="flex gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      caso.tipo === 'denuncia'
                        ? 'bg-red-100 text-red-700'
                        : caso.tipo === 'queja'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {caso.tipo.charAt(0).toUpperCase() + caso.tipo.slice(1)}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded border font-medium ${
                      caso.estado === 'resuelto'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : caso.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}
                  >
                    {estadoLabels[caso.estado]}
                  </span>
                </div>
              </div>
              <IconFileText className="size-8 text-muted-foreground" />
            </div>

            {/* Información del Caso */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Información del Caso</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Fecha de Registro</dt>
                    <dd className="font-medium">
                      {new Date(caso.fechaCreacion).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Última Actualización</dt>
                    <dd className="font-medium">
                      {new Date(caso.fechaActualizacion).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </dd>
                  </div>
                  {caso.fechaLimite && (
                    <div>
                      <dt className="text-muted-foreground">Fecha Límite de Respuesta</dt>
                      <dd className="font-medium">
                        {new Date(caso.fechaLimite).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </dd>
                    </div>
                  )}
                  {caso.fechaResolucion && (
                    <div>
                      <dt className="text-muted-foreground">Fecha de Resolución</dt>
                      <dd className="font-medium">
                        {new Date(caso.fechaResolucion).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Estado del Proceso</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Estado Actual</dt>
                    <dd className="font-medium">{estadoLabels[caso.estado]}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Prioridad</dt>
                    <dd className="font-medium capitalize">{caso.prioridad}</dd>
                  </div>
                  {caso.asignadoNombre && (
                    <div>
                      <dt className="text-muted-foreground">Responsable</dt>
                      <dd className="font-medium">{caso.asignadoNombre}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Seguimiento */}
            {caso.seguimientos.filter(s => s.esVisible).length > 0 && (
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-4">Seguimiento del Caso</h3>
                <div className="space-y-4">
                  {caso.seguimientos
                    .filter(s => s.esVisible)
                    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                    .map((seguimiento) => (
                      <div
                        key={seguimiento.id}
                        className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{seguimiento.accion}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(seguimiento.fecha).toLocaleDateString('es-PE', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {seguimiento.comentario}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Por: {seguimiento.usuarioNombre}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Nota al pie */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Para más información sobre su caso, puede comunicarse con la Defensoría Universitaria al correo{" "}
                <a href="mailto:defensoria@unamad.edu.pe" className="text-primary hover:underline">
                  defensoria@unamad.edu.pe
                </a>{" "}
                o al teléfono{" "}
                <a href="tel:+51986092679" className="text-primary hover:underline">
                  +51 986 092 679
                </a>
              </p>
            </div>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}
