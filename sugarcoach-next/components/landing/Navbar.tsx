"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#familias", label: "Para familias" },
  { href: "#profesionales", label: "Profesionales" },
  { href: "#planes", label: "Planes" },
  { href: "#quienes-somos", label: "Quiénes somos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-line/[0.08] bg-base/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="SugarCoach inicio">
          <span className="transition-transform group-hover:scale-105">
            <Logo priority />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-body transition-colors hover:text-[#DA44AF]">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className="hidden text-sm font-semibold text-body hover:text-ink sm:inline-flex">
            Iniciar sesión
          </Link>
          <Link href="#descargar">
            <Button variant="gradient" size="sm" className="hidden sm:inline-flex">
              <Download /> Descargar SugarCoach
            </Button>
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
                <div className="mt-4 flex flex-col gap-3">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Iniciar sesión</Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button variant="gradient" className="w-full">Crear cuenta</Button>
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
