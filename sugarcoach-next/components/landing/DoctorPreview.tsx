import Image from "next/image"
import {PHONES} from "@/lib/images"
export function DoctorPreview() {
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-2xl md:px-gutter-tablet lg:px-gutter-desktop">
      <div className="theme-panel-gamification relative overflow-hidden rounded-3xl border border-border-subtle p-space-xl shadow-2xl md:p-space-3xl">

        {/* Título */}
        <div className="relative z-10 mb-space-2xl text-center">
          <h2 className="theme-panel-text font-display-lg text-display-lg-mobile font-extrabold leading-tight tracking-tight md:text-headline-lg">
            Para el equipo médico
          </h2>

          <p className="theme-panel-muted mt-space-md font-body-lg text-body-lg">
            Cada dato que registra tu paciente
            <br />
            llega a tu dashboard al instante
          </p>
        </div>

        {/* IMÁGENES */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">

          {/* App paciente */}
          <div className="flex flex-col items-center lg:col-span-5">
            <h3 className="theme-panel-text mb-space-md font-headline-sm text-[18px] font-bold">
              App paciente
            </h3>

            <Image
            //src={PHONES.treatment}
            src="/images/celu_treatment.webp"
            alt="App del paciente"
            fill
            className="rounded-[30px] object-contain"
            sizes="280px"
        />
          </div>

          {/* Dashboard doctor */}
          <div className="flex flex-col items-center lg:col-span-7">
            <h3 className="theme-panel-text mb-space-md font-headline-sm text-[18px] font-bold">
              Dashboard doctor
            </h3>
              <Image
            src="/contenido/lovable-pictures/5.png"
            alt="Dashboard doctor"
            fill
            className="rounded-[30px] object-contain"
            sizes="280px"
        />

          </div>

        </div>

        {/* BENEFICIOS */}
        <div className="relative z-10 mt-space-2xl grid gap-space-lg md:grid-cols-3">

          <div className="theme-panel-card rounded-2xl border p-space-md">
            <h3 className="theme-panel-text mb-3 font-headline-sm text-[18px] font-bold">
              Tiempo real
            </h3>

            <p className="theme-panel-muted font-body-sm text-body-sm leading-relaxed">
              Cada medición se refleja en tu panel apenas el paciente
              la registra, sin demoras.
            </p>
          </div>

          <div className="theme-panel-card rounded-2xl border p-space-md">
            <h3 className="theme-panel-text mb-3 font-headline-sm text-[18px] font-bold">
              Disponible 24/7
            </h3>

            <p className="theme-panel-muted font-body-sm text-body-sm leading-relaxed">
              El monitoreo no se detiene: seguís la evolución también
              fuera de horario de consulta.
            </p>
          </div>

          <div className="theme-panel-card rounded-2xl border p-space-md">
            <h3 className="theme-panel-text mb-3 font-headline-sm text-[18px] font-bold">
              Un solo lugar
            </h3>

            <p className="theme-panel-muted font-body-sm text-body-sm leading-relaxed">
              Todos tus pacientes conectados, con su historial y alertas,
              en un único dashboard.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}