import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import {
  IconFileText,
  IconClock,
  IconChecks,
  IconAlertTriangle,
  IconSearch,
  IconPlus,
  IconChartBar,
  IconShield,
} from "@tabler/icons-react";
import { Button, Card } from "@/shared/ui";
import { DashboardLayout } from "@/widgets/layout";
import { getCasos, getCasoEstadisticas } from "@/shared/api/casos";
import type { Caso, CasoEstadisticas } from "@/entities/caso/model/types";
import { AnnouncementModal } from "@/components/publicaciones/AnnouncementModal";

const estadoLabels = {
  pendiente: 'Pendientes',
  en_revision: 'En Revisión',
  en_proceso: 'En Proceso',
  resuelto: 'Resueltos',
  archivado: 'Archivados',
  rechazado: 'Rechazados',
};

const prioridadColors = {
  baja: 'text-gray-600',
  media: 'text-blue-600',
  alta: 'text-orange-600',
  urgente: 'text-red-600',
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { branding } = UNIVERSITY_CONFIG;

  const [estadisticas, setEstadisticas] = useState<CasoEstadisticas | null>(null);
  const [casosRecientes, setCasosRecientes] = useState<Caso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [stats, casos] = await Promise.all([
          getCasoEstadisticas(),
          getCasos()
        ]);

        setEstadisticas(stats);
        // Ordenar por fecha más reciente y tomar los últimos 5
        setCasosRecientes(
          casos
            .sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime())
            .slice(0, 5)
        );
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const stats = estadisticas ? [
    {
      title: "Total Casos",
      value: estadisticas.total.toString(),
      subtitle: "Registrados",
      icon: IconFileText,
      color: branding.primaryColor,
    },
    {
      title: "Pendientes",
      value: estadisticas.porEstado.pendiente.toString(),
      subtitle: "Sin asignar",
      icon: IconClock,
      color: "#f59e0b",
    },
    {
      title: "En Proceso",
      value: (estadisticas.porEstado.en_revision + estadisticas.porEstado.en_proceso).toString(),
      subtitle: "Activos",
      icon: IconAlertTriangle,
      color: "#3b82f6",
    },
    {
      title: "Resueltos",
      value: estadisticas.porEstado.resuelto.toString(),
      subtitle: `Promedio ${estadisticas.promedioResolucionDias} días`,
      icon: IconChecks,
      color: "#10b981",
    },
  ] : [];

  if (loading) {
    return (
      <DashboardLayout
        title="Panel de Control"
        subtitle="Sistema de Registro de Reclamos, Quejas y Denuncias"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Cargando estadísticas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Panel de Control"
      subtitle="Sistema de Registro de Reclamos, Quejas y Denuncias"
    >
      {/* Modal de Anuncios */}
      <AnnouncementModal />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
                <Icon className="size-8 opacity-20" style={{ color: stat.color }} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Casos Recientes</h3>
          <div className="space-y-3">
            {casosRecientes.length > 0 ? (
              casosRecientes.map((caso) => (
                <div
                  key={caso.id}
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/casos/${caso.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{caso.codigo}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          caso.tipo === 'denuncia'
                            ? 'bg-red-100 text-red-700'
                            : caso.tipo === 'queja'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {caso.tipo.charAt(0).toUpperCase() + caso.tipo.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {caso.reclamante.nombres} {caso.reclamante.apellidoPaterno}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(caso.fechaCreacion).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-medium ${prioridadColors[caso.prioridad]}`}
                    >
                      {caso.prioridad}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hay casos registrados
              </p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/casos/nuevo")}
            >
              <IconPlus className="size-4 mr-2" />
              Registrar Nuevo Caso
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/casos")}
            >
              <IconFileText className="size-4 mr-2" />
              Ver Todos los Casos
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/consulta")}
            >
              <IconSearch className="size-4 mr-2" />
              Consultar por Código
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/estadisticas")}
            >
              <IconChartBar className="size-4 mr-2" />
              Ver Estadísticas
            </Button>
          </div>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="p-6 bg-muted/50">
        <div className="flex items-center gap-3">
          <IconShield
            className="size-8"
            style={{ color: branding.primaryColor }}
          />
          <div>
            <h4 className="font-semibold">Sistema SRQD - Defensoría Universitaria</h4>
            <p className="text-sm text-muted-foreground">
              Registro y seguimiento de Reclamos, Quejas y Denuncias. Protegiendo los derechos de la comunidad universitaria con respuesta en máximo 20 días hábiles.
            </p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
