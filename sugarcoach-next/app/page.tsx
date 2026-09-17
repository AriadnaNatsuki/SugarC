import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { DualAudienceSection } from "@/components/landing/DualAudienceSection";
import { ModesSection } from "@/components/landing/ModesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { FaqSection, CtaSection } from "@/components/landing/FaqCta";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base pt-20">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <DualAudienceSection />
      <ModesSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
