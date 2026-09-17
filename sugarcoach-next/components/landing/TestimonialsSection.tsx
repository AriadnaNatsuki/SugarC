"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "mariana-lopez",
    name: "Mariana López",
    role: "Paciente",
    rating: 5,
    quote:
      "Desde que uso SugarCoach siento que tengo más control sobre mi salud. La app es muy fácil de usar y me ayuda a mantener mis hábitos día a día. ¡Totalmente recomendada!",
  },
  {
    id: "diego-fernandez",
    name: "Diego Fernández",
    role: "Paciente",
    rating: 5,
    quote:
      "La plataforma me dio herramientas para entender mejor mi enfermedad y sentirme acompañado en todo el proceso. El equipo de profesionales es excelente.",
  },
  {
    id: "valentina-rojas",
    name: "Valentina Rojas",
    role: "Familiar",
    rating: 5,
    quote:
      "SugarCoach es una herramienta innovadora que nos permite acompañar a nuestros pacientes de forma más cercana y personalizada. La tecnología y el enfoque humano hacen la diferencia.",
  },
  {
    id: "sofia-acosta",
    name: "Sofía Acosta",
    role: "Paciente",
    rating: 5,
    quote:
      "Me ayuda a ordenar mis controles y a entender mejor mis rutinas. Sentir que hay un equipo detrás hace que todo sea mucho más llevadero.",
  },
  {
    id: "julian-mendez",
    name: "Julián Méndez",
    role: "Familiar",
    rating: 5,
    quote:
      "Los reportes me permiten llegar a la consulta con todo más claro y aprovechar mejor el tiempo con mi profesional.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items per view detection
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setPerView(1);
      } else if (w < 1024) {
        setPerView(2);
      } else {
        setPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = TESTIMONIALS.length;
  const maxTrackOffset = Math.max(0, totalCards - perView);

  // Track offset ensures the active card stays in view
  const trackOffset = Math.min(
    Math.max(0, activeIndex - Math.floor(perView / 2)),
    maxTrackOffset
  );

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === totalCards - 1;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(totalCards - 1, prev + 1));
  }, [totalCards]);

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCardClick = (cardIndex: number) => {
    setActiveIndex(cardIndex);
  };

  // Auto-play timer (cycles gently only when not hovered/interacting)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= totalCards - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, totalCards]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Track translation percentage
  const offsetPercentage = trackOffset * (100 / perView);

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-14 sm:py-18 lg:py-20"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-28 -right-28 h-[450px] w-[450px] rounded-full bg-primary/10 blur-3xl dark:bg-[#FF3FB4]/15 [.a11y_&]:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl dark:bg-[#732995]/20 [.a11y_&]:hidden"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
          <Badge variant="brand" className="mb-3 uppercase tracking-wider text-xs">
            Testimonios
          </Badge>
          <h2
            id="testimonials-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl text-headings text-ink"
          >
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] bg-clip-text text-transparent">
              pacientes
            </span>
          </h2>
          <p className="section-subtitle mt-3 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Historias reales de personas que eligen SugarCoach para cuidar su salud y ordenar su día a día.
          </p>
        </Reveal>

        {/* Carousel Container */}
        <Reveal delay={0.15}>
          <div
            ref={containerRef}
            tabIndex={0}
            role="region"
            aria-label="Carrusel de testimonios"
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="relative outline-none"
          >
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              {/* Prev Button — Large, Floating, No Background */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={isAtStart}
                aria-label="Testimonio anterior"
                className={cn(
                  "group hidden sm:flex shrink-0 items-center justify-center p-1 transition-all duration-300",
                  "bg-transparent border-0 text-ink/75 dark:text-white/85",
                  isAtStart
                    ? "opacity-25 cursor-not-allowed"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4] hover:scale-115 active:scale-95",
                  "drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_20px_rgba(255,63,180,0.6)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
                  "[.a11y_&]:text-black [.a11y_&]:drop-shadow-none"
                )}
              >
                <ChevronLeft className="h-12 w-12 lg:h-16 lg:w-16 stroke-[2] transition-transform duration-300 group-hover:-translate-x-1.5" />
              </button>

              {/* Viewport */}
              <div
                className="w-full overflow-hidden py-3 px-1 cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Track */}
                <div
                  className="flex -mx-2 sm:-mx-3 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform"
                  style={{
                    transform: `translateX(-${offsetPercentage}%)`,
                  }}
                >
                  {TESTIMONIALS.map((item, index) => {
                    const isActive = index === activeIndex;
                    const isVisible =
                      index >= trackOffset && index < trackOffset + perView;

                    return (
                      <div
                        key={item.id}
                        className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3"
                      >
                        <article
                          onClick={() => handleCardClick(index)}
                          className={cn(
                            "flex h-full flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all duration-500 ease-out",
                            "bg-card/90 dark:bg-gradient-to-b dark:from-[#0D1535]/95 dark:to-[#080E25]/95 backdrop-blur-sm",
                            "border cursor-pointer select-none",
                            isActive
                              ? "border-primary/80 dark:border-[#FF3FB4] shadow-[0_12px_35px_rgba(255,63,180,0.18)] dark:shadow-[0_0_30px_rgba(255,63,180,0.25)] -translate-y-1 opacity-100 scale-100 z-10 ring-1 ring-[#FF3FB4]/30 dark:ring-[#FF3FB4]/40"
                              : isVisible
                              ? "border-line/15 dark:border-white/[0.08] opacity-90 hover:opacity-100 scale-[0.98] shadow-sm"
                              : "border-line/10 dark:border-white/[0.04] opacity-35 scale-95 pointer-events-none",
                            "[.a11y_&]:opacity-100 [.a11y_&]:scale-100 [.a11y_&]:border-2 [.a11y_&]:border-line [.a11y_&]:shadow-none [.a11y_&]:bg-white"
                          )}
                        >
                          {/* Header: Name, Role, Stars (No avatar box) */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-extrabold text-ink text-base sm:text-lg leading-snug">
                                {item.name}
                              </h3>
                              <span className="text-xs font-semibold text-muted tracking-wide block mt-0.5">
                                {item.role}
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-1 shrink-0 pt-0.5"
                              aria-label={`${item.rating} de 5 estrellas`}
                            >
                              {[...Array(item.rating)].map((_, starIdx) => (
                                <Star
                                  key={starIdx}
                                  className="h-4 w-4 fill-amber-400 text-amber-400 dark:fill-[#FF3FB4] dark:text-[#FF3FB4]"
                                />
                              ))}
                            </div>
                          </div>

                          {/* Quote Body */}
                          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-body dark:text-[#E5E8F5]">
                            “{item.quote}”
                          </p>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Button — Large, Floating, No Background */}
              <button
                type="button"
                onClick={handleNext}
                disabled={isAtEnd}
                aria-label="Siguiente testimonio"
                className={cn(
                  "group hidden sm:flex shrink-0 items-center justify-center p-1 transition-all duration-300",
                  "bg-transparent border-0 text-ink/75 dark:text-white/85",
                  isAtEnd
                    ? "opacity-25 cursor-not-allowed"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4] hover:scale-115 active:scale-95",
                  "drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_20px_rgba(255,63,180,0.6)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
                  "[.a11y_&]:text-black [.a11y_&]:drop-shadow-none"
                )}
              >
                <ChevronRight className="h-12 w-12 lg:h-16 lg:w-16 stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>

            {/* Mobile Controls: Large floating buttons & dots */}
            <div className="mt-5 flex sm:hidden items-center justify-between px-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isAtStart}
                aria-label="Testimonio anterior"
                className={cn(
                  "flex items-center justify-center p-1 bg-transparent border-0 text-ink dark:text-white transition-transform",
                  isAtStart
                    ? "opacity-25 cursor-not-allowed"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4] active:scale-90",
                  "[.a11y_&]:text-black"
                )}
              >
                <ChevronLeft className="h-9 w-9 stroke-[2.2]" />
              </button>

              {/* Dots for mobile */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => handleDotClick(dotIdx)}
                    aria-label={`Ir al testimonio ${dotIdx + 1}`}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                      dotIdx === activeIndex
                        ? "w-7 bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] shadow-[0_0_10px_rgba(255,63,180,0.5)]"
                        : "w-2.5 bg-line/25 dark:bg-white/20 hover:bg-line/45 dark:hover:bg-white/40"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={isAtEnd}
                aria-label="Siguiente testimonio"
                className={cn(
                  "flex items-center justify-center p-1 bg-transparent border-0 text-ink dark:text-white transition-transform",
                  isAtEnd
                    ? "opacity-25 cursor-not-allowed"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4] active:scale-90",
                  "[.a11y_&]:text-black"
                )}
              >
                <ChevronRight className="h-9 w-9 stroke-[2.2]" />
              </button>
            </div>

            {/* Desktop Dots Navigation (one for each testimonial) */}
            <div
              className="mt-6 hidden sm:flex items-center justify-center gap-2.5"
              aria-label="Paginación de testimonios"
            >
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`Ir al testimonio de ${TESTIMONIALS[dotIdx].name}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    dotIdx === activeIndex
                      ? "w-8 bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] shadow-[0_0_12px_rgba(255,63,180,0.5)]"
                      : "w-2.5 bg-line/25 dark:bg-white/20 hover:bg-line/45 dark:hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
