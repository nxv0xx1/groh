import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center bg-gradient-to-br from-background to-secondary">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Background collage of children at GROH"
          layout="fill"
          objectFit="cover"
          quality={75}
          data-ai-hint="children community happy"
          priority
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center py-16 md:py-24">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-primary">Nurturing Futures,</span>
            <span className="block text-foreground">Building Hope.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            GROH is dedicated to supporting God's Righteousness Orphan Home, providing a loving environment and essential resources for children in need.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#get-involved">Get Involved</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
