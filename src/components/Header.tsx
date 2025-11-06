import { useState } from 'react'
import { Menu, X, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const navItems = [
  { name: 'Inicio', href: '#inicio' },
  { name: '¿Quiénes somos?', href: '#quienes-somos' },
  { name: 'Canales de atención', href: '#canales-atencion' },
  { name: 'Formularios', href: '#formularios' },
  { name: '¿Cómo te ayudamos?', href: '#como-ayudamos' },
  { name: 'Casos de Atención', href: '#casos-atencion' },
  { name: 'Base legal', href: '#base-legal' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)

    if (href === '#inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const headerOffset = 80 // Altura del header sticky
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <img
              src="/img/logounamad.png"
              alt="UNAMAD Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight">SRQD</span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden xl:block">
                Sistema de Registro de Reclamos, Quejas y Denuncias
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-end">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`${navigationMenuTriggerStyle()} text-xs xl:text-sm px-2 xl:px-3`}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Botón de Login */}
            <Button
              onClick={() => navigate('/login')}
              style={{ backgroundColor: '#ed145b' }}
              className="text-white hover:opacity-90 text-xs xl:text-sm px-3 xl:px-4 ml-2 flex-shrink-0"
            >
              <LogIn className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
              Iniciar Sesión
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle>Menú de navegación</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  ))}

                  {/* Botón de Login Mobile */}
                  <Button
                    onClick={() => {
                      setOpen(false)
                      navigate('/login')
                    }}
                    style={{ backgroundColor: '#ed145b' }}
                    className="mt-4 text-white hover:opacity-90 w-full"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
