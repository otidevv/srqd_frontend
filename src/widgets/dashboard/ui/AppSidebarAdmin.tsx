import {
  IconAdjustments,
  IconBuildingBank,
  IconCalendarEvent,
  IconChartBar,
  IconChartLine,
  IconChevronRight,
  IconCloud,
  IconCreditCard,
  IconDashboard,
  IconDatabase,
  IconDeviceDesktop,
  IconFingerprint,
  IconHistory,
  IconKey,
  IconLock,
  IconMapPin,
  IconPlugConnected,
  IconSchool,
  IconServer,
  IconSettings,
  IconShieldCheck,
  IconUsers,
  IconWorldWww,
} from "@tabler/icons-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui/sidebar'
import { useTenant } from '@/app/providers/TenantProvider'
import { NavUser } from './NavUser'

/**
 * AppSidebarAdmin - Sidebar para el Sistema Central/Master
 * Este dashboard es usado por super admins para gestionar toda la plataforma
 */
export function AppSidebarAdmin() {
  const { tenant } = useTenant()
  const { branding, content } = tenant

  // Módulo: Gestión de Instituciones
  const institucionesSubmodulos = [
    { title: "Lista de Colegios", icon: IconSchool, url: "/admin/institutions" },
    { title: "Crear Nueva Institución", icon: IconBuildingBank, url: "/admin/institutions/new" },
    { title: "Configurar Subdominios", icon: IconWorldWww, url: "/admin/subdomains" },
    { title: "Branding y Temas", icon: IconAdjustments, url: "/admin/branding" },
    { title: "Planes y Suscripciones", icon: IconCreditCard, url: "/admin/subscriptions" },
    { title: "Estados y Activación", icon: IconShieldCheck, url: "/admin/institutions/status" },
  ]

  // Módulo: Dispositivos ZKTeco (Biométricos)
  const zktecoSubmodulos = [
    { title: "Dispositivos Registrados", icon: IconFingerprint, url: "/admin/devices" },
    { title: "Registrar Nuevo Dispositivo", icon: IconPlugConnected, url: "/admin/devices/new" },
    { title: "Asignar a Institución", icon: IconMapPin, url: "/admin/devices/assign" },
    { title: "Estado de Conexión", icon: IconServer, url: "/admin/devices/status" },
    { title: "Configuración de API", icon: IconSettings, url: "/admin/devices/config" },
    { title: "Logs de Sincronización", icon: IconHistory, url: "/admin/devices/logs" },
  ]

  // Módulo: Monitoreo Global
  const monitoreoSubmodulos = [
    { title: "Dashboard Consolidado", icon: IconChartBar, url: "/admin/monitoring/dashboard" },
    { title: "Métricas por Institución", icon: IconChartLine, url: "/admin/monitoring/metrics" },
    { title: "Asistencia en Tiempo Real", icon: IconFingerprint, url: "/admin/monitoring/attendance" },
    { title: "Uso de Recursos", icon: IconServer, url: "/admin/monitoring/resources" },
    { title: "Alertas y Notificaciones", icon: IconShieldCheck, url: "/admin/monitoring/alerts" },
  ]

  // Módulo: Usuarios y Accesos
  const usuariosSubmodulos = [
    { title: "Super Administradores", icon: IconShieldCheck, url: "/admin/users/super-admins" },
    { title: "Admins por Institución", icon: IconUsers, url: "/admin/users/institution-admins" },
    { title: "Roles y Permisos", icon: IconKey, url: "/admin/users/roles" },
    { title: "Auditoría de Accesos", icon: IconHistory, url: "/admin/users/audit" },
  ]

  // Módulo: Integraciones
  const integracionesSubmodulos = [
    { title: "API Externa", icon: IconPlugConnected, url: "/admin/integrations/api" },
    { title: "Webhooks", icon: IconCloud, url: "/admin/integrations/webhooks" },
    { title: "MINEDU (SIAGIE)", icon: IconBuildingBank, url: "/admin/integrations/minedu" },
    { title: "Pasarelas de Pago", icon: IconCreditCard, url: "/admin/integrations/payments" },
  ]

  // Módulo: Reportes Consolidados
  const reportesSubmodulos = [
    { title: "Reporte de Uso", icon: IconChartBar, url: "/admin/reports/usage" },
    { title: "Reporte Financiero", icon: IconCreditCard, url: "/admin/reports/financial" },
    { title: "Estadísticas Globales", icon: IconChartLine, url: "/admin/reports/statistics" },
    { title: "Exportar Datos", icon: IconDatabase, url: "/admin/reports/export" },
  ]

  // Módulo: Configuración del Sistema
  const configuracionSubmodulos = [
    { title: "Parámetros Globales", icon: IconAdjustments, url: "/admin/settings/global" },
    { title: "Configuración de Servidores", icon: IconServer, url: "/admin/settings/servers" },
    { title: "Backup y Restauración", icon: IconDatabase, url: "/admin/settings/backup" },
    { title: "Logs del Sistema", icon: IconHistory, url: "/admin/settings/logs" },
    { title: "Seguridad y Encriptación", icon: IconLock, url: "/admin/settings/security" },
    { title: "Actualizaciones", icon: IconCloud, url: "/admin/settings/updates" },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-2">
          <IconServer className="h-8 w-8" style={{ color: branding.primaryColor }} />
          <div className="flex flex-col">
            <span
              className="font-semibold text-sm"
              style={{ color: branding.primaryColor }}
            >
              Sistema Central
            </span>
            <span className="text-xs text-muted-foreground">
              Panel de Administración Master
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* GRUPO: PRINCIPAL */}
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard Central */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Dashboard Central">
                  <a href="/admin/dashboard">
                    <IconDashboard />
                    <span>Dashboard Central</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Gestión de Instituciones */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Gestión de Instituciones">
                      <IconSchool />
                      <span>Gestión de Instituciones</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {institucionesSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Dispositivos ZKTeco */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Dispositivos ZKTeco">
                      <IconFingerprint />
                      <span>Dispositivos ZKTeco</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {zktecoSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Monitoreo Global */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Monitoreo Global">
                      <IconDeviceDesktop />
                      <span>Monitoreo Global</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {monitoreoSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Usuarios y Accesos */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Usuarios y Accesos">
                      <IconUsers />
                      <span>Usuarios y Accesos</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {usuariosSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GRUPO: INTEGRACIONES */}
        <SidebarGroup>
          <SidebarGroupLabel>Integraciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Integraciones y APIs */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Integraciones y APIs">
                      <IconPlugConnected />
                      <span>Integraciones y APIs</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {integracionesSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GRUPO: REPORTES */}
        <SidebarGroup>
          <SidebarGroupLabel>Reportes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Reportes Consolidados */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Reportes Consolidados">
                      <IconChartBar />
                      <span>Reportes Consolidados</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {reportesSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GRUPO: SISTEMA */}
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Configuración del Sistema */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Configuración del Sistema">
                      <IconSettings />
                      <span>Configuración del Sistema</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {configuracionSubmodulos.map((submodulo) => (
                        <SidebarMenuSubItem key={submodulo.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={submodulo.url}>
                              <submodulo.icon />
                              <span>{submodulo.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
