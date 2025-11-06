import { useAuth, useTenant } from "@/app/providers";
import { useNavigate } from "react-router-dom";
import {
  IconDashboard,
  IconUsers,
  IconBook,
  IconCalendar,
  IconFileText,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconTrendingUp,
  IconTrendingDown,
  IconGraduationCap,
  IconSchool,
  IconUserCircle,
} from "@tabler/icons-react";
import { Button } from "@/shared/ui";
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
} from "@/shared/ui";
import { Badge, Card, Separator } from "@/shared/ui";

export function DashboardPageV2() {
  const { user, logout } = useAuth();
  const { tenant } = useTenant();
  const navigate = useNavigate();

  if (!user || !tenant) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { branding, content } = tenant;

  // Navigation items adapted for educational institutions
  const navItems = [
    { title: "Dashboard", icon: IconDashboard, url: "/dashboard", active: true },
    { title: "Estudiantes", icon: IconUsers, url: "/students" },
    { title: "Docentes", icon: IconSchool, url: "/teachers" },
    { title: "Cursos", icon: IconBook, url: "/courses" },
    { title: "Horarios", icon: IconCalendar, url: "/schedules" },
    { title: "Calificaciones", icon: IconGraduationCap, url: "/grades" },
    { title: "Reportes", icon: IconFileText, url: "/reports" },
    { title: "Analíticas", icon: IconChartBar, url: "/analytics" },
  ];

  // Stats cards with educational metrics
  const stats = [
    {
      label: "Total Estudiantes",
      value: "1,234",
      change: "+12%",
      trend: "up",
      description: "vs mes anterior",
    },
    {
      label: "Total Docentes",
      value: "56",
      change: "+2",
      trend: "up",
      description: "nuevos este mes",
    },
    {
      label: "Cursos Activos",
      value: "24",
      change: "100%",
      trend: "up",
      description: "todos en progreso",
    },
    {
      label: "Asistencia",
      value: "94.5%",
      change: "-1.2%",
      trend: "down",
      description: "promedio semanal",
    },
  ];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader className="border-b">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <a href="/dashboard" className="flex items-center gap-3">
                  {branding.logo && (
                    <img
                      src={branding.logo}
                      alt={content.name}
                      className="h-8 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{content.shortName}</span>
                    <span className="text-xs text-muted-foreground">Sistema Educativo</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <div className="px-3 py-2">
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className="w-full"
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent"
                        style={item.active ? {
                          backgroundColor: `${branding.primaryColor}15`,
                          color: branding.primaryColor
                        } : undefined}
                      >
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>

          {/* Settings at bottom of sidebar */}
          <div className="mt-auto px-3 py-2 border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings" className="flex items-center gap-3">
                    <IconSettings className="size-4" />
                    <span>Configuración</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className="size-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    <IconUserCircle className="size-5" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-medium truncate">{user.name}</span>
                    <span className="text-xs text-muted-foreground truncate capitalize">
                      {user.role}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={handleLogout}
                  >
                    <IconLogout className="size-4" />
                  </Button>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <SidebarInset>
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="ml-auto">
              <span className="text-sm text-muted-foreground">
                Bienvenido, {user.name.split(" ")[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <Badge variant="outline" className="gap-1">
                      {stat.trend === "up" ? (
                        <IconTrendingUp className="size-3" />
                      ) : (
                        <IconTrendingDown className="size-3" />
                      )}
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                </Card>
              ))}
            </div>

            {/* Placeholder content */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Próximas Actividades</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                    <IconCalendar
                      className="size-5 shrink-0 mt-0.5"
                      style={{ color: branding.primaryColor }}
                    />
                    <div>
                      <p className="font-medium text-sm">Reunión de Padres</p>
                      <p className="text-xs text-muted-foreground">15 de Octubre, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                    <IconBook
                      className="size-5 shrink-0 mt-0.5"
                      style={{ color: branding.primaryColor }}
                    />
                    <div>
                      <p className="font-medium text-sm">Exámenes Finales</p>
                      <p className="text-xs text-muted-foreground">20-25 de Octubre, 2025</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Accesos Rápidos</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <IconUsers className="size-4 mr-2" />
                    Estudiantes
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <IconBook className="size-4 mr-2" />
                    Cursos
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <IconCalendar className="size-4 mr-2" />
                    Horarios
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <IconGraduationCap className="size-4 mr-2" />
                    Calificaciones
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
