"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Activity,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Flame,
  Award,
  Download,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";

type AudienceId = "pacientes" | "familias" | "profesionales";

interface AudienceData {
  id: AudienceId;
  tabLabel: string;
  tabIcon: typeof Heart;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  points: {
    title: string;
    desc: string;
  }[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

const AUDIENCES: AudienceData[] = [
  {
    id: "pacientes",
    tabLabel: "Para vos",
    tabIcon: Heart,
    badge: "Autonomía y motivación",
    title: "Tu cuidado diario a tu ritmo, sin juzgar tus valores",
    subtitle: "Diseñado para niños, jóvenes y adultos que buscan vivir su tratamiento sin estrés clínico.",
    description:
      "SugarCoach convierte el registro diario en una experiencia positiva y veloz. Sumá puntos por tu constancia, aprendé a reconocer tus patrones y mantené el control sin sentirte sobrecargado.",
    points: [
      {
        title: "Registro express en segundos",
        desc: "Ingresá glucosa, insulina basal/bolo, carbohidratos y actividad física con solo dos toques.",
      },
      {
        title: "Gamificación positiva",
        desc: "Ganá estrellas y desbloqueá logros por registrar, sin importar si los números suben o bajan.",
      },
      {
        title: "Educación y hábitos saludables",
        desc: "Conocé cómo impacta cada comida y ejercicio en tu glucemia con feedback visual inmediato.",
      },
    ],
    accentColor: "text-[#9E1679] dark:text-[#DA44AF] [.a11y_&]:text-[#7100A5]",
    accentBg: "bg-[#DA44AF]/15",
    accentBorder: "border-[#DA44AF]/30",
  },
  {
    id: "familias",
    tabLabel: "Para tu familia",
    tabIcon: Users,
    badge: "Tranquilidad compartida",
    title: "Acompañá de cerca respetando su independencia",
    subtitle: "Círculo de cuidado conectado para mamás, papás y tutores con sincronización en tiempo real.",
    description:
      "Para los padres de chicos con diabetes, el equilibrio entre protección y libertad es todo. SugarCoach mantiene informados a los cuidadores sin invadir la rutina diaria ni generar llamadas insistentes.",
    points: [
      {
        title: "Sincronización en la nube al instante",
        desc: "Cada registro se replica automáticamente en los dispositivos autorizados del grupo familiar.",
      },
      {
        title: "Notificaciones discretas y oportunas",
        desc: "Alertas inteligentes configuradas solo para eventos que realmente requieren intervención.",
      },
      {
        title: "Paz mental en la escuela y clubes",
        desc: "Sabé que tus hijos están seguros mientras disfrutan de sus actividades sociales y deportivas.",
      },
    ],
    accentColor: "text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]",
    accentBg: "bg-[#2BC5C7]/15",
    accentBorder: "border-[#2BC5C7]/30",
  },
  {
    id: "profesionales",
    tabLabel: "Para profesionales",
    tabIcon: Activity,
    badge: "Precisión clínica",
    title: "Consultas enfocadas con datos claros y estandarizados",
    subtitle: "Reportes estructurados con métricas TIR (Tiempo en Rango) y correlaciones precisas.",
    description:
      "Menos tiempo descifrando notas dispersas y más tiempo dedicado a acompañar a la persona. Visualizá tendencias, variabilidad glucémica y respuestas a la medicación en un solo panel clínico.",
    points: [
      {
        title: "Métricas TIR estandarizadas",
        desc: "Porcentajes en rango objetivo (70-180 mg/dL), hipoglucemias y eventos de hiperglucemia.",
      },
      {
        title: "Correlación insulina y carbohidratos",
        desc: "Gráficos de dispersión para ajustar ratios y factores de sensibilidad con fundamento.",
      },
      {
        title: "Exportación médica en 1 clic",
        desc: "Descargá reportes consolidados en formato PDF o Excel listos para la historia clínica.",
      },
    ],
    accentColor: "text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]",
    accentBg: "bg-[#C45CFF]/15",
    accentBorder: "border-[#C45CFF]/30",
  },
];

export function UserTypesSection() {
  const [activeTab, setActiveTab] = useState<AudienceId>("pacientes");
  const activeAudience = AUDIENCES.find((a) => a.id === activeTab) ?? AUDIENCES[0];

  return (
    <section
      id="familias"
      className="relative w-full overflow-hidden bg-alt/50 py-20 dark:bg-[#060D24]"
      aria-labelledby="user-types-heading"
    >
      {/* Halo ambiental sutil de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#DA44AF]/10 blur-[130px] dark:bg-[#DA44AF]/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-[#2BC5C7]/10 blur-[130px] dark:bg-[#2BC5C7]/15"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        {/* Header de la sección */}
        <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-line/15 bg-tint/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-from dark:border-white/10 dark:text-[#C45CFF]">
            Diseñado para convivir
          </span>
          <h2 id="user-types-heading" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Una app, distintas formas de acompañar
          </h2>
          <p className="section-subtitle mt-3 max-w-xl text-center text-sm sm:text-base leading-relaxed">
            Porque cada persona vive el cuidado desde un lugar diferente, SugarCoach adapta su experiencia con empatía, autonomía y conexión real.
          </p>
        </Reveal>

        {/* Selector de perfil accesible (Audience Switcher Tabs) */}
        <Reveal delay={0.08} className="mx-auto mb-8 flex max-w-2xl justify-center">
          <div
            role="tablist"
            aria-label="Seleccionar perfil de usuario"
            className="inline-flex w-full max-w-md items-center justify-between rounded-2xl border border-line/15 bg-card/80 p-1.5 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-[#0D1733]/80"
          >
            {AUDIENCES.map((audience) => {
              const Icon = audience.tabIcon;
              const isActive = activeTab === audience.id;
              return (
                <button
                  key={audience.id}
                  role="tab"
                  id={`tab-${audience.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${audience.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(audience.id)}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm cursor-pointer ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-body hover:text-ink dark:text-[#A8B0C5] hover:dark:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="audienceActivePill"
                      className="absolute inset-0 rounded-xl bg-brand-gradient shadow-brand-glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="h-4 w-4" />
                    <span>{audience.tabLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel dinámico tipo Spotlight / 2 Columnas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAudience.id}
            id={`panel-${activeAudience.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeAudience.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-line/15 bg-card p-6 shadow-xl backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0B1530] md:p-10 lg:grid-cols-12 lg:gap-12"
          >
            {/* Columna Izquierda: Storytelling y Propuesta de Valor */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${activeAudience.accentBg} ${activeAudience.accentColor} ${activeAudience.accentBorder}`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {activeAudience.badge}
                </span>
                <span className="text-xs text-muted dark:text-[#747F9B]">Perfil especializado</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {activeAudience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body dark:text-[#A8B0C5] sm:text-base">
                  {activeAudience.description}
                </p>
              </div>

              {/* Lista de beneficios clave con íconos vectoriales */}
              <div className="space-y-3.5 pt-1">
                {activeAudience.points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-line/10 bg-base/50 p-3.5 transition-colors dark:border-white/[0.05] dark:bg-[#070E22]/60"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">{point.title}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-body dark:text-[#A8B0C5]">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a href="#como-funciona" className="inline-flex items-center gap-2 text-sm font-bold text-brand-from transition-colors hover:underline">
                  <span>Descubrí cómo funciona en el día a día</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Columna Derecha: Live Interactive Preview Widget */}
            <div className="lg:col-span-5">
              {activeAudience.id === "pacientes" && <PatientLiveWidget />}
              {activeAudience.id === "familias" && <FamilyLiveWidget />}
              {activeAudience.id === "profesionales" && <DoctorLiveWidget />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* =========================================================================
 * Live Preview Widgets (Simulación interactiva realista por rol)
 * ========================================================================= */

/** Widget 1: Pacientes / Autonomía Diaria */
function PatientLiveWidget() {
  const [stars, setStars] = useState(120);
  const [lastLogged, setLastLogged] = useState<string | null>(null);

  const handleQuickLog = (item: string, pts: number) => {
    setStars((prev) => prev + pts);
    setLastLogged(item);
    setTimeout(() => setLastLogged(null), 3000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-base/80 p-6 shadow-2xl dark:border-white/[0.1] dark:bg-[#070F26]">
      {/* Encabezado del Widget */}
      <div className="flex items-center justify-between border-b border-line/10 pb-4 dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted dark:text-[#747F9B]">
            Mi Registro • Hoy
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-ink">116</span>
            <span className="text-xs font-semibold text-muted">mg/dL</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              En rango
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-500">
          <Award className="h-4 w-4" />
          <span className="text-xs font-extrabold">{stars} pts</span>
        </div>
      </div>

      {/* Mini simulador de ingreso rápido */}
      <div className="mt-5 space-y-3">
        <p className="text-xs font-semibold text-body dark:text-[#A8B0C5]">
          Probar registro rápido (hacé clic para sumar puntos):
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleQuickLog("Desayuno + 35g carbo", 50)}
            className="flex items-center justify-between rounded-xl border border-line/10 bg-card p-2.5 text-left text-xs font-bold text-ink transition-all hover:border-[#DA44AF]/40 hover:bg-tint/[0.03] dark:border-white/[0.08] dark:bg-[#0C1736] cursor-pointer"
          >
            <span>Desayuno 🥞</span>
            <span className="text-[10px] font-bold text-[#DA44AF]">+50 pts</span>
          </button>
          <button
            onClick={() => handleQuickLog("Dosis Insulina Bolo", 30)}
            className="flex items-center justify-between rounded-xl border border-line/10 bg-card p-2.5 text-left text-xs font-bold text-ink transition-all hover:border-[#DA44AF]/40 hover:bg-tint/[0.03] dark:border-white/[0.08] dark:bg-[#0C1736] cursor-pointer"
          >
            <span>Insulina 💉</span>
            <span className="text-[10px] font-bold text-[#DA44AF]">+30 pts</span>
          </button>
        </div>

        {/* Feedback animado al interactuar */}
        {lastLogged && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-2 text-xs font-bold text-emerald-600 dark:text-emerald-300"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>¡Registrado: {lastLogged}! ⭐</span>
          </motion.div>
        )}

        {/* Racha y constancia */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-line/10 bg-tint/[0.03] p-3 dark:border-white/[0.05] dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink">Racha activa: 5 días</p>
              <p className="text-[10px] text-muted dark:text-[#747F9B]">Registros constantes sin pausas</p>
            </div>
          </div>
          <span className="text-[11px] font-extrabold text-brand-from">Nivel 3</span>
        </div>
      </div>
    </div>
  );
}

/** Widget 2: Familias / Círculo de Cuidado Conectado */
function FamilyLiveWidget() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-base/80 p-6 shadow-2xl dark:border-white/[0.1] dark:bg-[#070F26]">
      {/* Encabezado del Círculo */}
      <div className="flex items-center justify-between border-b border-line/10 pb-4 dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted dark:text-[#747F9B]">
            Círculo de Cuidado
          </span>
          <h4 className="text-base font-extrabold text-ink">Familia conectada</h4>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          En vivo
        </div>
      </div>

      {/* Lista de cuidadores y estado en tiempo real */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center justify-between rounded-2xl border border-line/10 bg-card p-3 dark:border-white/[0.06] dark:bg-[#0C1736]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DA44AF]/20 text-sm font-extrabold text-[#9E1679] dark:text-[#DA44AF] [.a11y_&]:text-[#7100A5]">
              SO
            </div>
            <div>
              <p className="text-xs font-bold text-ink">Sofi (Hija)</p>
              <p className="text-[11px] text-body dark:text-[#A8B0C5]">
                Última medición: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">118 mg/dL</strong>
              </p>
            </div>
          </div>
          <span className="text-[10px] font-medium text-muted dark:text-[#747F9B]">Hace 8 min</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-line/10 bg-card p-3 dark:border-white/[0.06] dark:bg-[#0C1736]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2BC5C7]/20 text-sm font-extrabold text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]">
              MA
            </div>
            <div>
              <p className="text-xs font-bold text-ink">Mamá (Administradora)</p>
              <p className="text-[11px] text-muted dark:text-[#747F9B]">Confirmó colación de la tarde</p>
            </div>
          </div>
          <span className="text-[10px] font-medium text-muted dark:text-[#747F9B]">Sincronizado</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-line/10 bg-card p-3 dark:border-white/[0.06] dark:bg-[#0C1736]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C45CFF]/20 text-sm font-extrabold text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]">
              PA
            </div>
            <div>
              <p className="text-xs font-bold text-ink">Papá (Tutor)</p>
              <p className="text-[11px] text-muted dark:text-[#747F9B]">Recibe alertas críticas</p>
            </div>
          </div>
          <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
        </div>
      </div>

      {/* Banner de tranquilidad */}
      <div className="mt-4 rounded-2xl border border-line/10 bg-tint/[0.03] p-3 text-center dark:border-white/[0.05] dark:bg-white/[0.02]">
        <p className="text-xs text-body dark:text-[#A8B0C5]">
          🟢 <strong>Todo en rango</strong> durante las últimas 6 horas escolares.
        </p>
      </div>
    </div>
  );
}

/** Widget 3: Profesionales / Reporte Clínico y Métricas TIR */
function DoctorLiveWidget() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-base/80 p-6 shadow-2xl dark:border-white/[0.1] dark:bg-[#070F26]">
      {/* Encabezado Clínico */}
      <div className="flex items-center justify-between border-b border-line/10 pb-4 dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted dark:text-[#747F9B]">
            Perfil Médico • AGP
          </span>
          <h4 className="text-base font-extrabold text-ink">Tiempo en Rango (TIR)</h4>
        </div>
        <span className="rounded-full border border-[#C45CFF]/30 bg-[#C45CFF]/15 px-2.5 py-0.5 text-xs font-bold text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]">
          Últimos 14 días
        </span>
      </div>

      {/* Barra de Tiempo en Rango segmentada */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-ink">Objetivo clínico (&gt;70%):</span>
          <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">76% en rango</span>
        </div>
        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-tint/10">
          <div style={{ width: "4%" }} title="Muy bajo (<54)" className="bg-rose-500" />
          <div style={{ width: "3%" }} title="Bajo (54-69)" className="bg-amber-400" />
          <div style={{ width: "76%" }} title="En rango (70-180)" className="bg-emerald-500" />
          <div style={{ width: "14%" }} title="Alto (181-250)" className="bg-orange-400" />
          <div style={{ width: "3%" }} title="Muy alto (>250)" className="bg-red-600" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted dark:text-[#747F9B]">
          <span>Hipo &lt;70 (7%)</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">Target 70-180</span>
          <span>Híper &gt;180 (17%)</span>
        </div>
      </div>

      {/* Métricas clave estandarizadas */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl border border-line/10 bg-card p-3 dark:border-white/[0.06] dark:bg-[#0C1736]">
          <p className="text-[11px] text-muted dark:text-[#747F9B]">GMI Estimada (HbA1c)</p>
          <p className="text-lg font-black text-ink">6.5 %</p>
        </div>
        <div className="rounded-2xl border border-line/10 bg-card p-3 dark:border-white/[0.06] dark:bg-[#0C1736]">
          <p className="text-[11px] text-muted dark:text-[#747F9B]">Coeficiente Variación</p>
          <p className="text-lg font-black text-ink">32 %</p>
        </div>
      </div>

      {/* Botón de exportación médica */}
      <div className="mt-4">
        <Button variant="outline" size="sm" className="w-full gap-2 border-line/20 text-xs font-bold">
          <Download className="h-3.5 w-3.5" />
          Exportar reporte PDF para consulta
        </Button>
      </div>
    </div>
  );
}
