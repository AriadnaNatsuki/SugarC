import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SugarCoach — Cuidar tu diabetes puede sentirse más simple",
  description:
    "Registrá controles, sumá puntos por tu constancia, organizá reportes médicos y mantené conectada a tu familia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* suppressHydrationWarning: el script pre-hidratación ajusta la clase
          de tema (dark/a11y) antes de hidratar, igual que en el HTML de modos. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('sugarcoach-theme');var m=s;if(!m){var mm=window.matchMedia;var c=mm&&mm('(prefers-contrast: more)').matches;var d=mm&&mm('(prefers-color-scheme: dark)').matches;if(c)m='a11y';else if(d)m='dark';else m='light';}var e=document.documentElement;e.classList.remove('dark','a11y');if(m==='dark')e.classList.add('dark');if(m==='a11y')e.classList.add('a11y');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
