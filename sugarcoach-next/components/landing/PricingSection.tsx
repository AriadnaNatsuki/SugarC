"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { BillingPeriod } from "@/types";

interface PricingFeature {
  text: string;
  included: boolean;
}

const BASIC_FEATURES: PricingFeature[] = [
  { text: "Registro de glucemia", included: true },
  { text: "Dosis de insulina", included: true },
  { text: "Carbohidratos consumidos", included: true },
  { text: "Nivel de actividad diario", included: true },
  { text: "Estado de ánimo", included: true },
  { text: "Recompensas: fondos personalizables", included: true },
  { text: "Notificación SMS", included: false },
  { text: "Geolocalización", included: false },
  { text: "Control familiar", included: false },
  { text: "Acceso con tu médico", included: false },
];

const PREMIUM_FEATURES: PricingFeature[] = [
  { text: "Registro de glucemia", included: true },
  { text: "Dosis de insulina", included: true },
  { text: "Carbohidratos consumidos", included: true },
  { text: "Nivel de actividad diario", included: true },
  { text: "Estado de ánimo", included: true },
  { text: "Recompensas: fondos personalizables y tarjetas regalo Amazon, etc.", included: true },
  { text: "Notificación SMS", included: true },
  { text: "Geolocalización", included: true },
  { text: "Control familiar", included: true },
  { text: "Acceso con tu médico", included: true },
];

export function PricingSection() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section id="planes" className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
      {/* Header de la sección */}
      <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#7100A5]/20 bg-[#7100A5]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7100A5] dark:border-[#C45CFF]/30 dark:bg-[#C45CFF]/15 dark:text-[#C45CFF] [.a11y_&]:border-2 [.a11y_&]:border-[#2f1f9e] [.a11y_&]:bg-transparent [.a11y_&]:text-[#2f1f9e]">
          Elegí tu plan
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
          El plan que va con vos
        </h2>
        <p className="section-subtitle mt-3 max-w-xl text-center text-sm sm:text-base leading-relaxed">
          Accedé a todas las funciones y llevá el control de tu salud.
        </p>

        {/* Toggle Mensual / Anual */}
        <Tabs value={period} onValueChange={(v) => setPeriod(v as BillingPeriod)} className="mt-6">
          <TabsList aria-label="Periodo de facturación">
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual −17%</TabsTrigger>
          </TabsList>
        </Tabs>
      </Reveal>

      {/* Grid de 2 tarjetas: Basic y Premium */}
      <div className="mx-auto grid max-w-[1020px] grid-cols-1 gap-8 lg:grid-cols-2">
        {/* CARD 1: Basic */}
        <Reveal delay={0.06}>
          <article
            className="flex h-full flex-col justify-between rounded-3xl border border-line/15 bg-card p-7 shadow-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#13112E] md:p-9 [.a11y_&]:border-2 [.a11y_&]:border-black dark:[.a11y_&]:border-white [.a11y_&]:bg-white dark:[.a11y_&]:bg-[#071126]"
          >
            <div>
              <h3 className="font-serif text-3xl font-bold text-ink">Basic</h3>
              <div className="mb-6 mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-ink md:text-5xl">
                  0 USD
                </span>
                <span className="text-sm font-medium text-muted dark:text-slate-400 [.a11y_&]:text-black dark:[.a11y_&]:text-white">
                  /{period === "monthly" ? "mes" : "año"}
                </span>
              </div>

              {/* Lista de características */}
              <ul className="flex flex-col" role="list">
                {BASIC_FEATURES.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3.5 border-b border-line/10 py-3 text-sm last:border-b-0 dark:border-white/[0.08] [.a11y_&]:border-slate-300 dark:[.a11y_&]:border-slate-700"
                  >
                    {item.included ? (
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 [.a11y_&]:border-2 [.a11y_&]:border-emerald-700 [.a11y_&]:bg-emerald-100 [.a11y_&]:text-emerald-900 dark:[.a11y_&]:border-emerald-400 dark:[.a11y_&]:bg-emerald-950 dark:[.a11y_&]:text-emerald-300"
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                    ) : (
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/10 text-rose-400/80 [.a11y_&]:border-2 [.a11y_&]:border-rose-700 [.a11y_&]:bg-rose-100 [.a11y_&]:text-rose-900 dark:[.a11y_&]:border-rose-400 dark:[.a11y_&]:bg-rose-950 dark:[.a11y_&]:text-rose-300"
                        aria-hidden
                      >
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                    )}
                    <span
                      className={
                        item.included
                          ? "font-medium text-ink"
                          : "text-muted line-through opacity-60 dark:text-[#747F9B] [.a11y_&]:text-slate-600 [.a11y_&]:opacity-80"
                      }
                    >
                      <span className="sr-only">{item.included ? "Incluido: " : "No incluido: "}</span>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Button variant="outline" size="lg" className="w-full font-bold">
                Descargar gratis
              </Button>
            </div>
          </article>
        </Reveal>

        {/* CARD 2: Premium (Recomendado) */}
        <Reveal delay={0.12}>
          <article
            id="premium"
            className="relative flex h-full flex-col justify-between rounded-3xl border-2 border-[#E2A632]/80 bg-card p-7 shadow-[0_0_30px_rgba(226,166,50,0.15)] transition-all duration-300 dark:border-[#E2A632] dark:bg-[#13112E] md:p-9 [.a11y_&]:border-4 [.a11y_&]:border-[#E2A632] [.a11y_&]:bg-white dark:[.a11y_&]:bg-[#071126]"
          >
            {/* Badge flotante Recomendado en la esquina superior derecha */}
            <span className="absolute -top-3.5 right-6 rounded-full bg-[#E2A632] px-4 py-1 text-xs font-extrabold text-white shadow-md [.a11y_&]:bg-black [.a11y_&]:text-white [.a11y_&]:border-2 [.a11y_&]:border-white dark:[.a11y_&]:bg-white dark:[.a11y_&]:text-black">
              Recomendado
            </span>

            <div>
              <h3 className="font-serif text-3xl font-bold text-ink">Premium</h3>
              <div className="mb-6 mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-ink md:text-5xl">
                  {period === "monthly" ? "5 USD" : "50 USD"}
                </span>
                <span className="text-sm font-medium text-muted dark:text-slate-400 [.a11y_&]:text-black dark:[.a11y_&]:text-white">
                  /{period === "monthly" ? "mes" : "año"}
                </span>
              </div>

              {/* Lista de características (todas incluidas) */}
              <ul className="flex flex-col" role="list">
                {PREMIUM_FEATURES.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3.5 border-b border-line/10 py-3 text-sm last:border-b-0 dark:border-white/[0.08] [.a11y_&]:border-slate-300 dark:[.a11y_&]:border-slate-700"
                  >
                    <div
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 [.a11y_&]:border-2 [.a11y_&]:border-emerald-700 [.a11y_&]:bg-emerald-100 [.a11y_&]:text-emerald-900 dark:[.a11y_&]:border-emerald-400 dark:[.a11y_&]:bg-emerald-950 dark:[.a11y_&]:text-emerald-300"
                      aria-hidden
                    >
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <span className="font-medium text-ink">
                      <span className="sr-only">Incluido: </span>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Button variant="gradient" size="lg" className="w-full font-bold shadow-lg">
                Comenzar con Premium
              </Button>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
