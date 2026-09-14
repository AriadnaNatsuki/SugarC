"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Download, Smartphone, ShoppingBag } from "lucide-react";
import { mockFaqs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { LOGO_EMBLEM_SRC } from "@/lib/images";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas-frecuentes" className="mx-auto max-w-[860px] px-4 py-16 md:px-6">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]">
          Despejá tus dudas
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Preguntas frecuentes
        </h2>
        <p className="section-subtitle mt-3 max-w-xl text-center text-sm sm:text-base leading-relaxed">
          Todo lo que necesitás saber sobre cómo SugarCoach se suma a tu rutina.
        </p>
      </Reveal>

      <div className="flex flex-col gap-3" id="faq-container">
        {mockFaqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.question}
              className="overflow-hidden rounded-2xl border border-line/15 bg-card shadow-sm transition-colors dark:border-white/[0.08] dark:bg-[#0D1733]"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-base font-bold text-ink">{f.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-brand-from dark:text-[#C45CFF]"
                  )}
                />
              </button>
              {isOpen && (
                <div className="border-t border-line/10 px-6 pb-5 pt-3 dark:border-white/[0.04]">
                  <p className="text-sm leading-relaxed text-body dark:text-[#A8B0C5]">{f.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="descargar" className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[40px] border border-line/15 bg-gradient-to-r from-[#172344] via-[#111D3D] to-[#0A1024] p-8 text-white shadow-2xl dark:border-white/[0.12] md:p-14">
          <GlowBlob color="purple" size={320} className="-right-20 -top-20" opacity={0.25} />
          <GlowBlob color="pink" size={320} className="-bottom-20 left-1/3" opacity={0.2} />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.08] px-3.5 py-1.5 text-xs font-bold text-[#C45CFF] backdrop-blur-sm">
                <span>✨</span> Empezá hoy mismo
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Tu día ya tiene suficientes cosas. Cuidarte puede ser{" "}
                <span className="text-brand-gradient">una menos complicada</span>.
              </h2>

              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#A8B0C5]">
                Registrá, sumá puntos, organizá tus mediciones y compartí tu información desde SugarCoach.
                Disponible gratis para iOS y Android.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a href="#descargar">
                  <Button variant="gradient" size="lg" className="w-full gap-2 sm:w-auto">
                    <Download className="h-5 w-5" /> Descargar SugarCoach gratis
                  </Button>
                </a>
              </div>

              {/* Badges de tiendas oficiales */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2 backdrop-blur-md">
                  <Smartphone className="h-5 w-5 text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] leading-tight text-[#747F9B]">Disponible en</span>
                    <span className="text-xs font-bold leading-tight text-white">App Store</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2 backdrop-blur-md">
                  <ShoppingBag className="h-5 w-5 text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] leading-tight text-[#747F9B]">Disponible en</span>
                    <span className="text-xs font-bold leading-tight text-white">Google Play</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Oficial de SugarCoach como Emblema en el CTA */}
            <div className="flex items-center justify-center lg:col-span-4">
              <div className="group relative flex h-52 w-52 items-center justify-center rounded-3xl border border-white/20 bg-[#111D3D]/60 p-6 shadow-[0_20px_50px_rgba(196,92,255,0.25)] backdrop-blur-xl transition-transform duration-300 hover:scale-105 md:h-64 md:w-64">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#C45CFF]/20 to-[#FF3FB4]/20 blur-xl"
                />
                <Image
                  src={LOGO_EMBLEM_SRC}
                  alt="SugarCoach Logo Oficial Emblema"
                  width={220}
                  height={220}
                  loading="lazy"
                  className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
