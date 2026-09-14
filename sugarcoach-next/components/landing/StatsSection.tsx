"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart2, PieChart, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { PHONES } from "@/lib/images";

export function StatsSection() {
  return (
    <section id="profesionales" className="relative w-full overflow-hidden bg-alt/60 py-16 dark:bg-[#08122B]">
      {/* Halo ambiental */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#2BC5C7]/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Mockup izquierdo con captura real IMAGE_11 (Glucose vs Insulin & TIR 70%) */}
          <div className="order-2 flex justify-center lg:order-1 lg:col-span-6">
            <Reveal>
              <div className="relative w-[280px] sm:w-[310px] rounded-[42px] border-2 border-white/[0.16] bg-[#070D1F] p-3 shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
                <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
                <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black">
                  <Image
                    src={PHONES.glucoseVsInsulin}
                    alt="Pantalla real de estadísticas Glucose vs Insulin SugarCoach"
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

          {/* Contenido derecho */}
          <div className="order-1 flex flex-col gap-5 lg:order-2 lg:col-span-6">
            <Reveal>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line/10 bg-tint/[0.05] px-3.5 py-1.5 text-xs font-bold text-[#7100A5] shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]">
                <Stethoscope className="h-4 w-4" /> Diálogo médico fluido
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                Estadísticas claras para llevar a tu consulta
              </h2>

              <p className="section-subtitle mt-3 text-sm sm:text-base leading-relaxed">
                Olvidate de las libretas de papel dobladas o de intentar recordar qué pasó semanas atrás.
                SugarCoach genera gráficos mensuales automáticos:
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-2xl border border-line/10 bg-card p-3.5 dark:border-white/[0.08] dark:bg-[#0D1733]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2BC5C7]/30 bg-[#2BC5C7]/20 text-[#006064] dark:text-[#2BC5C7]">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-ink">
                      Tiempo en Rango (TIR) en anillo:
                    </span>
                    <span className="block text-xs leading-relaxed text-body dark:text-[#A8B0C5]">
                      Muestra exactamente el 70% en rango óptimo, hipo y valores sobre rango.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-line/10 bg-card p-3.5 dark:border-white/[0.08] dark:bg-[#0D1733]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C45CFF]/30 bg-[#C45CFF]/20 text-[#7100A5] dark:text-[#C45CFF]">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-ink">
                      Curvas cruzadas Glucosa vs. Insulina:
                    </span>
                    <span className="block text-xs leading-relaxed text-body dark:text-[#A8B0C5]">
                      Permite a tu diabetólogo/a ajustar dosis basales y correcciones con datos reales.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="#descargar">
                  <Button variant="gradient" size="default" className="gap-2">
                    Ver reportes completos <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
