"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Gift,
  ShieldCheck,
  Stethoscope,
  Building2,
  User,
  Mail,
  FileText,
  Calendar,
  Check,
  Copy,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const PREMIUM_FEATURES = [
  "Registro ilimitado de glucemia, insulina, carbohidratos y ejercicio",
  "Sincronización en la nube en vivo para todo el círculo familiar",
  "Notificaciones inteligentes para cuidadores y tutores",
  "Reportes clínicos estandarizados con métricas TIR (Tiempo en Rango)",
  "Gráficos de correlación médica entre dosis de insulina y alimentación",
  "Exportación en PDF y Excel lista para adjuntar a la historia clínica",
  "Gamificación completa: puntos diarios, rachas y logros sin reproches",
  "Soporte prioritario y copias de seguridad automáticas en la nube",
];

export default function PremiumPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Datos del formulario para vincular al médico
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientDni: "",
    doctorName: "",
    institutionOrLicense: "",
    province: "Buenos Aires",
  });

  const generatedCoupon = "SUGAR-ARG-6MESES-GRATIS";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientEmail || !formData.doctorName) return;
    setSubmitted(true);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(generatedCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-base text-body">
      <Navbar />

      <main className="mx-auto max-w-[1100px] px-4 pb-20 pt-28 md:px-6 lg:px-8">
        {/* Navegación de retorno */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Header de la página Premium */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 mb-3 [.a11y_&]:border-2 [.a11y_&]:border-amber-600 [.a11y_&]:bg-amber-100 [.a11y_&]:text-amber-950">
            <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500 dark:fill-amber-300 dark:text-amber-300" />
            Plan SugarCoach Premium
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Todo el potencial de SugarCoach a tu alcance
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body dark:text-[#A8B0C5]">
            Acompañamiento integral, sincronización familiar en tiempo real y reportes clínicos profesionales.
          </p>
        </div>

        {/* =========================================================================
         * BANNER DESTACADO: BENEFICIO PACIENTES EN ARGENTINA
         * ========================================================================= */}
        <div className="mb-12 overflow-hidden rounded-3xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent p-6 shadow-xl dark:border-sky-400/30 dark:bg-[#07132B] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-700 dark:text-sky-300 shadow-sm">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                  🇦🇷 Beneficio Federal de Salud
                </span>
                <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-ink">
                  “Si estás en Argentina podés acceder a cupón de descuento (100%) ingresando acá (Solo para el paciente).”
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-body dark:text-[#A8B0C5] leading-relaxed">
                  Completá el formulario para vincular a tu médico o diabetólogo tratante y activá tu{" "}
                  <strong className="text-ink font-bold">descuento del 100% válido por 6 meses</strong> para el paciente.
                </p>
              </div>
            </div>

            <div className="flex shrink-0">
              <Button
                onClick={() => setShowForm((prev) => !prev)}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 font-bold  !text-white shadow-md"
              >
                <span className=" !text-white font-bold">{showForm ? "Ocultar formulario" : "Ingresar acá y solicitar cupón"}</span>
                <ChevronDown className={`ml-2 h-4 w-4 !text-white transition-transform ${showForm ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>

          {/* =====================================================================
           * FORMULARIO DESPLEGABLE DE VINCULACIÓN CON EL MÉDICO
           * ===================================================================== */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 border-t border-sky-500/20 pt-6">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                      <div className="rounded-2xl bg-base/80 p-4 border border-line/10 dark:bg-black/20 text-center mb-6">
                        <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider block">
                          Condiciones del beneficio
                        </span>
                        <p className="text-sm font-semibold text-ink mt-1">
                          Descuento del 100% válido por 6 meses para el usuario/paciente.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            Nombre y Apellido del paciente *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted" />
                            <input
                              type="text"
                              required
                              placeholder="Ej: Sofía Pérez"
                              value={formData.patientName}
                              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            Email del paciente o tutor *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
                            <input
                              type="email"
                              required
                              placeholder="nombre@correo.com"
                              value={formData.patientEmail}
                              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            DNI / Documento del paciente *
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted" />
                            <input
                              type="text"
                              required
                              placeholder="Sin puntos"
                              value={formData.patientDni}
                              onChange={(e) => setFormData({ ...formData, patientDni: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            Provincia / Residencia en Argentina
                          </label>
                          <select
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full rounded-xl border border-line/20 bg-card py-2.5 px-3 text-sm text-ink focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                          >
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="CABA">CABA</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Tucumán">Tucumán</option>
                            <option value="Entre Ríos">Entre Ríos</option>
                            <option value="Salta">Salta</option>
                            <option value="Otra provincia">Otra provincia</option>
                          </select>
                        </div>
                      </div>

                      {/* Datos para relacionar al médico */}
                      <div className="pt-2">
                        <div className="mb-2 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-ink">
                            Datos para relacionar al médico tratante
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-bold text-ink mb-1.5">
                              Nombre del Médico / Diabetólogo *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Dr. / Dra. Apellido"
                              value={formData.doctorName}
                              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 px-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-ink mb-1.5">
                              Hospital, Centro Médico o Matrícula
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted" />
                              <input
                                type="text"
                                placeholder="Ej: Hospital Garrahan / Mat. 12345"
                                value={formData.institutionOrLicense}
                                onChange={(e) => setFormData({ ...formData, institutionOrLicense: e.target.value })}
                                className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button type="submit" variant="gradient" className="w-full sm:w-auto font-bold px-8 !text-white">
                          <span className=" !text-white font-bold">Activar 6 meses sin cargo</span>
                        </Button>
                      </div>
                    </form>
                  ) : (
                    /* Confirmación de cupón otorgado */
                    <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-extrabold text-ink">
                        ¡Beneficio otorgado con éxito!
                      </h3>
                      <p className="text-sm text-body dark:text-[#A8B0C5] leading-relaxed">
                        Registramos a <strong className="text-ink">{formData.patientName}</strong> en relación con el equipo de{" "}
                        <strong className="text-ink">{formData.doctorName}</strong>. Tu cuenta cuenta con{" "}
                        <strong className="text-emerald-700 dark:text-emerald-400">100% de descuento durante 6 meses</strong>.
                      </p>

                      <div className="inline-flex items-center gap-2 rounded-2xl border border-line/20 bg-card p-2 px-4 shadow-sm">
                        <span className="font-mono text-sm font-extrabold tracking-wider text-ink">
                          {generatedCoupon}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyCoupon}
                          className="flex items-center gap-1 rounded-lg bg-base px-2.5 py-1 text-xs font-bold text-ink hover:bg-tint/10"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copied ? "Copiado" : "Copiar"}</span>
                        </button>
                      </div>

                      <p className="text-xs text-muted">
                        Enviamos una copia con las instrucciones de canje en la app a <strong>{formData.patientEmail}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================================
         * TARJETA PRINCIPAL DE PRECIOS PREMIUM ($4.99 USD)
         * ========================================================================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Card Premium */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border-2 border-[#E2A632] bg-card p-8 shadow-xl dark:bg-[#0E1530] dark:border-[#E2A632]/80">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-line/10 pb-5">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Suscripción Mensual
                  </span>
                  <h3 className="text-2xl font-black text-ink">SugarCoach Pro</h3>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-ink sm:text-5xl">$4.99</span>
                    <span className="text-sm font-bold text-muted">USD / mes</span>
                  </div>
                  <span className="text-xs text-muted block mt-0.5">Sin contratos • Cancelás cuando quieras</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-muted">
                  Qué incluye tu suscripción:
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
                  {PREMIUM_FEATURES.map((feat, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="text-xs leading-relaxed text-body dark:text-[#A8B0C5]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Cobro seguro vía App Store & Google Play</span>
              </div>
              <Link href="#descargar" className="w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full font-bold !text-white">
                  <span className=" !text-white font-bold">Comenzar con SugarCoach</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Columna Lateral: Resumen de Tranquilidad */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-line/15 bg-base/60 p-8 shadow-sm dark:bg-[#070D22]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DA44AF]/15 text-[#DA44AF]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">Sin permanencia</h4>
                  <p className="text-xs text-muted">Pausá o cancelá desde la tienda de tu teléfono en 1 toque.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2BC5C7]/15 text-[#2BC5C7]">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">Avalado clínicamente</h4>
                  <p className="text-xs text-muted">Métricas internacionales compatibles con sensores y tiras reactivas.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C45CFF]/15 text-[#C45CFF]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">Privacidad garantizada</h4>
                  <p className="text-xs text-muted">Tus registros de salud están encriptados y nunca se comercializan.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-line/10 bg-card p-4 text-center">
              <span className="text-xs font-semibold text-muted block">¿Tenés dudas sobre el plan o la suscripción?</span>
              <a
                href="mailto:contacto@sugarcoach.app"
                className="text-xs font-bold text-brand-from hover:underline mt-1 inline-block"
              >
                Escribinos a contacto@sugarcoach.app
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
