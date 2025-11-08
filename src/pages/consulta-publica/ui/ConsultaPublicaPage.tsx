import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button } from "@/shared/ui";
import { getCasoByCodigo } from "@/shared/api/casos";
import type { Caso } from "@/entities/caso/model/types";
import { IconSearch, IconFileText, IconPaperclip, IconDownload, IconFile, IconFileTypePdf, IconPhoto } from "@tabler/icons-react";

const estadoLabels = {
  pendiente: 'Pendiente',
  en_revision: 'En Revisión',
  en_proceso: 'En Proceso',
  resuelto: 'Resuelto',
  archivado: 'Archivado',
  rechazado: 'Rechazado',
};

const categoriaLabels = {
  DOCUMENTO_IDENTIDAD: 'Documentos de Identidad',
  PRUEBA_DOCUMENTAL: 'Pruebas Documentales',
  PDF_GENERADO: 'Constancia del Caso',
  FIRMA_DIGITAL: 'Firma Digital',
};

// Helper para obtener icono según tipo de archivo
const getFileIcon = (tipo: string) => {
  if (tipo.includes('pdf')) return <IconFileTypePdf className="size-5 text-red-600" />;
  if (tipo.includes('image')) return <IconPhoto className="size-5 text-blue-600" />;
  return <IconFile className="size-5 text-gray-600" />;
};

// Helper para formatear tamaño de archivo
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export function ConsultaPublicaPage() {
  const [searchParams] = useSearchParams();
  const [codigo, setCodigo] = useState("");
  const [caso, setCaso] = useState<Caso | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar código desde query params si existe
  useEffect(() => {
    const codigoParam = searchParams.get("codigo");
    if (codigoParam) {
      setCodigo(codigoParam.toUpperCase());
      // Buscar automáticamente
      buscarCaso(codigoParam.toUpperCase());
    }
  }, [searchParams]);

  const buscarCaso = async (codigoBusqueda: string) => {
    if (!codigoBusqueda.trim()) {
      setError("Por favor ingrese un código de caso");
      return;
    }

    setLoading(true);
    setError("");
    setCaso(null);

    try {
      const resultado = await getCasoByCodigo(codigoBusqueda.trim().toUpperCase());

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

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    buscarCaso(codigo);
  };

  const handleDescargarArchivo = (archivoId: string, nombreArchivo: string) => {
    // Construir URL de descarga
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    const url = `${API_URL}/archivos/${archivoId}/download`;

    // Crear link temporal y hacer click
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Consulta de Seguimiento
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground">
              Ingrese el código de su caso para consultar el estado
            </p>
          </div>

          {/* Search Form */}
          <Card className="p-6 mb-6 shadow-lg">
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
            <Card className="p-6 shadow-lg">
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
                            className="p-4 bg-muted/50 rounded-lg space-y-3"
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

                            {/* Archivos adjuntos al seguimiento */}
                            {seguimiento.archivos && seguimiento.archivos.length > 0 && (
                              <div className="pl-4 border-l-2 border-primary/20">
                                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                  <IconPaperclip className="size-3" />
                                  Archivos adjuntos ({seguimiento.archivos.length})
                                </p>
                                <div className="space-y-2">
                                  {seguimiento.archivos.map((archivo) => (
                                    <div
                                      key={archivo.id}
                                      className="flex items-center gap-2 p-2 bg-background/80 rounded border hover:bg-background transition-colors"
                                    >
                                      <div className="flex-shrink-0">
                                        {getFileIcon(archivo.tipo)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">
                                          {archivo.nombre}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {formatFileSize(archivo.tamano)}
                                        </p>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDescargarArchivo(archivo.id, archivo.nombre)}
                                        className="flex-shrink-0 h-7 w-7 p-0"
                                      >
                                        <IconDownload className="size-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Archivos Adjuntos */}
                {caso.archivos && caso.archivos.length > 0 && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <IconPaperclip className="size-5" />
                      Documentos Adjuntos
                    </h3>
                    <div className="space-y-4">
                      {/* Agrupar archivos por categoría */}
                      {Object.entries(
                        caso.archivos.reduce((acc, archivo) => {
                          const categoria = archivo.categoria || 'OTROS';
                          if (!acc[categoria]) acc[categoria] = [];
                          acc[categoria].push(archivo);
                          return acc;
                        }, {} as Record<string, typeof caso.archivos>)
                      ).map(([categoria, archivos]) => (
                        <div key={categoria} className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            {categoriaLabels[categoria as keyof typeof categoriaLabels] || categoria}
                          </h4>
                          <div className="grid gap-2">
                            {archivos.map((archivo) => (
                              <div
                                key={archivo.id}
                                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex-shrink-0">
                                  {getFileIcon(archivo.tipo)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {archivo.nombre}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatFileSize(archivo.tamano)} • {new Date(archivo.fechaSubida).toLocaleDateString('es-PE')}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDescargarArchivo(archivo.id, archivo.nombre)}
                                  className="flex-shrink-0"
                                >
                                  <IconDownload className="size-4" />
                                </Button>
                              </div>
                            ))}
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
        </main>

        <Footer />
      </div>
    </div>
  );
}
