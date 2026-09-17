"use client";

import { useRef } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";

const LOGOS = [
  { file: "endeavor-1650x1650-removebg-preview.png", alt: "Endeavor", key: "awards.endeavor" },
  { file: "AWS_Simple_Icons_AWS_Cloud.svg.png", alt: "AWS", key: "awards.aws" },
  { file: "hit_cowork-removebg-preview.png", alt: "Hit Cowork", key: "awards.hit" },
  { file: "wise-removebg-preview.png", alt: "WISE", key: "awards.wise" },
  { file: "bid.png", alt: "BID", key: "awards.bid" },
  { file: "NAVES.png", alt: "Naves IAE", key: "awards.naves" },
  { file: "googleforstartups-removebg-preview.png", alt: "Google for Startups", key: "awards.google" },
  { file: "huawei-removebg-preview.png", alt: "Huawei", key: "awards.huawei" },
  { file: "samsung-removebg-preview.png", alt: "Samsung", key: "awards.samsung" },
  { file: "globant.png", alt: "Globant", key: "awards.globant" },
  { file: "1630627507837.jpeg", alt: "Entrepreneurship World Cup", key: "awards.ewc" },
];

/** Reconocimientos, calcada 1:1 de index.html (sección 9, id `reconocimientos`). */
export function AwardsSection() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  function nudge(direction: "prev" | "next") {
    const track = trackRef.current;
    if (!track) return;
    const amount = 206;
    const style = getComputedStyle(track);
    let x = 0;
    if (style.transform && style.transform !== "none") {
      const match = /matrix\(([^)]+)\)/.exec(style.transform);
      if (match) x = parseFloat(match[1].split(",")[4]) || 0;
    }
    track.style.animation = "none";
    track.style.transform = `translateX(${x + (direction === "next" ? -amount : amount)}px)`;
    window.setTimeout(() => {
      track.style.transform = "";
      track.style.animation = "";
    }, 650);
  }

  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop" id="reconocimientos">
      <div className="sc-awards-shell">
        <div className="mx-auto mb-4 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("awards.eyebrow")}</span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">{t("awards.title")}</h2>
          <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">{t("awards.description")}</p>
        </div>

        <div className="sc-awards-marquee-wrap" aria-label="Programas y entidades aliadas">
          <div className="sc-awards-track" ref={trackRef}>
            {[0, 1].map((dup) =>
              LOGOS.map((logo) => (
                <div className="sc-award-item" key={`${dup}-${logo.file}`}>
                  <Image
                    src={`/contenido/iconos/${logo.file}`}
                    alt={logo.alt}
                    width={140}
                    height={48}
                    loading="lazy"
                    className="max-h-12 w-auto object-contain"
                  />
                  <span className="mt-1 text-xs font-semibold text-text-secondary">{t(logo.key)}</span>
                </div>
              )),
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button className="sc-award-arrow" type="button" aria-label="Reconocimientos anteriores" onClick={() => nudge("prev")}>
            <MaterialIcon name="chevron_left" />
          </button>
          <button className="sc-award-arrow" type="button" aria-label="Siguientes reconocimientos" onClick={() => nudge("next")}>
            <MaterialIcon name="chevron_right" />
          </button>
        </div>
      </div>
    </section>
  );
}
