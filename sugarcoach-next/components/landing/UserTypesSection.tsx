"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";

/** "Tres tipos de usuario", calcado 1:1 de index.html (sección 2, id `familias`). */
export function UserTypesSection() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden bg-bg-canvas py-space-3xl" id="familias">
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="mx-auto mb-space-2xl flex max-w-2xl flex-col items-center text-center">
          <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("familias.eyebrow")}</span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("familias.title")}</h2>
          <p className="mt-space-xs font-body-md text-body-md text-text-secondary">{t("familias.description")}</p>
        </div>
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
          <div className="group flex flex-col justify-between rounded-3xl border border-border-subtle bg-surface-tier-1 p-space-xl shadow-lg transition-all hover:border-primary/30 hover:bg-surface-tier-2">
            <div>
              <div className="mb-space-md flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary transition-transform group-hover:scale-105">
                <MaterialIcon name="favorite" style={{ fontSize: 30 }} />
              </div>
              <div className="mb-space-xs inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-container-high px-3 py-1 font-label-sm text-label-sm font-bold text-primary">
                {t("card.user.badge")}
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-text-primary">{t("card.user.title")}</h3>
              <p className="mt-2 font-body-md text-body-md text-text-secondary">{t("card.user.description")}</p>
            </div>
            <div className="mt-space-lg flex items-center justify-between rounded-2xl border border-border-subtle bg-surface-tier-2/70 p-space-md">
              <div className="flex items-center gap-space-xs">
                <MaterialIcon name="verified" className="text-primary" style={{ fontSize: 20 }} />
                <span className="font-label-md text-label-md font-bold text-text-primary">{t("card.user.value")}</span>
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 font-label-sm font-bold text-primary">{t("status.inRange")}</span>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-3xl border border-border-subtle bg-surface-tier-1 p-space-xl shadow-lg transition-all hover:border-secondary/30 hover:bg-surface-tier-2">
            <div>
              <div className="mb-space-md flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/15 text-secondary transition-transform group-hover:scale-105">
                <MaterialIcon name="group" style={{ fontSize: 30 }} />
              </div>
              <div className="mb-space-xs inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-container-high px-3 py-1 font-label-sm text-label-sm font-bold text-secondary">
                {t("card.family.badge")}
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-text-primary">{t("card.family.title")}</h3>
              <p className="mt-2 font-body-md text-body-md text-text-secondary">{t("card.family.description")}</p>
            </div>
            <div className="mt-space-lg flex items-center justify-between rounded-2xl border border-border-subtle bg-surface-tier-2/70 p-space-md">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(43,197,199,0.8)]" />
                <span className="font-label-md text-label-md font-bold text-text-primary">{t("card.family.value")}</span>
              </div>
              <span className="rounded-full border border-secondary/30 bg-secondary/20 px-2.5 py-0.5 font-label-sm font-bold text-secondary">{t("status.realtime")}</span>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-3xl border border-border-subtle bg-surface-tier-1 p-space-xl shadow-lg transition-all hover:border-tertiary-container/30 hover:bg-surface-tier-2">
            <div>
              <div className="mb-space-md flex h-14 w-14 items-center justify-center rounded-2xl border border-tertiary-container/30 bg-tertiary-container/15 text-tertiary-container transition-transform group-hover:scale-105">
                <MaterialIcon name="clinical_notes" style={{ fontSize: 30 }} />
              </div>
              <div className="mb-space-xs inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-container-high px-3 py-1 font-label-sm text-label-sm font-bold text-neon-magenta">
                {t("card.pro.badge")}
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-text-primary">{t("card.pro.title")}</h3>
              <p className="mt-2 font-body-md text-body-md text-text-secondary">{t("card.pro.description")}</p>
            </div>
            <div className="mt-space-lg flex items-center justify-between rounded-2xl border border-border-subtle bg-surface-tier-2/70 p-space-md">
              <div className="flex items-center gap-2">
                <MaterialIcon name="analytics" className="text-neon-magenta" style={{ fontSize: 18 }} />
                <span className="font-label-md text-label-md font-bold text-text-primary">{t("card.pro.value")}</span>
              </div>
              <span className="rounded-full border border-tertiary-container/30 bg-tertiary-container/20 px-2.5 py-0.5 font-label-sm font-bold text-neon-magenta">{t("status.reportReady")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
