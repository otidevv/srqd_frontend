import { SidebarProvider, SidebarInset } from '@/shared/ui/sidebar'
import { AppSidebar, SiteHeader, SectionCards } from '@/widgets/dashboard'

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader
          title="Dashboard"
          breadcrumbs={[
            { label: 'Inicio', href: '/dashboard' },
            { label: 'Dashboard' },
          ]}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="@container/main">
            <div className="my-6">
              <h1 className="text-2xl font-semibold">Panel de Control</h1>
              <p className="text-muted-foreground text-sm">
                Vista general del sistema académico
              </p>
            </div>
            <SectionCards />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
