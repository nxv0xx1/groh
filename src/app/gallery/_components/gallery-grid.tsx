'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { HeroImage } from '@/types/images';

export function GalleryGrid({ images }: { images: HeroImage[] }) {
  const [selectedImage, setSelectedImage] = useState<HeroImage | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No images have been added to the gallery yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-semibold drop-shadow-md">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
          <DialogContent className="max-w-3xl w-full p-0 bg-transparent border-none shadow-none">
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
