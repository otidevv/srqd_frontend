import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/widgets/layout';
import { Card } from '@/shared/ui';
import {
  IconChartBar,
  IconTrendingUp,
  IconFileCheck,
  IconClock,
  IconCheckbox,
} from '@tabler/icons-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getCasoEstadisticas } from '@/shared/api/casos';
import type { CasoEstadisticas } from '@/entities/caso/model/types';

export function StatsPage() {
  const [stats, setStats] = useState<CasoEstadisticas | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getCasoEstadisticas();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Estadísticas y Reportes"
        subtitle="Análisis y métricas del sistema SRQD"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <IconChartBar className="size-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Cargando estadísticas...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!stats) {
    return (
      <DashboardLayout
        title="Estadísticas y Reportes"
        subtitle="Análisis y métricas del sistema SRQD"
      >
        <Card className="p-8">
          <div className="text-center text-muted-foreground">
            No hay datos disponibles
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  // Preparar datos para gráficos
  const datosPorTipo = [
    { nombre: 'Reclamos', cantidad: stats.porTipo.reclamo, fill: '#3b82f6' },
    { nombre: 'Quejas', cantidad: stats.porTipo.queja, fill: '#f59e0b' },
    { nombre: 'Denuncias', cantidad: stats.porTipo.denuncia, fill: '#ef4444' },
  ];

  const datosPorEstado = [
    { nombre: 'Pendiente', cantidad: stats.porEstado.pendiente, fill: '#94a3b8' },
    { nombre: 'En Revisión', cantidad: stats.porEstado.en_revision, fill: '#3b82f6' },
    { nombre: 'En Proceso', cantidad: stats.porEstado.en_proceso, fill: '#f59e0b' },
    { nombre: 'Resuelto', cantidad: stats.porEstado.resuelto, fill: '#10b981' },
    { nombre: 'Archivado', cantidad: stats.porEstado.archivado, fill: '#6b7280' },
    { nombre: 'Rechazado', cantidad: stats.porEstado.rechazado, fill: '#ef4444' },
  ];

  const datosPorPrioridad = [
    { nombre: 'Baja', cantidad: stats.porPrioridad.baja, fill: '#10b981' },
    { nombre: 'Media', cantidad: stats.porPrioridad.media, fill: '#3b82f6' },
    { nombre: 'Alta', cantidad: stats.porPrioridad.alta, fill: '#f59e0b' },
    { nombre: 'Urgente', cantidad: stats.porPrioridad.urgente, fill: '#ef4444' },
  ];

  return (
    <DashboardLayout
      title="Estadísticas y Reportes"
      subtitle="Análisis y métricas del sistema SRQD"
    >
      <div className="space-y-6">
        {/* Tarjetas de Resumen */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Casos
                </p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <IconChartBar className="size-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Casos Resueltos
                </p>
                <p className="text-3xl font-bold">{stats.casosResueltos}</p>
              </div>
              <IconFileCheck className="size-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tasa de Resolución
                </p>
                <p className="text-3xl font-bold">{stats.tasaResolucion.toFixed(1)}%</p>
              </div>
              <IconCheckbox className="size-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Promedio Resolución
                </p>
                <p className="text-3xl font-bold">{stats.promedioResolucionDias}</p>
                <p className="text-xs text-muted-foreground">días</p>
              </div>
              <IconClock className="size-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Gráfico de Tendencia Mensual */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Tendencia Mensual de Casos</h3>
              <p className="text-sm text-muted-foreground">
                Últimos 12 meses
              </p>
            </div>
            <IconTrendingUp className="size-6 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.datosMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="mes"
                style={{ fontSize: '12px' }}
              />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="registrados"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Registrados"
              />
              <Line
                type="monotone"
                dataKey="resueltos"
                stroke="#10b981"
                strokeWidth={2}
                name="Resueltos"
              />
              <Line
                type="monotone"
                dataKey="pendientes"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Pendientes"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráficos de Barras */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Por Tipo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Casos por Tipo</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={datosPorTipo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Por Estado */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Casos por Estado</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={datosPorEstado}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="nombre"
                  style={{ fontSize: '10px' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Por Prioridad */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Casos por Prioridad</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={datosPorPrioridad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tabla de Resumen */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resumen Detallado</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                Por Tipo
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Reclamos:</span>
                  <span className="font-medium">{stats.porTipo.reclamo}</span>
                </li>
                <li className="flex justify-between">
                  <span>Quejas:</span>
                  <span className="font-medium">{stats.porTipo.queja}</span>
                </li>
                <li className="flex justify-between">
                  <span>Denuncias:</span>
                  <span className="font-medium">{stats.porTipo.denuncia}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                Por Estado
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Pendientes:</span>
                  <span className="font-medium">{stats.porEstado.pendiente}</span>
                </li>
                <li className="flex justify-between">
                  <span>En Revisión:</span>
                  <span className="font-medium">{stats.porEstado.en_revision}</span>
                </li>
                <li className="flex justify-between">
                  <span>En Proceso:</span>
                  <span className="font-medium">{stats.porEstado.en_proceso}</span>
                </li>
                <li className="flex justify-between">
                  <span>Resueltos:</span>
                  <span className="font-medium">{stats.porEstado.resuelto}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                Por Prioridad
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Baja:</span>
                  <span className="font-medium">{stats.porPrioridad.baja}</span>
                </li>
                <li className="flex justify-between">
                  <span>Media:</span>
                  <span className="font-medium">{stats.porPrioridad.media}</span>
                </li>
                <li className="flex justify-between">
                  <span>Alta:</span>
                  <span className="font-medium">{stats.porPrioridad.alta}</span>
                </li>
                <li className="flex justify-between">
                  <span>Urgente:</span>
                  <span className="font-medium">{stats.porPrioridad.urgente}</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
