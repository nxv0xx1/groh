import { kv } from '@vercel/kv';
import type { ImageSettings } from '@/types/images';

const KV_KEY = 'image_settings';

const defaultImageData: ImageSettings = {
  logo: "https://placehold.co/100x100.png",
  favicon: "https://placehold.co/32x32.png",
  heroCarousel: [
    {
      src: "https://placehold.co/1600x900.png",
      alt: "Happy children at the orphanage",
      hint: "children smiling"
    },
    {
      src: "https://placehold.co/1600x900.png",
      alt: "The main building of the orphanage",
      hint: "orphanage building"
    }
  ],
  sponsorImage: "https://placehold.co/600x600.png",
  donationAmounts: [5000, 10000, 25000, 50000],
  galleryImages: [
    {
      src: "https://placehold.co/600x400.png",
      alt: "Gallery Image 1",
      hint: "children happy"
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Gallery Image 2",
      hint: "kids smiling"
    }
  ]
};

export async function getImageData(): Promise<ImageSettings> {
  try {
    const data = await kv.get<ImageSettings>(KV_KEY);
    if (data) {
      // Ensure all fields from default are present if they are missing from stored data
      return { ...defaultImageData, ...data };
    }
    // If no data is in KV, set the default data and return it
    await kv.set(KV_KEY, defaultImageData);
    return defaultImageData;
  } catch (error) {
    console.error("Could not read from Vercel KV. Falling back to default images.", error);
    return defaultImageData;
  }
}
