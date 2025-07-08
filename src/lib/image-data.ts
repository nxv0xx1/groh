import { readFile } from 'fs/promises';
import path from 'path';
import type { ImageSettings } from '@/types/images';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'images.json');

const defaultImageData: ImageSettings = {
  logo: "",
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
    },
    {
      src: "https://placehold.co/1600x900.png",
      alt: "Children learning in a classroom",
      hint: "kids learning"
    }
  ],
  sponsorImage: "https://placehold.co/600x600.png"
};

export async function getImageData(): Promise<ImageSettings> {
  try {
    const fileContent = await readFile(dataFilePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    // Merge with defaults to ensure all properties are present, even if the file is partially filled
    return { ...defaultImageData, ...jsonData };
  } catch (error) {
    // This can happen if the file doesn't exist yet, which is fine.
    console.warn("Could not read src/data/images.json. Falling back to default images. This is expected on first run.");
    return defaultImageData;
  }
}
