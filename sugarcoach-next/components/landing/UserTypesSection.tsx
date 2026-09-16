"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  Users,
  Stethoscope,
  Zap,
  Sparkles,
  ShieldCheck,
  Cloud,
  Bell,
  BarChart3,
  Activity,
  FileText,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type AudienceId = "pacientes" | "familias" | "profesionales";

interface UseCase {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface AudiencePillar {
  id: AudienceId;
  name: string;
  roleSubtitle: string;
  badge: string;
  icon: LucideIcon;
  purposePrompt: string;
  purposeSummary: string;
  headline: string;
  description: string;
  accentColor: string;
  accentBorder: string;
  activeBorder: string;
  accentBg: string;
  iconBoxBg: string;
  glowGradient: string;
  useCases: UseCase[];
  metrics: string[];
  ctaLink: string;
  ctaLabel: string;
  previewBadge: string;
}

const PILLARS: AudiencePillar[] = [
  {
    id: "pacientes",
    name: "Para vos",
    roleSubtitle: "Niños, jóvenes y personas con diabetes",
    badge: "Autonomía y motivación",
    icon: Heart,
    purposePrompt: "¿Para qué la usás?",
    purposeSummary: "Registro express en segundos y motivación diaria sin culpa médica.",
    headline: "Tu tratamiento a tu ritmo, sin juzgar tus valores",
    description:
      "Diseñado para que registrar tu glucosa, comidas y dosis no sea una carga clínica, sino un hábito ágil donde sumás puntos, cuidás tu salud y aprendés a entender tu cuerpo.",
    accentColor: "text-[#9E1679] dark:text-[#DA44AF] [.a11y_&]:text-[#7100A5]",
    accentBorder: "border-[#DA44AF]/30 dark:border-[#DA44AF]/40",
    activeBorder: "border-[#DA44AF] shadow-[0_0_24px_rgba(218,68,175,0.18)] dark:border-[#DA44AF]",
    accentBg: "bg-[#DA44AF]/10 dark:bg-[#DA44AF]/15",
    iconBoxBg: "bg-gradient-to-br from-[#DA44AF]/25 to-[#C747CA]/25 text-[#9E1679] dark:text-[#DA44AF] [.a11y_&]:text-[#7100A5]",
    glowGradient: "from-[#DA44AF]/10 via-[#DA44AF]/5 to-transparent",
    useCases: [
      {
        title: "Carga rápida en 2 toques",
        desc: "Ingresá glucemia, carbohidratos, bolos de insulina y actividad física en menos de 10 segundos.",
        icon: Zap,
      },
      {
        title: "Gamificación respetuosa",
        desc: "Sumá puntos diarios y desbloqueá niveles por tu constancia. Los números son información médica, nunca calificaciones morales.",
        icon: Sparkles,
      },
      {
        title: "Aprender sin estrés",
        desc: "Reconocé de un vistazo el impacto de tus comidas y ejercicios con feedback visual claro y amigable.",
        icon: ShieldCheck,
      },
    ],
    metrics: ["Carga en < 10 seg", "+100 Pts por día", "Sin reproches clínicos"],
    ctaLink: "#como-funciona",
    ctaLabel: "Ver cómo se siente el día a día",
    previewBadge: "Niños y jóvenes",
  },
  {
    id: "familias",
    name: "Para tu familia",
    roleSubtitle: "Madres, padres, tutores y cuidadores",
    badge: "Tranquilidad compartida",
    icon: Users,
    purposePrompt: "¿Para qué la usás?",
    purposeSummary: "Acompañar de cerca en tiempo real sin invadir su rutina ni su independencia.",
    headline: "Paz mental sabiendo que están seguros en todo momento",
    description:
      "Para las familias, el equilibrio entre proteger y fomentar la autonomía es clave. SugarCoach mantiene conectados a los cuidadores mediante datos en la nube sin necesidad de mensajes insistentes.",
    accentColor: "text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]",
    accentBorder: "border-[#2BC5C7]/30 dark:border-[#2BC5C7]/40",
    activeBorder: "border-[#2BC5C7] shadow-[0_0_24px_rgba(43,197,199,0.18)] dark:border-[#2BC5C7]",
    accentBg: "bg-[#2BC5C7]/10 dark:bg-[#2BC5C7]/15",
    iconBoxBg: "bg-gradient-to-br from-[#2BC5C7]/25 to-teal-500/25 text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]",
    glowGradient: "from-[#2BC5C7]/10 via-[#2BC5C7]/5 to-transparent",
    useCases: [
      {
        title: "Sincronización en la nube",
        desc: "Cada control diario se sincroniza al instante en los dispositivos autorizados del círculo familiar.",
        icon: Cloud,
      },
      {
        title: "Alertas inteligentes y discretas",
        desc: "Recibí notificaciones prioritarias únicamente cuando se requiera una intervención real o confirmación.",
        icon: Bell,
      },
      {
        title: "Libertad escolar y social",
        desc: "Sabé que tus hijos están protegidos durante clases, entrenamientos deportivos y salidas con amigos.",
        icon: ShieldCheck,
      },
    ],
    metrics: ["Sync en tiempo real", "Alertas configurables", "Acompañamiento sin asfixia"],
    ctaLink: "#descargar",
    ctaLabel: "Descargar para toda la familia",
    previewBadge: "Familias y cuidadores",
  },
  {
    id: "profesionales",
    name: "Para profesionales",
    roleSubtitle: "Diabetólogos, endocrinólogos y nutricionistas",
    badge: "Precisión clínica",
    icon: Stethoscope,
    purposePrompt: "¿Para qué la usás?",
    purposeSummary: "Consultas enfocadas con curvas de Tiempo en Rango (TIR) y reportes médicos consolidados.",
    headline: "Datos claros y estructurados para consultas médicas más humanas",
    description:
      "Transformá libretas incompletas y notas aisladas en métricas estandarizadas de calidad médica. Visualizá variabilidad, correlaciones y respuestas a la terapia en un informe consolidado.",
    accentColor: "text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]",
    accentBorder: "border-[#C45CFF]/30 dark:border-[#C45CFF]/40",
    activeBorder: "border-[#C45CFF] shadow-[0_0_24px_rgba(196,92,255,0.18)] dark:border-[#C45CFF]",
    accentBg: "bg-[#C45CFF]/10 dark:bg-[#C45CFF]/15",
    iconBoxBg: "bg-gradient-to-br from-[#C45CFF]/25 to-indigo-500/25 text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]",
    glowGradient: "from-[#C45CFF]/10 via-[#C45CFF]/5 to-transparent",
    useCases: [
      {
        title: "Métricas TIR estandarizadas",
        desc: "Porcentajes precisos en rango objetivo (70-180 mg/dL), hipoglucemias y perfiles AGP de 14 a 90 días.",
        icon: BarChart3,
      },
      {
        title: "Correlación terapéutica",
        desc: "Cruzá dosis basales/bolos con carbohidratos consumidos para calibrar ratios de sensibilidad con fundamento.",
        icon: Activity,
      },
      {
        title: "Exportación clínica en 1 clic",
        desc: "Generá reportes en formato PDF y hojas de cálculo para adjuntar a la historia clínica digital del paciente.",
        icon: FileText,
      },
    ],
    metrics: ["Reportes TIR / AGP", "Exportación PDF y Excel", "Consultas 40% más ágiles"],
    ctaLink: "#tratamiento",
    ctaLabel: "Ver módulo de tratamiento",
    previewBadge: "Médicos y especialistas",
  },
];

const smoothPillarTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1], // Curva cúbica suave estilo Apple / sin tirones
};

export function UserTypesSection() {
  const [activeId, setActiveId] = useState<AudienceId>("pacientes");
  const reduceMotion = useReducedMotion();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePillarHover = (id: AudienceId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, 70); // Pequeño margen para que el barrido del mouse sea intencional y calmo
  };

  const handlePillarLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  return (
    <section
      id="familias"
      className="relative w-full overflow-hidden bg-alt/40 py-20 dark:bg-[#050B1E]"
      aria-labelledby="user-types-heading"
    >
      {/* Halos decorativos de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#DA44AF]/10 blur-[120px] dark:bg-[#DA44AF]/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 rounded-full bg-[#2BC5C7]/10 blur-[120px] dark:bg-[#2BC5C7]/15"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Encabezado principal de la sección */}
        <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-line/15 bg-tint/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-from dark:border-white/10 dark:text-[#C45CFF]">
            Una app, tres miradas complementarias
          </span>
          <h2 id="user-types-heading" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Diseñado para cada integrante del cuidado
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-body sm:text-base dark:text-[#A8B0C5]">
            Cada persona vive el tratamiento desde un lugar distinto. Explorá cómo SugarCoach adapta sus herramientas
            según quién la esté usando:
          </p>
        </Reveal>

        {/* Pilares cinéticos interactivos (Desktop: altura fija bloqueada para eliminar saltos de página / Mobile: acordeón) */}
        <div
          role="tablist"
          aria-label="Perfiles de usuario de SugarCoach"
          className="flex flex-col gap-4 lg:h-[620px] lg:flex-row lg:items-stretch"
        >
          {PILLARS.map((pillar) => {
            const isActive = activeId === pillar.id;
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                data-kinetic-pillar="true"
                layout={!reduceMotion}
                transition={smoothPillarTransition}
                onClick={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                  setActiveId(pillar.id);
                }}
                onMouseEnter={() => handlePillarHover(pillar.id)}
                onMouseLeave={handlePillarLeave}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(pillar.id);
                  }
                }}
                tabIndex={0}
                role="tab"
                id={`tab-pillar-${pillar.id}`}
                aria-selected={isActive}
                aria-controls={`panel-pillar-${pillar.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-card p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA44AF] dark:bg-[#09122C] lg:h-full ${
                  isActive
                    ? `lg:flex-[2.7] ${pillar.activeBorder}`
                    : `lg:flex-1 ${pillar.accentBorder} hover:border-ink/20 dark:hover:border-white/20 opacity-90 hover:opacity-100`
                }`}
              >
                {/* Halo interior suave en la tarjeta activa */}
                {isActive && (
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${pillar.glowGradient} blur-2xl`}
                  />
                )}

                {/* Contenido Superior / Identidad del Pilar */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1.5">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${pillar.accentBg} ${pillar.accentColor} ${pillar.accentBorder}`}
                      >
                        {pillar.badge}
                      </span>
                      <h3 className="text-2xl xl:text-3xl font-black tracking-tight text-ink">
                        {pillar.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-muted dark:text-[#747F9B]">
                        {pillar.roleSubtitle}
                      </p>
                    </div>

                    {/* Indicador visual de expansión en mobile */}
                    <div className="lg:hidden shrink-0 pt-1">
                      <ChevronDown
                        className={`h-5 w-5 text-muted transition-transform duration-300 ${
                          isActive ? "rotate-180 text-ink" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bloque central: ¿Para qué la usás? */}
                  <div
                    className={`mt-4 rounded-2xl border p-3.5 transition-colors duration-200 ${
                      isActive
                        ? `${pillar.accentBg} ${pillar.accentBorder}`
                        : "bg-base/40 border-line/10 dark:bg-white/[0.02] dark:border-white/[0.06]"
                    }`}
                  >
                    <span className="block text-[10px] font-black uppercase tracking-wider text-muted dark:text-[#747F9B]">
                      {pillar.purposePrompt}
                    </span>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-ink leading-snug">
                      {pillar.purposeSummary}
                    </p>
                  </div>

                  {/* Vista Expandida (Visible cuando la tarjeta está activa) */}
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive && (
                      <motion.div
                        key={`content-${pillar.id}`}
                        id={`panel-pillar-${pillar.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-3.5 space-y-3 overflow-visible"
                      >
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-ink leading-snug">
                            {pillar.headline}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-body dark:text-[#A8B0C5]">
                            {pillar.description}
                          </p>
                        </div>

                        {/* Los 3 Casos de Uso Concretos en grilla horizontal en desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
                          {pillar.useCases.map((uc, idx) => {
                            const UcIcon = uc.icon;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col justify-between gap-1.5 rounded-2xl border border-line/10 bg-base/60 p-3 transition-colors dark:border-white/[0.06] dark:bg-[#050C22]"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${pillar.accentBg} ${pillar.accentColor}`}
                                  >
                                    <UcIcon className="h-3.5 w-3.5" />
                                  </div>
                                  <h5 className="text-xs font-bold text-ink leading-tight">
                                    {uc.title}
                                  </h5>
                                </div>
                                <p className="text-[11px] leading-relaxed text-body dark:text-[#A8B0C5]">
                                  {uc.desc}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Badges de métricas / valor concreto */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {pillar.metrics.map((metric, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center rounded-xl border border-line/10 bg-base px-2.5 py-1 text-[11px] font-bold text-ink dark:border-white/[0.08] dark:bg-[#0A1433]"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Vista Colapsada (Desktop): Marca de agua icónica saliendo del costado */}
                {!isActive && (
                  <div className="pointer-events-none hidden lg:flex relative flex-1 flex-col justify-end overflow-hidden">
                    {/* Halo ambiental sutil en el lateral */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -bottom-6 -right-6 h-52 w-52 rounded-full bg-gradient-to-br ${pillar.glowGradient} blur-3xl opacity-60 dark:opacity-40`}
                    />

                    {/* Icono de gran formato saliendo del costado con menor transparencia */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-8 -right-8 select-none opacity-[0.24] dark:opacity-[0.28] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1 group-hover:opacity-[0.35] dark:group-hover:opacity-[0.42]"
                    >
                      <Icon className={`h-56 w-56 xl:h-64 xl:w-64 ${pillar.accentColor}`} strokeWidth={1.5} />
                    </div>
                  </div>
                )}

                {/* Pie de la tarjeta */}
                <div className="relative z-10 mt-4 shrink-0 border-t border-line/10 pt-3.5 dark:border-white/[0.08]">
                  {isActive ? (
                    <a
                      href={pillar.ctaLink}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${pillar.accentColor} transition-colors hover:underline`}
                    >
                      <span>{pillar.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-muted dark:text-[#747F9B]">
                      <span className="font-semibold">Ver detalles</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
