import type { Config } from "tailwindcss";

/**
 * Colores semánticos como canales RGB + `<alpha-value>`, para que los
 * modificadores de opacidad (`bg-base/70`, `border-line/10`, …) funcionen.
 * Los valores viven en `app/globals.css`: `:root` = claro, `.dark` = oscuro
 * (identidad #01081F + gradiente #DA44AF → #C747CA), `.a11y` = alto contraste.
 * Paletas tomadas de `sugarcoach-app-landing-3-modos (2).html`.
 */
const withAlpha = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: withAlpha("--sc-base"),
        alt: withAlpha("--sc-alt"),
        footer: withAlpha("--sc-footer"),
        card: withAlpha("--sc-card"),
        body: withAlpha("--sc-body"),
        muted: withAlpha("--sc-muted"),
        ink: withAlpha("--sc-ink"), // texto principal (reemplaza text-white)
        line: withAlpha("--sc-line"), // bordes sutiles (reemplaza border-white/*)
        tint: withAlpha("--sc-tint"), // superficies tenues (reemplaza bg-white/*)
        brand: {
          from: "#DA44AF",
          to: "#C747CA",
        },
        glow: {
          purple: "#732995",
          blue: "#155EB2",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #DA44AF 0%, #C747CA 100%)",
      },
      boxShadow: {
        "brand-glow": "0 0 20px rgba(218,68,175,0.5)",
        "brand-lg": "0 10px 25px -5px rgba(218,68,175,0.4)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
