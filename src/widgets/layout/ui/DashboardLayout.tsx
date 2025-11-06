import { ReactNode, useState } from "react";
import { useAuth } from "@/app/providers";
import { useNavigate, useLocation } from "react-router-dom";
import { UNIVERSITY_CONFIG } from "@/shared/config";
import {
  IconDashboard,
  IconUserCog,
  IconFileText,
  IconChartBar,
  IconDeviceDesktop,
  IconSettings,
  IconShield,
  IconBuilding,
  IconBuildingCommunity,
  IconChevronRight,
  IconSearch,
  IconAlertCircle,
  IconFileDescription,
  IconReportAnalytics,
  IconSpeakerphone,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Separator,
  NavUser,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  Toaster,
} from "@/shared/ui";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { branding, shortName } = UNIVERSITY_CONFIG;

  const [adminOpen, setAdminOpen] = useState(true);

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Navigation items adapted for SRQD system
  const navItems = [
    { title: "Dashboard", icon: IconDashboard, url: "/dashboard" },
    { title: "Casos SRQD", icon: IconFileText, url: "/casos" },
    { title: "Consulta Pública", icon: IconSearch, url: "/consulta" },
    { title: "Estadísticas y Reportes", icon: IconReportAnalytics, url: "/estadisticas" },
  ];

  // Admin sub-menu items
  const adminItems = [
    { title: "Usuarios", icon: IconUserCog, url: "/admin/users" },
    { title: "Roles y Privilegios", icon: IconShield, url: "/admin/roles" },
    { title: "Sedes", icon: IconBuilding, url: "/admin/sedes" },
    { title: "Dependencias", icon: IconBuildingCommunity, url: "/admin/dependencias" },
    { title: "Publicaciones", icon: IconSpeakerphone, url: "/admin/publicaciones" },
  ];

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="flex items-center gap-3 px-3 py-2">
            <img
              src={UNIVERSITY_CONFIG.logo}
              alt={shortName}
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span
                className="font-semibold text-sm"
                style={{ color: branding.primaryColor }}
              >
                {shortName}
              </span>
              <span className="text-xs text-muted-foreground">
                Sistema SRQD
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}

            {/* Admin Section - Only for admins */}
            {isAdmin && (
              <Collapsible open={adminOpen} onOpenChange={setAdminOpen} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Administración del Sistema">
                      <IconSettings className="size-4" />
                      <span>Administración</span>
                      <IconChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {adminItems.map((item) => {
                        const isActive = location.pathname === item.url;
                        return (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <a href={item.url}>
                                <item.icon className="size-4" />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <NavUser
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        {/* Header */}
        <header className="flex h-auto lg:h-16 shrink-0 items-center gap-2 border-b px-4 py-3 lg:py-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg lg:text-xl font-semibold truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <IconDeviceDesktop className="size-4 lg:size-5 text-muted-foreground" />
              <span className="text-xs lg:text-sm text-muted-foreground">
                <span className="lg:hidden">
                  {new Date().toLocaleDateString('es-PE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
                <span className="hidden lg:inline">
                  {new Date().toLocaleDateString('es-PE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
