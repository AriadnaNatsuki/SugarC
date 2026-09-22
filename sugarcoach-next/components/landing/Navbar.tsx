"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LOGO_SRC } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";
import { es as esDict, en as enDict } from "@/lib/translations";
import { cn } from "@/lib/utils";

/**
 * Sizer invisible: el botón reserva el ancho del label más largo entre
 * idiomas (ES/EN), así al cambiar de idioma el ancho queda fijo y los
 * vecinos (toggles) no se desplazan. Sin números mágicos: si cambia una
 * traducción, la reserva se recalcula sola.
 */
function longest(a: string, b: string): string {
  return a.length >= b.length ? a : b;
}
const DOWNLOAD_SIZER = longest(esDict["btn.shortDownload"], enDict["btn.shortDownload"]);
const LOGIN_SIZER = longest(esDict["nav.login"], enDict["nav.login"]);

/** Header + menú móvil deslizante, calcado 1:1 de index.html. */
export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Anclas con prefijo "/" para que funcionen igual desde la home y desde
  // páginas propias como /profesionales (calcado del patrón de
  // profesionales.html, que usaba `index.html#ancla` fuera de la home).
  const NAV_LINKS = [
    { href: "/#como-funciona", key: "nav.comoFunciona", label: t("nav.comoFunciona") },
    { href: "/#familias", key: "nav.familias", label: t("nav.familias") },
    { href: "/profesionales", key: "nav.profesionales", label: t("nav.profesionales") },
    { href: "/#preguntas-frecuentes", key: "nav.faq", label: t("nav.faq") },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-border-subtle bg-bg-deep/85 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="sc-navbar-inner mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-space-md px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
          <a className="sc-navbar-brand group flex flex-none items-center gap-2" href="/">
            <div className="sc-navbar-brand-box rounded-xl border border-border-subtle bg-surface-container/60 p-1.5 transition-colors group-hover:border-primary/40">
              <Image
                src={LOGO_SRC}
                alt="SugarCoach Logo Oficial"
                width={140}
                height={40}
                priority
                className="sc-navbar-logo h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(196,92,255,0.3)] transition-transform group-hover:scale-105 md:h-9"
              />
            </div>
          </a>
          <nav className="sc-navbar-links hidden items-center gap-space-lg lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                className={cn(
                  "shrink-0 whitespace-nowrap font-label-lg text-label-lg text-text-secondary transition-colors hover:text-primary",
                  pathname === l.href && "nav-link-active",
                )}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                <span className="grid whitespace-nowrap">
                  <span aria-hidden="true" className="invisible col-start-1 row-start-1">
                    {longest(esDict[l.key] ?? l.key, enDict[l.key] ?? l.key)}
                  </span>
                  <span className="col-start-1 row-start-1">{l.label}</span>
                </span>
              </a>
            ))}
            <a
              className="sc-navbar-premium inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-400/20 px-3.5 py-1.5 text-sm font-bold text-amber-800 transition-all hover:scale-105 hover:bg-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300 dark:hover:bg-amber-400/25"
              href="#"
            >
              <Crown className="sc-navbar-crown h-4 w-4 fill-amber-500 text-amber-600 dark:fill-amber-300 dark:text-amber-300" />
              <span>{t("nav.premium")}</span>
            </a>
          </nav>
          <div className="sc-navbar-actions flex items-center gap-space-sm md:gap-space-md">
            <LanguageToggle />
            <ThemeToggle />
            <a
              className="sc-navbar-cta hidden min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full btn-gradient border border-white/20 px-3.5 py-space-xs font-label-lg text-label-lg text-white transition-all active:scale-95 sm:inline-flex sm:px-space-lg"
              href="/#descargar"
            >
              <MaterialIcon name="download" className="text-[18px]" />
              <span className="grid whitespace-nowrap">
                <span aria-hidden="true" className="invisible col-start-1 row-start-1">
                  {DOWNLOAD_SIZER}
                </span>
                <span className="col-start-1 row-start-1">{t("btn.shortDownload")}</span>
              </span>
            </a>
            <a className="hidden shrink-0 items-center justify-center whitespace-nowrap font-label-lg text-label-lg text-text-secondary transition-colors hover:text-primary lg:inline-flex" href="/login">
              <span className="grid whitespace-nowrap">
                <span aria-hidden="true" className="invisible col-start-1 row-start-1">
                  {LOGIN_SIZER}
                </span>
                <span className="col-start-1 row-start-1">{t("nav.login")}</span>
              </span>
            </a>
            <button
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="theme-toggle lg:hidden"
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <MaterialIcon name={mobileOpen ? "close" : "menu"} style={{ fontSize: 22 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop + panel lateral deslizante (fiel a `#mobileMenuBackdrop`/`#mobileMenu`) */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto border-l border-border-subtle bg-bg-deep shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 px-gutter-mobile pb-space-lg pt-20">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 font-label-lg text-text-secondary transition-all hover:bg-surface-container hover:text-primary"
              href={l.href}
            >
              {l.label}
            </a>
          ))}
          <a
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-xl bg-amber-400/20 px-3 py-3 font-label-lg font-bold text-amber-800 transition-colors hover:bg-amber-400/30 dark:bg-amber-400/15 dark:text-amber-300 dark:hover:bg-amber-400/25"
            href="/premium"
          >
            <Crown className="h-[18px] w-[18px] fill-amber-500 text-amber-600 dark:fill-amber-300 dark:text-amber-300" />
            <span>{t("nav.premium")}</span>
          </a>
          <div className="mt-4 flex flex-col gap-3">
            <a
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full btn-gradient border border-white/20 px-space-lg py-space-sm font-label-lg text-label-lg text-white"
              href="/#descargar"
            >
              <MaterialIcon name="download" className="text-[18px]" />
              <span>{t("btn.shortDownload")}</span>
            </a>
            <a
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-outline-variant px-space-lg py-space-sm font-label-lg text-label-lg text-on-surface transition-colors hover:bg-surface-container"
              href="/login"
            >
              {t("nav.login")}
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}

