import { Mail, Megaphone, Play, Smartphone, Users } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

/**
 * Footer tomado de `code.html` / `index.html` (landing de referencia):
 * marca + badges de stores, columnas Producto / Comunidad / Legal & Soporte
 * y barra inferior con copyright y accesos de contacto.
 * Adaptado a los tokens del proyecto (bg-footer, text-ink/body/muted) y a
 * iconos lucide-react (sin material-symbols).
 */
export function Footer() {
  return (
    <footer className="border-t border-line/[0.08] bg-footer">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 pb-10 pt-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <a href="#" aria-label="SugarCoach - inicio">
              <Logo />
            </a>
            <p className="max-w-sm text-sm text-body">
              Un compañero cotidiano para vivir con la diabetes de una manera más simple, acompañada,
              motivadora y organizada.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm text-footer shadow-sm transition-opacity hover:opacity-90"
              >
                <Smartphone className="h-5 w-5" aria-hidden="true" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] opacity-75">Descárgalo en</span>
                  <span className="font-bold">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm text-footer shadow-sm transition-opacity hover:opacity-90"
              >
                <Play className="h-5 w-5" aria-hidden="true" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] opacity-75">Disponible en</span>
                  <span className="font-bold">Google Play</span>
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold tracking-tight text-ink">Producto</p>
            <nav className="flex flex-col gap-2">
              {[
                ["#como-funciona", "Cómo funciona"],
                ["#familias", "Para familias"],
                ["#profesionales", "Profesionales"],
                ["#gamificacion", "Logros y Niveles"],
                ["#tratamiento", "Tratamiento"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-sm text-body transition-colors hover:text-[#DA44AF]">
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold tracking-tight text-ink">Comunidad</p>
            <nav className="flex flex-col gap-2">
              {["Blog", "Familias conectadas", "Historias de progreso"].map((label) => (
                <a key={label} href="#" className="text-sm text-body transition-colors hover:text-[#DA44AF]">
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold tracking-tight text-ink">Legal &amp; Soporte</p>
            <nav className="flex flex-col gap-2">
              {["Centro de ayuda", "Privacidad", "Términos de servicio"].map((label) => (
                <a key={label} href="#" className="text-sm text-body transition-colors hover:text-[#DA44AF]">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line/[0.06] py-6 md:flex-row">
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-3 sm:text-left">
            {/* Año estático como en el HTML de referencia: evita hydration mismatch. */}
            <p className="text-sm text-body">© 2024 SugarCoach. Todos los derechos reservados.</p>
            <span className="hidden text-muted sm:inline">•</span>
            <p className="text-sm text-body">Diseñado con empatía para familias y profesionales de la salud.</p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "Comunidad", Icon: Users },
              { label: "Novedades", Icon: Megaphone },
              { label: "Contacto", Icon: Mail },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/[0.08] bg-card text-body transition-colors hover:text-[#DA44AF]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
