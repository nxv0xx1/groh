"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselImage {
  src: string;
  alt: string;
  hint: string;
  caption?: string;
}

const images: CarouselImage[] = [
  { src: 'https://placehold.co/1200x700.png', alt: 'Children playing at GROH', hint: 'children playing', caption: 'Joyful moments and shared laughter.' },
  { src: 'https://placehold.co/1200x700.png', alt: 'Children learning in a classroom', hint: 'children learning', caption: 'Empowering minds through education.' },
  { src: 'https://placehold.co/1200x700.png', alt: 'A happy child smiling', hint: 'happy child', caption: 'Nurturing happiness, one smile at a time.' },
  { src: 'https://placehold.co/1200x700.png', alt: 'Community event at GROH', hint: 'community event', caption: 'Building a strong, supportive community.' },
  { src: 'https://placehold.co/1200x700.png', alt: 'Volunteers interacting with children', hint: 'volunteers children', caption: 'The impact of caring hearts.' },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, []);

  useEffect(() => {
    const timer = setTimeout(goToNext, 5000); // Auto-play every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);

  return (
    <section id="impact" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            Transforming Lives, Inspiring Hope
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Witness the positive change and heartwarming stories from God's Righteousness Orphan Home.
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto aspect-[12/7] overflow-hidden rounded-xl shadow-2xl group">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={image.hint}
                className="rounded-xl"
                priority={index === 0}
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-center">
                  <p className="text-white text-sm md:text-base">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  currentIndex === index ? "bg-primary w-4" : "bg-background/50 hover:bg-background/80"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
