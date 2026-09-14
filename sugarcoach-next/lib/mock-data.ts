import type { Faq, Plan, TeamMember } from "@/types";
import { TEAM_PHOTOS } from "@/lib/images";

// Planes mockeados — cuando el backend exista, vendrán de GET /plans
export const mockPlans: Plan[] = [
  {
    id: "free",
    name: "Gratis",
    description: "Para empezar a registrar y sumar puntos.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: "USD",
    features: [
      "Registro de glucosa e insulina",
      "Daily Log cronológico",
      "+100 pts por registro completo",
      "1 perfil familiar",
    ],
    cta: "Descargar gratis",
  },
  {
    id: "plus",
    name: "Plus Familiar",
    description: "Para familias que quieren estar conectadas.",
    monthlyPrice: 6.99,
    yearlyPrice: 69.9,
    currency: "USD",
    features: [
      "Todo lo del plan Gratis",
      "Sincronización familiar en tiempo real",
      "Reportes TIR para tu consulta",
      "Hasta 5 perfiles",
      "Planeta 3D de actividad",
    ],
    highlighted: true,
    cta: "Probar 14 días gratis",
  },
  {
    id: "pro",
    name: "Profesional",
    description: "Para acompañamiento clínico y consultorios.",
    monthlyPrice: 14.99,
    yearlyPrice: 149.9,
    currency: "USD",
    features: [
      "Todo lo de Plus Familiar",
      "Panel multi-paciente",
      "Curvas Glucosa vs. Insulina",
      "Exportación de reportes PDF",
      "Soporte prioritario",
    ],
    cta: "Hablar con ventas",
  },
];

export const mockFaqs: Faq[] = [
  {
    question: "¿SugarCoach es solo para niños?",
    answer:
      "No, está pensado tanto para niños y adolescentes como para adultos independientes y familias que acompañan. Su diseño es cálido y motivador sin caer en infantilismos.",
  },
  {
    question: "¿Mi familia puede ver mis datos en tiempo real?",
    answer:
      "Sí, podés vincular a padres, cuidadores o parejas para que reciban avisos o vean resúmenes según los permisos que configures, garantizando tranquilidad sin invadir la privacidad.",
  },
  {
    question: "¿Puedo compartir información con mi médico?",
    answer:
      "Totalmente. Podés exportar resúmenes claros con Tiempo en Rango (TIR) y relaciones de glucosa vs. insulina para agilizar la consulta clínica.",
  },
  {
    question: "¿Qué datos puedo registrar en la app?",
    answer:
      "Glucosa capilar o continua, dosis de insulina basal y rápida, carbohidratos consumidos con fotos opcionales, tipo de actividad física y estado de ánimo diario.",
  },
];

// Integrantes tomados de fileSobreNosotros.html ("Conocé a nuestro equipo")
export const mockTeam: TeamMember[] = [
  {
    id: "isabel-berizzo",
    photo: TEAM_PHOTOS["isabel-berizzo"],
    name: "Isabel Berizzo",
    initials: "IB",
    area: "Fundadora & Líder Técnica",
    role: "CEO & CTO Founder",
    bio: "Soy Isa Berizzo, madre de dos hijos diagnosticados con diabetes tipo 1 cuando tenían solo 3 y 4 años. Como Ingeniera en Sistemas, programadora y CTO, decidí combinar mi experiencia técnica con mi pasión por transformar vidas. Así nació SugarCoach, una plataforma diseñada para convertir el desafío de la diabetes en una experiencia positiva, educativa y motivadora. Además, es TED speaker y comparte su historia y aprendizajes para inspirar a otras familias.",
    tags: ["TEDx Speaker", "Ingeniera en Sistemas"],
  },
  {
    id: "veronica-avendano",
    photo: TEAM_PHOTOS["veronica-avendano"],
    name: "Veronica Avendaño",
    initials: "VA",
    area: "COO & Operaciones",
    role: "COO",
    bio: "Ingeniera Industrial con especialización en desarrollo y administración de proyectos, Verónica lidera nuestras operaciones, asegurando que cada iniciativa se ejecute con excelencia.",
    tags: ["Ingeniera Industrial", "COO"],
  },
  {
    id: "debora-biain",
    photo: TEAM_PHOTOS["debora-biain"],
    name: "Debora Biain",
    initials: "DB",
    area: "RSE & Relaciones Públicas",
    role: "RSE & Relaciones Públicas",
    bio: "Licenciada en Relaciones Institucionales y experta en responsabilidad social, Débora integra estrategias que fortalecen nuestro compromiso con el impacto social.",
    tags: ["Relaciones Institucionales", "RSE"],
  },
  {
    id: "agustina-olivo",
    photo: TEAM_PHOTOS["agustina-olivo"],
    name: "Agustina Olivo",
    initials: "AO",
    area: "CM & Content Manager",
    role: "CM & Content Manager",
    bio: "Licenciada en Ciencia Política y mi hija, Agustina está a cargo del contenido, redes sociales y marketing, aportando creatividad y conexión directa con nuestra audiencia.",
    tags: ["Ciencia Política", "Content Manager"],
  },
  {
    id: "karin-chmiel",
    photo: TEAM_PHOTOS["karin-chmiel"],
    name: "Karin Chmiel",
    initials: "KC",
    area: "Business Development",
    role: "Business Development",
    bio: "Especialista en desarrollo de negocios, ventas y estrategias de mercado, Karin impulsa nuestro crecimiento y expansión con su enfoque en relaciones clave y oportunidades estratégicas.",
    tags: ["Business Development", "Ventas & Estrategia"],
  },
];

export function formatPrice(value: number, currency = "USD"): string {  if (value === 0) return "Gratis";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
