import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FraudAlertBanner } from "@/components/fraud-alert-banner";
import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
import { SponsorSection } from "@/components/sponsor-section";
import { DonateSection } from "@/components/donate-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <FraudAlertBanner />
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <AboutSection />
        <SponsorSection />
        <DonateSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
