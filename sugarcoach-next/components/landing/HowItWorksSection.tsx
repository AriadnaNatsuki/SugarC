"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { PHONES } from "@/lib/images";

const STEPS = [
  {
    n: "1",
    tag: "Entrada rápida",
    title: "Registrá en segundos",
    desc: "Anotá glucosa, insulina basal y rápida, gramos de carbohidratos, colaciones y tu estado de ánimo con un par de toques.",
    image: PHONES.snackLog,
    alt: "Pantalla real de registro de alimentos y carbohidratos SugarCoach",
    accent: "primary",
    badgeBg: "bg-[#C45CFF]/20 text-[#7100A5] dark:text-[#C45CFF] border-[#C45CFF]/30",
    tagColor: "text-[#006064] dark:text-[#2BC5C7] font-extrabold",
    hoverBorder: "hover:border-[#C45CFF]/40",
  },
  {
    n: "2",
    tag: "Historial claro",
    title: "Organizá tu día",
    desc: "El Daily Log agrupa cronológicamente almuerzos, cenas, correcciones y actividades con etiquetas de colores claros y comprensibles.",
    image: PHONES.dailyLogFull,
    alt: "Pantalla real Daily Log diario SugarCoach",
    accent: "secondary",
    badgeBg: "bg-[#2BC5C7]/20 text-[#006064] dark:text-[#2BC5C7] border-[#2BC5C7]/30",
    tagColor: "text-[#7100A5] dark:text-[#C45CFF] font-extrabold",
    hoverBorder: "hover:border-[#2BC5C7]/40",
  },
  {
    n: "3",
    tag: "Tratamiento claro",
    title: "Controlá tu esquema",
    desc: "Visualizá rangos personalizados (Hipo 70, Target 100, Híper 180 mg/dL), bombas o lapiceras y compartí el reporte con un clic.",
    image: PHONES.treatment,
    alt: "Pantalla real de tratamiento y rangos objetivos SugarCoach",
    accent: "tertiary",
    badgeBg: "bg-[#FF3FB4]/20 text-[#9E1679] dark:text-[#FF3FB4] border-[#FF3FB4]/30",
    tagColor: "text-[#9E1679] dark:text-[#FF3FB4] font-extrabold",
    hoverBorder: "hover:border-[#FF3FB4]/40",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#006064]/20 bg-[#006064]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#006064] dark:border-[#2BC5C7]/30 dark:bg-[#2BC5C7]/15 dark:text-[#2BC5C7] [.a11y_&]:border-2 [.a11y_&]:border-[#004d40] [.a11y_&]:bg-transparent [.a11y_&]:text-[#004d40]">
          Paso a paso con capturas reales
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Simple desde el primer día
        </h2>
        <p className="section-subtitle mt-3 max-w-xl text-center text-sm sm:text-base leading-relaxed">
          Sin curvas de aprendizaje complejas. Pantallas intuitivas con colores claros, íconos y respuestas inmediatas para tu día a día.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div
              className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line/15 bg-card shadow-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#0D1733] ${s.hoverBorder}`}
            >
              <div className="flex flex-col p-6 pb-0">
                <div className="mb-3 flex w-full items-center justify-between">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-extrabold ${s.badgeBg}`}
                  >
                    {s.n}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${s.tagColor}`}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body dark:text-[#A8B0C5]">
                  {s.desc}
                </p>
              </div>

              {/* Mockup con captura real */}
              <div className="mt-4 flex justify-center bg-gradient-to-b from-transparent to-black/20 px-6 pb-0 pt-4 dark:to-[#070D1F]">
                <div className="w-[210px] rounded-t-3xl border-x-2 border-t-2 border-line/15 bg-[#070D1F] p-2 shadow-xl transition-colors dark:border-white/[0.12]">
                  <div className="aspect-[9/13] overflow-hidden rounded-t-2xl bg-black">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      width={210}
                      height={300}
                      loading="lazy"
                      sizes="210px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
