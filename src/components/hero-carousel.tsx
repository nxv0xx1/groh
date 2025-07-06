"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import Link from "next/link"

const heroImages = [
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Happy children at the orphanage",
    hint: "children smiling",
  },
  {
    src: "https://placehold.co/1600x900.png",
    alt: "The main building of the orphanage",
    hint: "orphanage building",
  },
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Children learning in a classroom",
    hint: "kids learning",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

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
          {heroImages.map((image, index) => (
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
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg mb-4">
            A Place of Belonging, Healing, and Hope
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 drop-shadow-md mb-8">
            Join us in nurturing the next generation with love, education, and faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
