"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { mockTeam } from "@/lib/mock-data";
import TeamShowcase, { type TeamMember } from "@/components/ui/team-showcase";

// Integrantes mapeados para el showcase interactivo
const TEAM_SHOWCASE_MEMBERS: TeamMember[] = mockTeam.map((m) => ({
  id: m.id,
  name: m.name,
  role: m.role,
  area: m.area,
  image: m.photo,
  bio: m.bio,
  tags: m.tags,
}));

// Sección "Quiénes somos" — showcase interactivo de todo el equipo
export function AboutSection() {
  return (
    <section id="quienes-somos" className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
        <Badge variant="brand" className="mb-2">Quiénes somos</Badge>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Conocé a nuestro equipo</h2>
        <p className="section-subtitle mt-3 leading-relaxed">
          Nacimos de una historia real: hecho por familias, para familias. Liderazgo tecnológico,
          compromiso médico y vivencia directa en cada decisión.
        </p>
      </Reveal>

      <Reveal>
        <div
          data-team-showcase-container="true"
          className="rounded-3xl border border-line/10 bg-card/60 p-4 sm:p-8 lg:p-10 shadow-sm dark:border-white/[0.08] dark:bg-[#070F26]/70 backdrop-blur-sm overflow-hidden [.a11y_&]:overflow-visible"
        >
          <TeamShowcase members={TEAM_SHOWCASE_MEMBERS} />
        </div>
      </Reveal>
    </section>
  );
}
