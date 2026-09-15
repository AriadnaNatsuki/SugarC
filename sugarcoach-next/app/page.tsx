import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { UserTypesSection } from "@/components/landing/UserTypesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { GamificationSection } from "@/components/landing/GamificationSection";
import { DailyMomentsSection } from "@/components/landing/DailyMomentsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TreatmentSection } from "@/components/landing/TreatmentSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { AboutSection } from "@/components/landing/AboutSection";
import { CtaSection, FaqSection } from "@/components/landing/FaqCta";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base pt-24">
      <Navbar />
      <Hero />
      <UserTypesSection />
      <HowItWorksSection />
      <GamificationSection />
      <DailyMomentsSection />
      <StatsSection />
      <TreatmentSection />
      <SecuritySection />
      <AboutSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
