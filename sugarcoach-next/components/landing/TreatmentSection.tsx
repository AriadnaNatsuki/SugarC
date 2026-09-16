"use client";

import Image from "next/image";
import { Sliders } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PHONES } from "@/lib/images";

export function TreatmentSection() {
  return (
    <section id="tratamiento" className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Contenido derecho */}
        <div className="order-1 flex flex-col gap-5 lg:order-2 lg:col-span-6">
          <Reveal>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line/10 bg-tint/[0.05] px-3.5 py-1.5 text-xs font-bold text-[#006064] shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]">
              <Sliders className="h-4 w-4" /> Tratamiento individualizado
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Personalizá tus rangos y modo de terapia
            </h2>

            <p className="section-subtitle mt-3 text-sm sm:text-base leading-relaxed">
              Cada tratamiento es único. En la sección <strong className="text-ink font-semibold">Treatment</strong>{" "}
              configurás tus objetivos de glucosa con máxima claridad y seleccionás si usás lapiceras o bomba de insulina.
            </p>

            {/* 3 Bloques métricos: Hipo, Target, Hyper */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-cyan-500/30 bg-card p-3 dark:bg-[#0D1733]">
                <span className="block text-xs font-bold text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]">HIPO</span>
                <span className="text-2xl font-extrabold text-ink">70</span>
                <span className="block text-[11px] text-muted">mg/dL</span>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-card p-3 dark:bg-[#0D1733]">
                <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 [.a11y_&]:text-emerald-900">TARGET</span>
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 [.a11y_&]:text-emerald-900">100</span>
                <span className="block text-[11px] text-muted">mg/dL</span>
              </div>

              <div className="rounded-2xl border border-rose-500/30 bg-card p-3 dark:bg-[#0D1733]">
                <span className="block text-xs font-bold text-rose-700 dark:text-rose-400 [.a11y_&]:text-rose-900">HYPER</span>
                <span className="text-2xl font-extrabold text-rose-700 dark:text-rose-400 [.a11y_&]:text-rose-900">180</span>
                <span className="block text-[11px] text-muted">mg/dL</span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-body dark:text-[#A8B0C5]">
              Compatible con múltiples marcas de insulina (Novolin R, Lantus, Humalog, Fiasp, etc.) y esquemas flexibles de aplicación.
            </p>
          </Reveal>
        </div>

        {/* Mockup izquierdo con captura real IMAGE_12 */}
        <div className="order-2 flex justify-center lg:order-1 lg:col-span-6">
          <Reveal delay={0.1}>
            <div className="relative w-[280px] sm:w-[310px] rounded-[42px] border-2 border-white/[0.16] bg-[#070D1F] p-3 shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
              <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
              <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black">
                <Image
                  src={PHONES.treatmentSettings}
                  alt="Pantalla real de configuración de tratamiento e insulina SugarCoach"
                  width={310}
                  height={620}
                  loading="lazy"
                  sizes="(max-width: 640px) 280px, 310px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
