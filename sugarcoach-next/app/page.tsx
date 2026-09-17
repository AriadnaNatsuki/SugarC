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
import { AwardsSection } from "@/components/landing/AwardsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CtaSection, FaqSection } from "@/components/landing/FaqCta";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base pt-24">
      {/* Halos ambientales globales sutiles para difracción glassmorphism sin saturar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-[#DA44AF]/[0.06] blur-[160px] dark:bg-[#DA44AF]/[0.10] [.a11y_&]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[28%] left-[-10%] h-[650px] w-[650px] rounded-full bg-[#2BC5C7]/[0.05] blur-[160px] dark:bg-[#2BC5C7]/[0.08] [.a11y_&]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[56%] right-[-8%] h-[650px] w-[650px] rounded-full bg-[#7100A5]/[0.05] blur-[160px] dark:bg-[#C45CFF]/[0.08] [.a11y_&]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[82%] left-[-8%] h-[600px] w-[600px] rounded-full bg-[#FF3FB4]/[0.04] blur-[150px] dark:bg-[#FF3FB4]/[0.07] [.a11y_&]:hidden"
      />

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
      <AwardsSection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
