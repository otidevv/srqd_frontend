import {
  IconDashboard,
  IconFileText,
  IconClock,
  IconAlertTriangle,
  IconChecks,
  IconPlus,
  IconSearch,
  IconChartBar,
  IconUsers,
  IconKey,
  IconBuilding,
  IconSettings,
  IconChevronRight,
  IconShield,
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

export function AppSidebar() {
  const { tenant } = useTenant()
  const { branding, content } = tenant

  // Submódulos de Casos SRQD
  const casosSubmodulos = [
    { title: "Todos los Casos", icon: IconFileText, url: "/casos" },
    { title: "Registrar Nuevo", icon: IconPlus, url: "/casos/nuevo" },
    { title: "Pendientes", icon: IconClock, url: "/casos?estado=pendiente" },
    { title: "En Proceso", icon: IconAlertTriangle, url: "/casos?estado=en_proceso" },
    { title: "Resueltos", icon: IconChecks, url: "/casos?estado=resuelto" },
  ]

  // Submódulos de Configuración
  const configuracionSubmodulos = [
    { title: "Usuarios", icon: IconUsers, url: "/admin/users" },
    { title: "Roles", icon: IconKey, url: "/admin/roles" },
    { title: "Sedes", icon: IconBuilding, url: "/admin/sedes" },
    { title: "Dependencias", icon: IconBuilding, url: "/admin/dependencias" },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-2">
          {branding.logo && (
            <img
              src={branding.logo}
              alt={content.name}
              className="h-8 w-auto object-contain"
            />
          )}
          <div className="flex flex-col">
            <span
              className="font-semibold text-sm"
              style={{ color: branding.primaryColor }}
            >
              {content.shortName || content.name}
            </span>
            <span className="text-xs text-muted-foreground">
              Sistema SRQD
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* GRUPO: PRINCIPAL */}
        <SidebarGroup>
          <SidebarGroupLabel>Defensoría Universitaria</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Dashboard">
                  <a href="/dashboard">
                    <IconDashboard />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Gestión de Casos SRQD */}
              <Collapsible asChild defaultOpen={true}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Casos SRQD">
                      <IconShield />
                      <span>Casos SRQD</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {casosSubmodulos.map((submodulo) => (
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

              {/* Consulta Pública */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Consulta Pública">
                  <a href="/consulta">
                    <IconSearch />
                    <span>Consulta Pública</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Estadísticas */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Estadísticas">
                  <a href="/estadisticas">
                    <IconChartBar />
                    <span>Estadísticas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GRUPO: ADMINISTRACIÓN */}
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Configuración */}
              <Collapsible asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Configuración">
                      <IconSettings />
                      <span>Configuración</span>
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
