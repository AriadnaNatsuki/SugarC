"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { TeamPhoto } from "@/components/ui/TeamPhoto";
import { mockTeam } from "@/lib/mock-data";

// Sección "Quiénes somos" — integrantes tomados de fileSobreNosotros.html
// ("Conocé a nuestro equipo": Isabel, Veronica, Debora, Agustina, Karin).
export function AboutSection() {
  const [founder, ...team] = mockTeam;

  return (
    <section id="quienes-somos" className="mx-auto max-w-[1200px] px-4 py-14 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
        <Badge variant="brand" className="mb-2">Quiénes somos</Badge>
        <h2 className="text-3xl font-extrabold tracking-tight">Nacimos de una historia real</h2>
        <p className="mt-2 text-body">
          Hecho por familias, para familias. Liderazgo tecnológico, ingeniería,
          compromiso social y vivencia directa en cada decisión.
        </p>
      </Reveal>

      {/* Fundadora destacada */}
      <Reveal>
        <Card className="group mb-4 flex flex-col gap-6 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/40 sm:flex-row sm:items-center md:p-8">
          <TeamPhoto
            name={founder.name}
            photo={founder.photo}
            initials={founder.initials}
            className="h-44 w-36 shrink-0 border-2 border-[#DA44AF]/40 shadow-brand-glow"
          />
          <CardContent className="flex flex-1 flex-col gap-2 p-0">
            <span className="w-fit rounded-full border border-[#DA44AF]/30 bg-[#DA44AF]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              {founder.area}
            </span>
            <h3 className="text-2xl font-bold">{founder.name}</h3>
            <span className="text-[15px] font-semibold text-ink/80">{founder.role}</span>
            <p className="text-[16px] leading-relaxed text-body">{founder.bio}</p>
            <div className="mt-2 flex flex-wrap gap-2 border-t border-line/10 pt-3">
              {founder.tags.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Resto del equipo */}
      <div className="mb-8 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-2">Talento y corazón</Badge>
        <h3 className="text-2xl font-extrabold tracking-tight">Conocé a nuestro equipo</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {team.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.06}>
            <Card className="group flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/40 sm:flex-row sm:items-start">
              <TeamPhoto
                name={m.name}
                photo={m.photo}
                initials={m.initials}
                className="h-44 w-36 shrink-0"
              />
              <CardContent className="flex flex-1 flex-col gap-2 p-0">
                <span className="w-fit rounded-full border border-line/15 bg-tint/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                  {m.area}
                </span>
                <h4 className="text-xl font-bold">{m.name}</h4>
                <span className="text-sm font-semibold uppercase tracking-wider text-ink/70">{m.role}</span>
                <p className="text-sm leading-relaxed text-body">{m.bio}</p>
                <div className="mt-2 flex flex-wrap gap-2 border-t border-line/10 pt-3">
                  {m.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
