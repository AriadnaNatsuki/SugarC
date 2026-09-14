"use client";

import { HeartHandshake, Stethoscope, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";

const AUDIENCES = [
  {
    icon: HeartHandshake,
    tag: "Autonomía diaria",
    title: "Para vos",
    desc: "Registrá glucosa, insulina, carbohidratos y actividad en segundos. Ganá estrellas a tu propio compás.",
    footer: "116 mg/dL último valor • En rango",
  },
  {
    icon: Users,
    tag: "Tranquilidad compartida",
    title: "Para tu familia",
    desc: "Sincronización instantánea con cuidadores, sin llamadas insistentes ni invasión a la independencia.",
    footer: "Mamá y Papá sincronizados • En tiempo real",
  },
  {
    icon: Stethoscope,
    tag: "Consultas claras",
    title: "Para profesionales",
    desc: "Reportes TIR y curvas de glucosa vs. insulina para ajustar dosis con datos reales.",
    footer: "Tiempo en Rango: 70% • Reporte listo",
  },
];

export function DualAudienceSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-14 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
        <Badge variant="brand" className="mb-2">Doble audiencia</Badge>
        <h2 className="text-3xl font-extrabold tracking-tight">Pacientes y equipo de salud, conectados</h2>
        <p className="mt-2 text-body">El mismo registro ordenado sirve para cuidarte en casa y para conversar mejor en consulta.</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <Card className="flex h-full flex-col justify-between p-6">
              <CardContent className="flex flex-col gap-3 p-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line/10 bg-gradient-to-br from-[#DA44AF]/30 to-[#155EB2]/30 text-ink">
                  <a.icon className="h-7 w-7" />
                </div>
                <span className="w-fit rounded-full bg-tint/[0.06] px-3 py-1 text-[11px] font-bold text-ink">{a.tag}</span>
                <h3 className="text-[22px] font-bold">{a.title}</h3>
                <p className="text-[15px] text-body">{a.desc}</p>
              </CardContent>
              <div className="mt-6 rounded-2xl border border-line/[0.08] bg-alt p-3 text-xs font-bold text-ink">{a.footer}</div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
