'use server';

import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { ImageSettings } from '@/types/images';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'images.json');

async function readImageData(): Promise<ImageSettings> {
  try {
    const fileContent = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist or is invalid, return a default structure
    return {
      logo: '',
      heroCarousel: [],
      sponsorImage: '',
    };
  }
}

async function writeImageData(data: ImageSettings) {
  await mkdir(path.dirname(dataFilePath), { recursive: true });
  await writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

function convertGoogleDriveLink(url: string): string {
    if (!url || !url.includes('drive.google.com')) {
      return url; 
    }
    const regex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url;
}

export async function uploadLogo(formData: FormData) {
  const url = formData.get('logoUrl') as string;
  if (!url) {
    return { error: 'No URL was provided.' };
  }

  try {
    const convertedUrl = convertGoogleDriveLink(url);
    const imageData = await readImageData();
    imageData.logo = convertedUrl;
    await writeImageData(imageData);

    revalidatePath('/');
    revalidatePath('/blessingadmin');
    return { success: 'Logo updated successfully!', path: convertedUrl };
  } catch (error) {
    console.error('Upload Logo Error:', error);
    return { error: 'An error occurred while updating the logo.' };
  }
}

export async function addHeroImage(formData: FormData) {
  const url = formData.get('heroImageUrl') as string;
  const alt = formData.get('altText') as string;

  if (!url) {
    return { error: 'No URL was provided.' };
  }
  if (!alt) {
    return { error: 'Alternative text is required.' };
  }

  try {
    const convertedUrl = convertGoogleDriveLink(url);
    const imageData = await readImageData();
    imageData.heroCarousel.push({ src: convertedUrl, alt, hint: '' });
    await writeImageData(imageData);

    revalidatePath('/');
    revalidatePath('/blessingadmin');
    return { success: 'Hero image added successfully!', path: convertedUrl };
  } catch (error) {
    console.error('Add Hero Image Error:', error);
    return { error: 'An error occurred while adding the hero image.' };
  }
}

export async function deleteHeroImage(src: string) {
    if (src.includes('placehold.co')) {
        return { error: 'Cannot delete placeholder images.' };
    }
    try {
        const imageData = await readImageData();
        imageData.heroCarousel = imageData.heroCarousel.filter((img) => img.src !== src);
        await writeImageData(imageData);
        
        revalidatePath('/');
        revalidatePath('/blessingadmin');
        return { success: 'Hero image deleted successfully.' };
    } catch(error) {
        console.error('Delete Hero Image Error:', error);
        return { error: 'An error occurred while deleting the hero image.' };
    }
}

export async function updateSponsorImage(formData: FormData) {
    const url = formData.get('sponsorImageUrl') as string;
    if (!url) {
        return { error: 'No URL was provided.' };
    }

    try {
        const convertedUrl = convertGoogleDriveLink(url);
        const imageData = await readImageData();
        imageData.sponsorImage = convertedUrl;
        await writeImageData(imageData);

        revalidatePath('/');
        revalidatePath('/blessingadmin');
        return { success: 'Sponsor image updated successfully!', path: convertedUrl };
    } catch (error) {
        console.error('Update Sponsor Image Error:', error);
        return { error: 'An error occurred while updating the sponsor image.' };
    }
}
