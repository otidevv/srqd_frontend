import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y Descripción */}
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <div className="mb-4">
              <img
                src="/img/logo/logo_defensoria.png"
                alt="Defensoría Universitaria"
                className="h-32 w-auto mb-4"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Defensoría Universitaria de la Universidad Nacional Amazónica de Madre de Dios
            </p>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="text-sm">
                <a href="mailto:defensoria@unamad.edu.pe" className="hover:text-primary transition-colors block">
                  defensoria@unamad.edu.pe
                </a>
              </li>
              <li className="text-sm">
                <a href="https://wa.me/51986092679" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">
                  +51 986 092 679
                </a>
              </li>
              <li className="text-sm">
                <span className="block">Av. Jorge Chávez 1160, Puerto Maldonado, Madre de Dios</span>
              </li>
            </ul>
          </div>

          {/* Horario de Atención */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white font-semibold text-lg mb-4">Horario de Atención</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="font-medium text-white">Lunes a Viernes</p>
                <p>8:00 AM - 4:00 PM</p>
              </li>
              <li>
                <p className="font-medium text-white">Atención Virtual</p>
                <p>24/7 vía correo electrónico</p>
              </li>
            </ul>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#quienes-somos" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group">
                  <span className="text-primary group-hover:text-primary">›</span> ¿Quiénes somos?
                </a>
              </li>
              <li>
                <a href="#canales-atencion" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group">
                  <span className="text-primary group-hover:text-primary">›</span> Canales de atención
                </a>
              </li>
              <li>
                <a href="#formularios" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group">
                  <span className="text-primary group-hover:text-primary">›</span> Formularios
                </a>
              </li>
              <li>
                <a href="#casos-atencion" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group">
                  <span className="text-primary group-hover:text-primary">›</span> Casos de Atención
                </a>
              </li>
              <li>
                <a href="#base-legal" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group">
                  <span className="text-primary group-hover:text-primary">›</span> Base Legal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <img
                src="/img/logounamad.png"
                alt="UNAMAD"
                className="h-8 w-8 object-contain"
              />
              <p>© {new Date().getFullYear()} Universidad Nacional Amazónica de Madre de Dios</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.unamad.edu.pe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Portal UNAMAD
              </a>
              <span className="text-gray-600">|</span>
              <a href="/pdf_bases_legales/formulario_fisico.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Formulario de Trámite
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
