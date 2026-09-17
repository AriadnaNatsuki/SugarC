"use client";

import Image from "next/image";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";

const STEP_IMAGES = [
  { image: PHONES.registro, alt: "Pantalla real de registro de alimentos y carbohidratos SugarCoach" },
  { image: PHONES.dailyLog, alt: "Pantalla real Daily Log diario SugarCoach" },
  { image: PHONES.treatmentSteps, alt: "Pantalla real de tratamiento y rangos objetivos SugarCoach" },
];

// Clases completas y literales (Tailwind no genera CSS para clases armadas con template strings).
const STEP_STYLES = [
  {
    cardHover: "hover:border-primary/40",
    numberWrap: "border-primary/30 bg-primary/20 text-primary",
    badgeText: "text-secondary",
    mockupHover: "group-hover:border-primary/40",
  },
  {
    cardHover: "hover:border-secondary/40",
    numberWrap: "border-secondary/30 bg-secondary/20 text-secondary",
    badgeText: "text-primary",
    mockupHover: "group-hover:border-secondary/40",
  },
  {
    cardHover: "hover:border-tertiary-container/40",
    numberWrap: "border-tertiary-container/30 bg-tertiary-container/20 text-neon-magenta",
    badgeText: "text-neon-magenta",
    mockupHover: "group-hover:border-tertiary-container/40",
  },
];

/** "Cómo funciona", calcado 1:1 de index.html (sección 3, id `como-funciona`). */
export function HowItWorksSection() {
  const { t } = useLanguage();
  const steps = [
    { badge: t("how.step1.badge"), title: t("how.step1.title"), desc: t("how.step1.description") },
    { badge: t("how.step2.badge"), title: t("how.step2.title"), desc: t("how.step2.description") },
    { badge: t("how.step3.badge"), title: t("how.step3.title"), desc: t("how.step3.description") },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop" id="como-funciona">
      <div className="mx-auto mb-space-2xl flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-secondary">{t("how.eyebrow")}</span>
        <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("how.title")}</h2>
        <p className="mt-space-xs font-body-md text-body-md text-text-secondary">{t("how.description")}</p>
      </div>
      <div className="grid grid-cols-1 gap-space-xl md:grid-cols-3">
        {steps.map((s, i) => {
          const style = STEP_STYLES[i];
          return (
            <div
              key={s.title}
              className={`group flex flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface-tier-1 shadow-xl transition-all ${style.cardHover}`}
            >
              <div className="flex flex-col items-start p-space-lg pb-0">
                <div className="mb-3 flex w-full items-center justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full border font-headline-sm font-extrabold ${style.numberWrap}`}>
                    {i + 1}
                  </span>
                  <span className={`font-label-sm font-bold uppercase tracking-wider ${style.badgeText}`}>{s.badge}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">{s.title}</h3>
                <p className="mt-1 font-body-sm text-body-sm text-text-secondary">{s.desc}</p>
              </div>
              <div className="mt-4 flex justify-center bg-gradient-to-b from-transparent to-[#070D1F] px-6 pb-0 pt-4">
                <div className={`w-[200px] rounded-t-3xl border-x-2 border-t-2 border-border-subtle bg-[#070D1F] p-2 shadow-xl transition-colors ${style.mockupHover}`}>
                  <div className="aspect-[9/13] overflow-hidden rounded-t-2xl">
                    <Image
                      src={STEP_IMAGES[i].image}
                      alt={STEP_IMAGES[i].alt}
                      width={200}
                      height={290}
                      loading="lazy"
                      sizes="200px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
