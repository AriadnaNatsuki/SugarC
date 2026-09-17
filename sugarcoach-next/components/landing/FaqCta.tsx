"use client";

import { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import Link from "next/link";
import { mockFaqs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/Logo";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { cn } from "@/lib/utils";

export function FaqSection() {
  // Acordeón fiel a code.html: single-open, primer item abierto,
  // icono con `transition-transform` y rotate(180deg) al abrir.
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-[860px] px-4 py-14 md:px-6">
      <Reveal className="mb-8 flex flex-col items-center text-center">
        <Badge variant="brand" className="mb-2">Despejá tus dudas</Badge>
        <h2 className="text-3xl font-extrabold tracking-tight">Preguntas frecuentes</h2>
      </Reveal>
      <div className="flex flex-col gap-2" id="faq-container">
        {mockFaqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.question} className="faq-item glass-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="faq-btn flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none"
              >
                <span className="font-bold text-ink">{f.question}</span>
                <ChevronDown
                  className={cn(
                    "faq-icon h-5 w-5 shrink-0 text-body transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && <p className="faq-content px-5 pb-5 text-[15px] text-body">{f.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="descargar" className="mx-auto max-w-[1200px] px-4 py-14 md:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[40px] border border-[#DA44AF]/25 bg-gradient-to-br from-alt via-card to-[#732995]/40 p-8 shadow-2xl md:p-14">
          <GlowBlob color="pink" size={320} className="right-[-100px] top-[-100px]" opacity={0.25} />
          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-8">
              <Badge variant="brand" className="w-fit">✨ Empezá hoy mismo</Badge>
              <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
                Tu día ya tiene suficientes cosas. Cuidarte puede ser una menos complicada.
              </h2>
              <p className="max-w-2xl text-body">
                Registrá, sumá puntos, organizá tus mediciones y compartí tu información desde SugarCoach. Disponible gratis para iOS y Android.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link href="/register">
                  <Button variant="gradient" size="lg"><Download /> Descargar SugarCoach gratis</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-4">
              <div className="relative flex h-52 w-52 items-center justify-center rounded-3xl border border-line/20 bg-tint/10 p-4 shadow-2xl backdrop-blur md:h-64 md:w-64">
                <Logo width={200} height={60} className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
