"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import Link from "next/link"
import type { HeroImage } from "@/types/images"

interface HeroCarouselProps {
  images: HeroImage[];
}

export function HeroCarousel({ images }: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  if (!images || images.length === 0) {
    return (
      <section className="relative w-full h-[70vh] md:h-[90vh] p-0 flex items-center justify-center bg-muted">
        <div className="text-center">
          <p>No hero images have been set.</p>
          <p className="text-sm text-muted-foreground">An administrator can add them in the admin panel.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] p-0">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent className="fade-in">
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[70vh] md:h-[90vh]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image.hint}
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-white bg-black/20 hover:bg-black/40 border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-white bg-black/20 hover:bg-black/40 border-none" />
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="container mx-auto text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg mb-4">
            A Place of Belonging, Healing, and Hope
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 drop-shadow-md mb-8">
            Join us in nurturing the next generation with love, education, and faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <Button asChild size="lg">
              <Link href="#donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#sponsor">Sponsor a Child</Link>
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fade-in .embla__slide {
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .fade-in .embla__slide.is-selected {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}
