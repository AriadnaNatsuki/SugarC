"use client";

import Image from "next/image";
import { Sun, Utensils, Globe, Moon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PHONES } from "@/lib/images";

const MOMENTS = [
  {
    time: "07:30 • Antes de empezar",
    tag: "Desayuno",
    desc: "Revisás tu basal, anotás la glucosa en ayunas y sumás tus primeros puntos del día.",
    icon: Sun,
    iconBg: "bg-amber-400/15 border-amber-400/30 text-amber-700 dark:text-amber-300",
    badgeBg: "bg-amber-400/15 text-amber-800 dark:text-amber-300 border-amber-400/30",
  },
  {
    time: "12:30 • Hora del almuerzo",
    tag: "Carbohidratos",
    desc: "Cargás las porciones con fotos o gramos, la insulina rápida aplicada y tu estado de tranquilidad.",
    icon: Utensils,
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    time: "17:00 • Actividad y Movimiento",
    tag: "Planeta 3D",
    desc: "Elegí el nivel de tu tarde en el planeta interactivo: Sedentary, Moderate, Celebration o Intense.",
    icon: Globe,
    iconBg: "bg-teal-500/15 border-teal-500/30 text-[#006064] dark:text-[#2BC5C7]",
    badgeBg: "bg-teal-500/15 text-[#006064] dark:text-[#2BC5C7] border-teal-500/30",
  },
  {
    time: "21:30 • Noche y descanso",
    tag: "Tranquilidad",
    desc: "Tu Daily Log queda cerrado, tu familia notificada y todo ordenado para un descanso reparador.",
    icon: Moon,
    iconBg: "bg-indigo-500/15 border-indigo-500/30 text-[#7100A5] dark:text-[#C45CFF]",
    badgeBg: "bg-indigo-500/15 text-[#7100A5] dark:text-[#C45CFF] border-indigo-500/30",
  },
];

export function DailyMomentsSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]">
          Acompañamiento en cada momento
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          SugarCoach en tu día a día
        </h2>
        <p className="section-subtitle mt-3 max-w-xl text-center text-sm sm:text-base leading-relaxed">
          Desde la actividad física y los juegos hasta las colaciones, todo se registra de forma visual y divertida.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Teléfono con Pantalla de Actividad y Planeta 3D (IMAGE_13) */}
        <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
          <Reveal>
            <div className="relative w-[260px] sm:w-[290px] rounded-[40px] border-2 border-emerald-500/30 bg-[#070D1F] p-3 shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
              <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
              <div className="aspect-[9/19.5] overflow-hidden rounded-[28px] bg-[#3e683b]">
                <Image
                  src={PHONES.planetActivity}
                  alt="Pantalla real de actividad con planeta 3D SugarCoach"
                  width={290}
                  height={580}
                  loading="lazy"
                  sizes="(max-width: 640px) 260px, 290px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cuatro momentos del día */}
        <div className="order-1 flex flex-col gap-4 lg:order-2 lg:col-span-7">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.time} delay={i * 0.06}>
              <div className="group flex items-start gap-4 rounded-2xl border border-line/10 bg-card p-4 shadow-sm transition-all duration-300 hover:border-[#C45CFF]/40 dark:border-white/[0.08] dark:bg-[#0D1733] hover:dark:bg-[#111D3D]">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${m.iconBg}`}
                >
                  <m.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-ink">{m.time}</h4>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${m.badgeBg}`}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-body dark:text-[#A8B0C5]">
                    {m.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
