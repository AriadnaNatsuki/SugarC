"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Download, PlayCircle, Star, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { floatY } from "@/lib/animations";
import { PHONES } from "@/lib/images";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative w-full overflow-hidden bg-base">
      <GlowBlob color="purple" size={500} className="left-[-150px] top-[-120px]" opacity={0.3} />
      <GlowBlob color="blue" size={450} className="right-[-120px] top-[10%]" opacity={0.28} />

      <section className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 lg:col-span-6"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line/10 bg-tint/[0.04] px-4 py-1.5 text-xs font-bold text-ink">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            Compañero diario para niños, jóvenes y familias
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl md:leading-[56px]">
            Cuidar tu diabetes puede sentirse más{" "}
            <span className="text-brand-gradient underline decoration-[#2BC5C7] decoration-wavy underline-offset-8">
              simple
            </span>
            .
          </h1>
          <p className="section-subtitle max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
            SugarCoach te ayuda a registrar tus controles, sumar puntos por tu constancia,
            organizar reportes médicos y mantener conectada a tu familia. Con calidez,
            gamificación positiva y sin estrés clínico.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="#descargar">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto font-bold !text-white">
                <Download className="!text-white" />
                <span className=" !text-white">Descargar App Gratis</span>
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <PlayCircle /> Ver cómo funciona
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-3">
              {["LF", "MA", "SR", "+8k"].map((t) => (
                <div key={t} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-base bg-card text-xs font-bold text-ink shadow">
                  {t}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
                <span className="ml-1 text-xs font-bold text-ink">4.9 / 5</span>
              </div>
              <span className="text-[13px] text-body">Familias y pacientes más tranquilos cada día</span>
            </div>
          </div>
        </motion.div>

        {/* Mockups de teléfono (estructura del code.html, sin depender de imágenes externas rotas) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex items-center justify-center pt-8 lg:col-span-6 lg:pt-0"
        >
          <div className="absolute h-80 w-80 rounded-full bg-glow-purple/30 blur-3xl md:h-96 md:w-96" />
          {/* Tarjeta flotante 1 (code.html: `animate-bounce` con duration 5s) */}
          <motion.div
            variants={reduceMotion ? undefined : floatY}
            animate={reduceMotion ? undefined : "animate"}
            className="absolute -top-2 left-2 z-30 flex items-center gap-3 rounded-2xl border border-line/10 bg-card/90 px-4 py-3 shadow-2xl backdrop-blur sm:-left-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-muted">Última medición</span>
              <span className="text-[15px] font-extrabold text-ink">116 mg/dL • En rango</span>
            </div>
          </motion.div>
          {/* Tarjeta flotante 2 */}
          <motion.div
            variants={
              reduceMotion
                ? undefined
                : {
                    animate: {
                      y: [0, -10, 0],
                      transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
                    },
                  }
            }
            animate={reduceMotion ? undefined : "animate"}
            className="absolute bottom-10 -left-4 z-30 flex items-center gap-3 rounded-2xl border border-line/10 bg-card/90 px-4 py-3 shadow-2xl backdrop-blur sm:-left-8"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-300">
              <Star className="h-5 w-5 fill-amber-500 dark:fill-amber-300 text-amber-600 dark:text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-ink">1100 pts • Nivel 1</span>
              <span className="text-[11px] text-muted">¡Racha y constancia activa!</span>
            </div>
          </motion.div>
          {/* Tarjeta flotante 3 */}
          <motion.div
            variants={
              reduceMotion
                ? undefined
                : {
                    animate: {
                      y: [0, -10, 0],
                      transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
                    },
                  }
            }
            animate={reduceMotion ? undefined : "animate"}
            className="absolute right-0 top-1/3 z-30 hidden items-center gap-3 rounded-2xl border border-line/10 bg-card/90 px-4 py-3 shadow-2xl backdrop-blur sm:flex"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-700 dark:text-sky-300">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-ink">Familia conectada</span>
              <span className="text-[11px] text-muted">Sincronización al instante</span>
            </div>
          </motion.div>

          {/* Teléfono de apoyo inclinado (code.html: `rotate-6 hover:rotate-2 transition-transform duration-300 opacity-90`) */}
          <motion.div
            initial={reduceMotion ? undefined : { rotate: 6 }}
            whileHover={reduceMotion ? undefined : { rotate: 2, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="absolute -right-6 top-8 z-10 hidden w-[240px] rounded-[36px] border-4 border-line/15 bg-[#110e2d] p-2.5 opacity-90 shadow-2xl sm:block"
          >
            <div className="overflow-hidden rounded-[28px] bg-black">
              <Image
                src={PHONES.dailyLog}
                alt="Pantalla real SugarCoach Daily Log"
                width={240}
                height={480}
                loading="lazy"
                sizes="240px"
                className="aspect-[9/19.5] w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Teléfono principal (code.html: `hover:scale-[1.01] transition-transform`) */}
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative z-20 w-[280px] rounded-[44px] border-4 border-line/15 bg-[#110e2d] p-3 shadow-2xl sm:w-[310px]"
          >
            <div className="mx-auto mb-2 h-4 w-24 rounded-full bg-black opacity-80" />
            <div className="overflow-hidden rounded-[32px] bg-black shadow-inner">
              <Image
                src={PHONES.home}
                alt="Pantalla real SugarCoach Home: Nivel 1, 1100 pts"
                width={310}
                height={620}
                priority
                sizes="(max-width: 640px) 280px, 310px"
                className="aspect-[9/19.5] w-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
