'use client';
import { useState } from 'react';
import Image from "next/image";
import { Button } from "./ui/button";
import { GraduationCap } from "lucide-react";
import { SponsorDialog } from './sponsor-dialog';

export function SponsorSection({ sponsorImage }: { sponsorImage: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section id="sponsor">
        <div className="container mx-auto">
          <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src={sponsorImage} 
                  alt="A child smiling and ready for school" 
                  fill
                  className="object-cover"
                  data-ai-hint="child portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="text-center md:text-left">
                <GraduationCap className="w-12 h-12 text-primary mx-auto md:mx-0 mb-4" />
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Sponsor a Child</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Your sponsorship can change a life. By sponsoring a child, you provide them with access to quality education, essential healthcare, and the daily necessities they need to thrive.
                </p>
                <p className="mb-8">
                  Become a beacon of hope and help us build a solid foundation for their future. You'll receive updates on their progress and see the direct impact of your generosity.
                </p>
                <Button onClick={() => setIsDialogOpen(true)} size="lg">
                  Learn About Sponsorship
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SponsorDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
