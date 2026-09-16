"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  area?: string;
  image: string;
  bio?: string;
  tags?: string[];
}

export type TeamShowcaseMember = TeamMember;

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Chadrack",
    role: "Director of Photography",
    area: "Fotografía & Video",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Mak VieSAinte",
    role: "CEO Founder",
    area: "Liderazgo & Producto",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Osiris Balonga",
    role: "Lead Front-End",
    area: "Ingeniería de Software",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    name: "Jacques",
    role: "Product Owner",
    area: "Gestión de Producto",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    name: "Riche Makso",
    role: "CTO & Product Designer",
    area: "Arquitectura & UX",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
];

export interface TeamShowcaseProps {
  members?: TeamMember[];
  className?: string;
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS, className }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Distribución balanceada 2-1-2 para 5 miembros
  const isFiveMembers = members.length === 5;
  const col1 = isFiveMembers
    ? [members[0], members[2]]
    : members.filter((_, i) => i % 3 === 0);
  const col2 = isFiveMembers
    ? [members[1]]
    : members.filter((_, i) => i % 3 === 1);
  const col3 = isFiveMembers
    ? [members[3], members[4]]
    : members.filter((_, i) => i % 3 === 2);

  return (
    <div
      data-team-showcase="true"
      className={cn(
        "flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 select-none w-full max-w-6xl mx-auto py-6 px-3 sm:px-6 md:px-8 font-sans overflow-visible",
        className,
      )}
    >
      {/* ── Left: photo gallery ── */}
      <div className="flex gap-4 sm:gap-5 md:gap-6 flex-shrink-0 p-3 max-w-full justify-center overflow-visible">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[135px] sm:w-[138px] sm:h-[158px] md:w-[158px] md:h-[180px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 (centrada verticalmente) */}
        <div
          className={cn(
            "flex flex-col gap-4 sm:gap-5 md:gap-6",
            isFiveMembers
              ? "mt-[60px] sm:mt-[72px] md:mt-[85px]"
              : "mt-[36px] sm:mt-[46px] md:mt-[56px]",
          )}
        >
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className={cn(
                isFiveMembers
                  ? "w-[122px] h-[142px] sm:w-[145px] sm:h-[168px] md:w-[166px] md:h-[192px]"
                  : "w-[120px] h-[140px] sm:w-[142px] sm:h-[164px] md:w-[162px] md:h-[185px]",
              )}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 mt-[18px] sm:mt-[24px] md:mt-[28px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[135px] sm:w-[138px] sm:h-[158px] md:w-[158px] md:h-[180px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member names list (sin redes sociales, con indicadores estilizados de marca) ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3.5 md:gap-4 pt-2 lg:pt-6 flex-1 w-full max-w-lg overflow-visible">
        {members.map((member, idx) => (
          <MemberRow
            key={member.id}
            member={member}
            index={idx}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card
   - Modo estándar: dimensiones fijas, zoom interior de la imagen sin layout-shift.
   - Modo accesibilidad (.a11y): data-active="true" dispara scale(1.22) exterior para baja visión.
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      tabIndex={0}
      role="button"
      data-team-photo="true"
      data-active={isActive ? "true" : "false"}
      aria-label={`Ver integrante ${member.name}`}
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer flex-shrink-0 transition-all duration-300 border border-line/15 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA44AF]",
        className,
        isDimmed ? "opacity-40" : "opacity-100",
        isActive
          ? "ring-2 ring-[#DA44AF] shadow-brand-glow border-[#DA44AF]/80 z-10"
          : "hover:border-[#DA44AF]/40 hover:shadow-md",
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(member.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onHover(member.id);
        }
      }}
    >
      <img
        src={member.image}
        alt={member.name}
        className={cn(
          "w-full h-full object-cover object-top transition-transform duration-500",
          isActive ? "scale-108" : "scale-100",
        )}
        style={{
          filter: isActive ? "grayscale(0) brightness(1.02)" : "grayscale(1) brightness(0.82)",
        }}
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=da44af&color=fff&size=256`;
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member row (diseño editorial propio de SugarCoach)
───────────────────────────────────────── */

function MemberRow({
  member,
  index,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  index: number;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={member.name}
      className={cn(
        "group cursor-pointer transition-all duration-300 rounded-2xl p-3 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA44AF]",
        isDimmed ? "opacity-40" : "opacity-100",
        isActive
          ? "bg-base/80 dark:bg-white/[0.05] border-line/15 dark:border-white/[0.08] shadow-sm"
          : "hover:bg-base/40 dark:hover:bg-white/[0.02]",
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(member.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onHover(member.id);
        }
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Indicador estilizado de marca (punto dinámico con gradiente) */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                isActive
                  ? "w-5 bg-brand-gradient shadow-[0_0_12px_rgba(218,68,175,0.7)]"
                  : "w-2.5 bg-line/40 group-hover:bg-line/70",
              )}
            />
            <span className="text-[11px] font-mono font-bold text-muted/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <span
            className={cn(
              "text-base md:text-[17px] font-bold tracking-tight transition-colors duration-200",
              isActive ? "text-ink" : "text-ink/80 group-hover:text-ink",
            )}
          >
            {member.name}
          </span>
        </div>

        {/* Badge de área / especialidad en lugar de redes */}
        {member.area && (
          <span
            className={cn(
              "hidden sm:inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
              isActive
                ? "border-[#DA44AF]/40 bg-[#DA44AF]/15 text-ink font-extrabold dark:text-pink-300"
                : "border-line/10 bg-base/50 text-muted group-hover:border-line/20",
            )}
          >
            {member.area}
          </span>
        )}
      </div>

      {/* Role */}
      <p className="mt-1 pl-[38px] text-xs font-semibold text-muted dark:text-[#A8B0C5]">
        {member.role}
      </p>
    </div>
  );
}

export { TeamShowcase };
