/**
 * Universidad configuration
 * Contains all the branding, contact info, and institutional data
 */

export interface UniversityConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    website: string;
    socialMedia: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
    };
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export const UNIVERSITY_CONFIG: UniversityConfig = {
  name: "Universidad Nacional Amazónica de Madre de Dios",
  shortName: "UNAMAD",
  tagline: "Defensoría Universitaria - Protegiendo tus derechos",
  description:
    "Sistema de Registro de Reclamos, Quejas y Denuncias (SRQD) - Defensoría Universitaria de UNAMAD. Velamos por los derechos de la comunidad universitaria.",
  logo: "/img/logo/logo_defensoria.png",
  branding: {
    primaryColor: "#ed145b", // Rosa/Primary UNAMAD
    secondaryColor: "#059669", // Green (representing support)
    accentColor: "#3b82f6", // Blue (trust)
  },
  contact: {
    email: "defensoria@unamad.edu.pe",
    phone: "+51 986 092 679",
    address: "Av. Jorge Chávez 1160, Puerto Maldonado, Madre de Dios, Perú",
    website: "https://www.unamad.edu.pe",
    socialMedia: {
      facebook: "https://facebook.com/unamadoficial",
      instagram: "https://instagram.com/unamadoficial",
      youtube: "https://youtube.com/@unamadoficial",
    },
  },
  features: [
    {
      icon: "Shield",
      title: "Tutela de Derechos",
      description:
        "Protegemos los derechos individuales de estudiantes, egresados, docentes y personal administrativo.",
    },
    {
      icon: "FileText",
      title: "Sistema SRQD",
      description:
        "Registro y seguimiento digital de reclamos, quejas y denuncias con código de consulta.",
    },
    {
      icon: "Scale",
      title: "Mediación y Conciliación",
      description:
        "Ayudamos en la solución de desacuerdos y diferencias con independencia y confidencialidad.",
    },
    {
      icon: "Clock",
      title: "Respuesta en 20 Días Hábiles",
      description:
        "Compromiso de respuesta y seguimiento de tu caso en un plazo máximo de 20 días hábiles.",
    },
  ],
};
