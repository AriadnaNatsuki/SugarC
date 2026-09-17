import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { UserTypesSection } from "@/components/landing/UserTypesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { GamificationSection } from "@/components/landing/GamificationSection";
import { DayInLifeSection } from "@/components/landing/DayInLifeSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TreatmentSection } from "@/components/landing/TreatmentSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { AwardsSection } from "@/components/landing/AwardsSection";
import { OurStorySection } from "@/components/landing/OurStorySection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CtaSection, FaqSection } from "@/components/landing/FaqCta";
import { Footer } from "@/components/landing/Footer";

// Orden 1:1 con `index.html`: Hero(1) → Tres tipos de usuario(2) → Cómo
// funciona(3) → Gamificación(4) → Un día con SugarCoach(5) →
// Estadísticas(6) → Tratamiento(7) → Privacidad(8) → Reconocimientos(9) →
// Nuestra Historia + equipo(10) → Testimonios(11) → CTA final(12) → FAQ(13).
export default function HomePage() {
  return (
    <main className="w-full bg-bg-deep pt-20 font-body-md text-body-md text-on-surface antialiased selection:bg-neon-magenta selection:text-white">
      <Navbar />
      <Hero />
      <UserTypesSection />
      <HowItWorksSection />
      <GamificationSection />
      <DayInLifeSection />
      <StatsSection />
      <TreatmentSection />
      <PrivacySection />
      <AwardsSection />
      <OurStorySection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
