import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FraudAlertDialog } from "@/components/fraud-alert-dialog";
import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
import { SponsorSection } from "@/components/sponsor-section";
import { DonateSection } from "@/components/donate-section";
import { ContactSection } from "@/components/contact-section";
import { getImageData } from "@/lib/image-data";

export default async function Home() {
  const { heroCarousel, logo } = await getImageData();
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <FraudAlertDialog />
      <Header logo={logo} />
      <main className="flex-1">
        <HeroCarousel images={heroCarousel} />
        <AboutSection />
        <SponsorSection />
        <DonateSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
