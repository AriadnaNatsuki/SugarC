"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { PHONES } from "@/lib/images";

export function GamificationSection() {
  return (
    <section id="gamificacion" className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-gradient-to-br from-[#121A3B] via-[#0D1733] to-[#070D1F] p-8 shadow-2xl dark:border-white/[0.1] md:p-12">
          {/* Halos de luz de fondo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#C45CFF]/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 rounded-full bg-[#FF3FB4]/15 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Contenido izquierdo */}
            <div className="flex flex-col gap-5 lg:col-span-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold text-[#2BC5C7] backdrop-blur-md">
                <span>🎮</span> Gamificación respetuosa y humana
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl md:leading-tight">
                Cada pequeño hábito suma{" "}
                <span className="text-brand-gradient">puntos y estrellas</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#A8B0C5]">
                Inspirado en la psicología positiva: premiamos tu constancia y el compromiso de registrarte.{" "}
                <strong className="text-white font-semibold">Nunca juzgamos ni castigamos valores de glucosa</strong>,
                porque los números son información médica para cuidarte, no calificaciones morales.
              </p>

              {/* Badges de puntos y nivel */}
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#111D3D]/70 p-4 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/20 text-xl font-bold text-amber-300">
                    ⭐
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">+100 Puntos</h4>
                    <p className="text-xs text-[#A8B0C5]">Por cada registro diario completo</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#111D3D]/70 p-4 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/20 text-xl font-bold text-emerald-300">
                    🚀
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Startup Explorer</h4>
                    <p className="text-xs text-[#A8B0C5]">Subí de nivel con constancia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup derecho con captura real IMAGE_10 */}
            <div className="flex justify-center items-center lg:col-span-6">
              <div className="relative w-[270px] sm:w-[300px] rounded-[42px] border-2 border-white/[0.16] bg-[#070D1F] p-3 shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
                <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black shadow-inner">
                  <Image
                    src={PHONES.bravoPoints}
                    alt="Pantalla real SugarCoach Bravo +100 puntos y monstruo verde"
                    width={300}
                    height={600}
                    loading="lazy"
                    sizes="(max-width: 640px) 270px, 300px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
