"use client";

import Image from "next/image";
import { ClipboardList, LineChart, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { PHONES } from "@/lib/images";

const STEPS = [
  {
    n: "1",
    tag: "Entrada rápida",
    icon: ClipboardList,
    title: "Registrá en segundos",
    desc: "Glucosa, insulina basal y rápida, gramos de carbohidratos, colaciones y ánimo con un par de toques.",
    image: PHONES.registro,
    alt: "Pantalla real de registro de alimentos y carbohidratos SugarCoach",
  },
  {
    n: "2",
    tag: "Historial claro",
    icon: LineChart,
    title: "Organizá tu día",
    desc: "El Daily Log agrupa almuerzos, cenas, correcciones y actividad con etiquetas de colores comprensibles.",
    image: PHONES.dailyLog,
    alt: "Pantalla real Daily Log diario SugarCoach",
  },
  {
    n: "3",
    tag: "Tratamiento claro",
    icon: Share2,
    title: "Controlá y compartí",
    desc: "Rangos Hipo 70 / Target 100 / Híper 180 mg/dL y reporte listo para compartir con un clic.",
    image: PHONES.treatment,
    alt: "Pantalla real de tratamiento y rangos objetivos SugarCoach",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative mx-auto max-w-[1200px] px-4 py-14 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
        <Badge variant="brand" className="mb-2">Paso a paso</Badge>
        <h2 className="text-3xl font-extrabold tracking-tight">Simple desde el primer día</h2>
        <p className="mt-2 text-body">Sin curvas de aprendizaje. Pantallas intuitivas con respuestas inmediatas.</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.07}>
            {/* code.html: `group hover:-translate-y-1 transition-all` + `hover:shadow-xl` */}
            <Card className="group h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="flex flex-col items-start gap-3 p-0">
                <div className="flex w-full items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-extrabold text-white">{s.n}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-body">{s.tag}</span>
                </div>
                <s.icon className="h-6 w-6 text-ink" />
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-sm text-body">{s.desc}</p>
                {/* Mockup con captura real (code.html) */}
                <div className="mt-4 flex w-full justify-center rounded-2xl border border-line/10 bg-gradient-to-b from-alt to-base px-6 pb-0 pt-4">
                  <div className="w-[200px] rounded-t-3xl border-x-2 border-t-2 border-line/15 bg-[#0d0926] p-2 shadow-xl transition-transform duration-300 group-hover:scale-[1.01]">
                    <div className="aspect-[9/13] overflow-hidden rounded-t-2xl bg-black">
                      <Image
                        src={s.image}
                        alt={s.alt}
                        width={200}
                        height={290}
                        loading="lazy"
                        sizes="200px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
