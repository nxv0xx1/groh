import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import AboutSection from '@/components/home/about-section';
import ImageCarousel from '@/components/home/image-carousel';
import GetInvolvedSection from '@/components/home/get-involved-section';
import ContactSection from '@/components/home/contact-section';
import FraudWarningDialog from '@/components/home/fraud-warning-dialog';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <FraudWarningDialog />
      <Navbar />
      <main className="flex-grow">
        <div className="animate-in fade-in duration-500">
          <HeroSection />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          <AboutSection />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <ImageCarousel />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
          <GetInvolvedSection />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
