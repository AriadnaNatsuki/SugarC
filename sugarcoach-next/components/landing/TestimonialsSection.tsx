"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TESTIMONIAL_IDS = [1, 2, 3, 4, 5] as const;
const AVATAR_CLASSES = ["avatar-a", "avatar-b", "avatar-c", "avatar-d", "avatar-e"];
const TAG_ICONS = ["favorite", "person", "family_restroom", "insights", "description"];

const GAP = 20;
const AUTOPLAY_MS = 5500;

function initialsOf(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function useCardsPerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

/** Testimonios, calcados 1:1 de index.html (sección 11, id `testimonios`). */
export function TestimonialsSection() {
  const { t } = useLanguage();
  const items = TESTIMONIAL_IDS.map((n, i) => ({
    id: n,
    name: t(`testimonial.${n}.name`),
    role: t(`testimonial.${n}.role`),
    quote: t(`testimonial.${n}.quote`),
    tag: t(`testimonial.${n}.tag`),
    avatarClass: AVATAR_CLASSES[i],
    tagIcon: TAG_ICONS[i],
  }));

  const perView = useCardsPerView();
  const [index, setIndex] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxIndex = Math.max(0, items.length - perView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (maxIndex > 0) {
      timerRef.current = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), AUTOPLAY_MS);
    }
  }, [maxIndex]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const goPrev = () => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
    restartTimer();
  };
  const goNext = () => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    restartTimer();
  };

  const cardWidth = trackRef.current?.children[0]?.getBoundingClientRect().width ?? 0;
  const offset = index * (cardWidth + GAP);
  const activeInView = index + Math.floor((perView - 1) / 2);

  return (
    <section
      id="testimonios"
      className="relative py-space-3xl"
      style={{ background: "linear-gradient(180deg, var(--c-bg-canvas) 0%, var(--c-surface-container-low) 100%)", color: "var(--c-on-surface)" }}
    >
      <div className="relative z-10 mx-auto max-w-[1200px] px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="mx-auto mb-space-2xl max-w-3xl text-center">
          <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("testimonials.eyebrow")}</span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">
            <span>{t("testimonials.titlePrefix")}</span>
            <span className="gradient-text">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="mt-space-xs font-body-md text-body-md text-text-secondary">{t("testimonials.description")}</p>
        </div>

        <div className="sc-team-carousel-wrap mt-8">
          <button className="sc-carousel-arrow sc-test-prev" type="button" aria-label="Testimonio anterior" onClick={goPrev}>
            <MaterialIcon name="chevron_left" />
          </button>

          <div className="sc-team-viewport">
            <div className="sc-team-track" ref={trackRef} style={{ transform: `translateX(-${offset}px)` }}>
              {items.map((item, i) => (
                <article key={item.id} className={cn("sc-test-card", i === activeInView && "is-active")}>
                  <div className="sc-person">
                    <div className={cn("sc-avatar", item.avatarClass)}>{initialsOf(item.name)}</div>
                    <div>
                      <h3 className="font-headline-sm font-bold text-text-primary">{item.name}</h3>
                      <span className="text-xs text-text-secondary">{item.role}</span>
                      <div className="sc-stars">★★★★★</div>
                    </div>
                  </div>
                  <div className="sc-quote">&ldquo;{item.quote}&rdquo;</div>
                  <div className="sc-test-tag">
                    <MaterialIcon name={item.tagIcon} style={{ fontSize: 16 }} /> <span>{item.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button className="sc-carousel-arrow sc-test-next" type="button" aria-label="Siguiente testimonio" onClick={goNext}>
            <MaterialIcon name="chevron_right" />
          </button>
        </div>
        {maxIndex > 0 && (
          <div className="sc-carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver testimonio ${i + 1}`}
                className={cn("sc-carousel-dot", i === index && "active")}
                onClick={() => {
                  setIndex(i);
                  restartTimer();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
