"use client";

import { useEffect, useRef, useState } from "react";
import { Accessibility, Contrast, MoonStar, SunMedium } from "lucide-react";
import { THEME_LABELS, useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const ITEMS: { value: Theme; icon: typeof SunMedium }[] = [
  { value: "light", icon: SunMedium },
  { value: "dark", icon: MoonStar },
  { value: "a11y", icon: Accessibility },
];

/**
 * Selector de modo de color (Claro / Oscuro / Accesible), fiel al del HTML
 * de referencia: botón con menú `menu`/`menuitemradio`, `aria-current`,
 * cierre con Escape y clic fuera, foco devuelto al botón.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open ]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="theme-menu"
        aria-label={`Modo de color: ${THEME_LABELS[theme]}. Cambiar modo`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:bg-tint/10"
      >
        <Contrast className="h-5 w-5" />
      </button>
      {open && (
        <div
          id="theme-menu"
          role="menu"
          aria-label="Modo de color"
          className="absolute right-0 top-[calc(100%+8px)] z-[60] min-w-[168px] rounded-2xl border border-line bg-card p-1.5 shadow-xl"
        >
          {ITEMS.map(({ value, icon: Icon }) => {
            const active = theme === value;
            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                aria-current={active}
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className={cn(
                  "flex min-h-[44px] w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                  active ? "bg-brand-gradient text-white" : "text-body hover:bg-tint/10 hover:text-ink",
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                {THEME_LABELS[value]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
