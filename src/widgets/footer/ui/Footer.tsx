import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { UNIVERSITY_CONFIG } from "@/shared/config";

const footerLinks = {
  info: [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Características", href: "#features" },
    { name: "Contacto", href: "#contacto" },
  ],
  services: [
    { name: "Sistema de Asistencia", href: "/login" },
    { name: "Portal Administrativo", href: "/login" },
    { name: "Reportes", href: "/login" },
  ],
  legal: [
    { name: "Privacidad", href: "#" },
    { name: "Términos", href: "#" },
  ],
};

export function Footer() {
  const { name, description, contact, branding, logo } = UNIVERSITY_CONFIG;

  // Build social links array from contact social data
  const socialLinks = [
    contact.socialMedia.facebook && { name: "Facebook", icon: Facebook, href: contact.socialMedia.facebook },
    contact.socialMedia.instagram && { name: "Instagram", icon: Instagram, href: contact.socialMedia.instagram },
    contact.socialMedia.linkedin && { name: "LinkedIn", icon: Linkedin, href: contact.socialMedia.linkedin },
    contact.socialMedia.youtube && { name: "YouTube", icon: Youtube, href: contact.socialMedia.youtube },
  ].filter(Boolean);

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt={name}
              className="h-12 w-auto object-contain mb-4"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {description}
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" style={{ color: branding.primaryColor }} />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4" style={{ color: branding.primaryColor }} />
                <a href={`tel:${contact.phone}`} className="hover:text-foreground transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4" style={{ color: branding.primaryColor }} />
                <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-4">
                {socialLinks.map((social: any) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                      style={{
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = branding.primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {name}. Todos los derechos reservados.
          </p>
          <a
            href={contact.website}
            className="text-sm hover:text-foreground transition-colors"
            style={{ color: branding.primaryColor }}
          >
            {contact.website.replace('https://', '')}
          </a>
        </div>
      </div>
    </footer>
  );
}
