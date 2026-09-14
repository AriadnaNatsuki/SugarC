"use client";

import { BarChart3, Heart, ShieldCheck, Sparkles, Stethoscope, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: Heart,
    tag: "Autonomía diaria",
    title: "Registrá en segundos",
    desc: "Glucosa, insulina basal y rápida, carbohidratos, comidas y actividad física con un par de toques.",
  },
  {
    icon: Sparkles,
    tag: "Gamificación positiva",
    title: "Sumá puntos y estrellas",
    desc: "Premiamos tu constancia (+100 pts por registro). Nunca juzgamos valores: son información, no notas.",
  },
  {
    icon: Users,
    tag: "Tranquilidad compartida",
    title: "Familia sincronizada",
    desc: "Mantené conectadas a las personas de tu cuidado, sin llamadas insistentes ni invasión.",
  },
  {
    icon: BarChart3,
    tag: "Consultas claras",
    title: "Tiempo en Rango (TIR)",
    desc: "Gráficos mensuales de 70% en rango y curvas de glucosa vs. insulina para tu diabetólogo/a.",
  },
  {
    icon: Stethoscope,
    tag: "Tratamiento claro",
    title: "Rangos personalizados",
    desc: "Hipo 70, Target 100, Híper 180 mg/dL. Compatible con lapiceras o bomba de insulina.",
  },
  {
    icon: ShieldCheck,
    tag: "Privacidad por diseño",
    title: "Datos protegidos",
    desc: "Cifrado, control de accesos revocable y cero venta de datos a terceros.",
  },
];

export function FeaturesSection() {
  return (
    <section id="familias" className="relative w-full overflow-hidden bg-alt py-14">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
          <Badge variant="brand" className="mb-2">Diseñado para convivir</Badge>
          <h2 className="text-3xl font-extrabold tracking-tight">Una app, distintas formas de acompañar</h2>
          <p className="mt-2 text-body">
            Porque cada persona vive el cuidado desde un lugar diferente, SugarCoach se adapta con empatía, precisión y autonomía.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <Card className="h-full p-6">
                <CardContent className="flex flex-col gap-3 p-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line/10 bg-gradient-to-br from-[#DA44AF]/30 to-[#155EB2]/30 text-ink">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <span className="w-fit rounded-full border border-line/10 bg-tint/[0.06] px-3 py-1 text-[11px] font-bold text-ink">{f.tag}</span>
                  <h3 className="text-[22px] font-bold leading-[30px]">{f.title}</h3>
                  <p className="text-[15px] leading-6 text-body">{f.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
