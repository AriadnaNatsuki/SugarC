"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { OUR_STORY_PHOTO, TEAM_PHOTOS } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TEAM_IDS = ["isabel", "veronica", "debora", "agustina", "karin"] as const;
const TEAM_PHOTO_KEYS = ["isabel-berizzo", "veronica-avendano", "debora-biain", "agustina-olivo", "karin-chmiel"];

const GAP = 20;
const AUTOPLAY_MS = 5000;

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

/** "Nuestra Historia" + carrusel de equipo, calcados 1:1 de index.html (sección 10, id `quienes-somos`). */
export function OurStorySection() {
  const { t } = useLanguage();
  const members = TEAM_IDS.map((id, i) => ({
    id,
    photo: TEAM_PHOTOS[TEAM_PHOTO_KEYS[i]],
    role: t(`team.${id}.role`),
    name: t(`team.${id}.name`),
    description: t(`team.${id}.description`),
    badge1: t(`team.${id}.badge1`),
    badge2: t(`team.${id}.badge2`),
  }));

  const perView = useCardsPerView();
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxIndex = Math.max(0, members.length - perView);

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

  return (
    <section className="relative w-full border-y border-border-subtle bg-bg-canvas py-space-3xl" id="quienes-somos">
      <div className="mx-auto max-w-[1200px] px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="mx-auto mb-space-2xl flex max-w-3xl flex-col items-center text-center">
          <div className="mb-3 inline-flex w-fit items-center gap-space-xs rounded-full border border-border-subtle bg-surface-container px-space-md py-space-xs text-primary shadow-md backdrop-blur-md dark:text-primary-fixed-dim">
            <MaterialIcon name="diversity_1" className="text-primary" style={{ fontSize: 18 }} />
            <span className="font-label-md text-label-md font-bold tracking-tight text-on-surface">{t("team.eyebrow")}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">{t("team.title")}</h2>
        </div>

        <div className="relative mb-space-3xl overflow-hidden rounded-[32px] border border-border-subtle bg-surface-container p-space-xl shadow-2xl md:p-space-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border-2 border-border-subtle bg-bg-deep shadow-2xl">
                <Image
                  src={OUR_STORY_PHOTO}
                  alt="Equipo fundador y directivo de SugarCoach"
                  width={600}
                  height={450}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <span className="mt-2 block text-center text-xs italic text-text-secondary">{t("team.imageCaption")}</span>
            </div>
            <div className="order-1 flex flex-col gap-space-sm lg:order-2 lg:col-span-6">
              <div className="mb-2 h-1 w-10 rounded-full bg-gradient-to-r from-primary to-neon-magenta" />
              <p className="font-body-lg text-body-lg leading-relaxed text-on-surface">{t("team.story")}</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-bold text-primary dark:text-primary-fixed-dim">
                  <MaterialIcon name="favorite" style={{ fontSize: 22 }} />
                </div>
                <span className="text-sm font-semibold text-secondary dark:text-secondary-fixed-dim">{t("team.motto")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-6 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-secondary dark:text-secondary-fixed-dim">
            {t("team.peopleEyebrow")}
          </span>
          <h3 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">{t("team.peopleTitle")}</h3>
          <p className="mt-space-xs text-[17px] leading-relaxed text-text-secondary">{t("team.peopleDescription")}</p>
        </div>

        <div className="sc-team-carousel-wrap">
          <button className="sc-carousel-arrow sc-team-prev" type="button" aria-label="Integrante anterior" onClick={goPrev}>
            <MaterialIcon name="chevron_left" />
          </button>

          <div className="sc-team-viewport">
            <div className="sc-team-track" ref={trackRef} style={{ transform: `translateX(-${offset}px)` }}>
              {members.map((m) => (
                <article className="sc-team-card" key={m.id}>
                  <div className="sc-team-photo-wrap">
                    <Image src={m.photo} alt={m.name} width={400} height={220} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <span className="sc-team-role">{m.role}</span>
                  <h3>{m.name}</h3>
                  <p>{m.description}</p>
                  <div className="sc-team-tags">
                    <span>{m.badge1}</span>
                    <span>{m.badge2}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button className="sc-carousel-arrow sc-team-next" type="button" aria-label="Siguiente integrante" onClick={goNext}>
            <MaterialIcon name="chevron_right" />
          </button>
        </div>
        {maxIndex > 0 && (
          <div className="sc-carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver grupo ${i + 1}`}
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
