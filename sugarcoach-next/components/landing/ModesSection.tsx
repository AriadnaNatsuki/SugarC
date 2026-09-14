"use client";

import { Accessibility, Check, MoonStar, SunMedium } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { THEME_LABELS, useTheme, type Theme } from "@/lib/theme";

// Inspirado en sugarcoach-app-landing-3-modos (2).html: Claro / Oscuro / Accesible.
// Cada tarjeta puede activar su modo en vivo.
const MODES: { value: Theme; icon: typeof SunMedium; title: string; desc: string }[] = [
  {
    value: "light",
    icon: SunMedium,
    title: "Modo Claro",
    desc: "Contraste suave para usar de día, con la misma jerarquía y calidez de SugarCoach.",
  },
  {
    value: "dark",
    icon: MoonStar,
    title: "Modo Oscuro",
    desc: "Nuestra identidad base: fondo #01081F con gradiente #DA44AF → #C747CA y glows sutiles.",
  },
  {
    value: "a11y",
    icon: Accessibility,
    title: "Modo Accesible",
    desc: "Alto contraste, focos visibles y tipografía ampliada para baja visión.",
  },
];

export function ModesSection() {
  const { theme, setTheme } = useTheme();
  return (
    <section className="w-full bg-alt py-14">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
          <Badge variant="brand" className="mb-2">3 modos de color</Badge>
          <h2 className="text-3xl font-extrabold tracking-tight">Legible para todas las miradas</h2>
          <p className="section-subtitle mt-2 leading-relaxed">Claro, oscuro y accesible: la misma historia, adaptada a tu comodidad visual.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {MODES.map((m, i) => {
            const active = theme === m.value;
            return (
              <Reveal key={m.title} delay={i * 0.06}>
                <Card className="h-full p-6">
                  <CardContent className="flex h-full flex-col gap-3 p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line/10 bg-gradient-to-br from-[#DA44AF]/30 to-[#155EB2]/30 text-ink">
                      <m.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">{m.title}</h3>
                    <p className="flex-1 text-sm text-body">{m.desc}</p>
                    <Button
                      type="button"
                      variant={active ? "gradient" : "outline"}
                      size="sm"
                      aria-pressed={active}
                      onClick={() => setTheme(m.value)}
                      className="mt-2 w-fit"
                    >
                      {active && <Check />}
                      {active ? `${THEME_LABELS[m.value]} activo` : `Activar ${THEME_LABELS[m.value].toLowerCase()}`}
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
