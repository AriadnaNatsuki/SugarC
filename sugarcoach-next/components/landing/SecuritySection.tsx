"use client";

import { Lock, Shield, UserX } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const SECURITY_ITEMS = [
  {
    icon: Shield,
    title: "Privacidad por diseño",
    desc: "Tus registros viajan cifrados bajo estrictos estándares de ciberseguridad y resguardo de datos médicos.",
    iconBg: "bg-[#2BC5C7]/15 border-[#2BC5C7]/30 text-[#006064] dark:text-[#2BC5C7]",
    hoverBorder: "hover:border-[#2BC5C7]/40",
  },
  {
    icon: Lock,
    title: "Control de acceso",
    desc: "Vos decidís qué familiar o profesional tiene visibilidad. Podés revocar accesos en cualquier momento.",
    iconBg: "bg-[#C45CFF]/15 border-[#C45CFF]/30 text-[#7100A5] dark:text-[#C45CFF]",
    hoverBorder: "hover:border-[#C45CFF]/40",
  },
  {
    icon: UserX,
    title: "Sin comercialización",
    desc: "Tus datos no se venden a aseguradoras ni intermediarios. Son tuyos y de tus seres queridos.",
    iconBg: "bg-[#FF3FB4]/15 border-[#FF3FB4]/30 text-[#9E1679] dark:text-[#FF3FB4]",
    hoverBorder: "hover:border-[#FF3FB4]/40",
  },
];

export function SecuritySection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]">
          Confianza y serenidad
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Tus datos de salud protegidos
        </h2>
        <p className="section-subtitle mt-3 max-w-xl text-center text-sm sm:text-base leading-relaxed">
          La información médica merece la mayor privacidad. Diseñamos SugarCoach bajo principios éticos irrenunciables.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SECURITY_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <div
              className={`group flex h-full flex-col gap-4 rounded-3xl border border-line/15 bg-card p-6 shadow-sm transition-all duration-300 dark:border-white/[0.08] dark:bg-[#0D1733] ${item.hoverBorder}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${item.iconBg}`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-body dark:text-[#A8B0C5]">
                {item.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
