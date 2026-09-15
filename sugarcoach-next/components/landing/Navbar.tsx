"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#familias", label: "Para familias" },
  { href: "#profesionales", label: "Profesionales" },
  { href: "#preguntas-frecuentes", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-line/[0.08] bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="SugarCoach inicio">
          <span className="transition-transform group-hover:scale-105">
            <Logo priority className="h-10 w-auto md:h-11" />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-base font-semibold text-body transition-colors hover:text-ink dark:hover:text-white">
              {l.label}
            </a>
          ))}
          <Link
            href="/premium"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3.5 py-1.5 text-sm font-bold text-amber-800 transition-all hover:bg-amber-400/35 hover:scale-105 dark:bg-amber-400/15 dark:text-amber-300 dark:hover:bg-amber-400/25 [.a11y_&]:bg-amber-300 [.a11y_&]:text-black"
          >
            <Crown className="h-4 w-4 fill-amber-500 text-amber-600 dark:fill-amber-300 dark:text-amber-300 [.a11y_&]:fill-black [.a11y_&]:text-black" />
            <span>Premium</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="#descargar">
            <Button variant="gradient" size="default" className="hidden sm:inline-flex font-bold">
              <Download /> Descargar App
            </Button>
          </Link>
          <Link href="/login" className="hidden text-base font-semibold text-body hover:text-ink sm:inline-flex">
            Iniciar sesión
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Abrir menú" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-tint/10 lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="mt-10 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-semibold text-body hover:bg-tint/5 hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
                <Link
                  href="/premium"
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-xl bg-amber-400/20 px-3 py-3 text-base font-bold text-amber-800 transition-colors hover:bg-amber-400/30 dark:bg-amber-400/15 dark:text-amber-300 dark:hover:bg-amber-400/25 [.a11y_&]:bg-amber-300 [.a11y_&]:text-black"
                >
                  <Crown className="h-4 w-4 fill-amber-500 text-amber-600 dark:fill-amber-300 dark:text-amber-300 [.a11y_&]:fill-black [.a11y_&]:text-black" />
                  <span>Premium</span>
                </Link>
                <div className="mt-4 flex flex-col gap-3">
                  <Link href="#descargar" onClick={() => setOpen(false)}>
                    <Button variant="gradient" className="w-full">
                      <Download /> Descargar App
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Iniciar sesión</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
