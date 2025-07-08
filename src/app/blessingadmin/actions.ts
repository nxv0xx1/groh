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
      favicon: '',
      heroCarousel: [],
      sponsorImage: '',
      donationAmounts: [],
      galleryImages: [],
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

function revalidateAll() {
  revalidatePath('/');
  revalidatePath('/blessingadmin');
  revalidatePath('/gallery');
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

    revalidateAll();
    return { success: 'Logo updated successfully!', path: convertedUrl };
  } catch (error) {
    console.error('Upload Logo Error:', error);
    return { error: 'An error occurred while updating the logo.' };
  }
}

export async function updateFavicon(formData: FormData) {
  const url = formData.get('faviconUrl') as string;
  if (!url) {
    return { error: 'No URL was provided.' };
  }

  try {
    const convertedUrl = convertGoogleDriveLink(url);
    const imageData = await readImageData();
    imageData.favicon = convertedUrl;
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Favicon updated successfully!', path: convertedUrl };
  } catch (error) {
    console.error('Update Favicon Error:', error);
    return { error: 'An error occurred while updating the favicon.' };
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

    revalidateAll();
    return { success: 'Hero image added successfully!', path: convertedUrl };
  } catch (error) {
    console.error('Add Hero Image Error:', error);
    return { error: 'An error occurred while adding the hero image.' };
  }
}

export async function deleteHeroImage(src: string) {
    try {
        const imageData = await readImageData();
        if (imageData.heroCarousel.length <= 1) {
            return { error: 'Cannot delete the last image. The carousel must have at least one image.' };
        }
        
        imageData.heroCarousel = imageData.heroCarousel.filter((img) => img.src !== src);
        await writeImageData(imageData);
        
        revalidateAll();
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

        revalidateAll();
        return { success: 'Sponsor image updated successfully!', path: convertedUrl };
    } catch (error) {
        console.error('Update Sponsor Image Error:', error);
        return { error: 'An error occurred while updating the sponsor image.' };
    }
}

export async function updateDonationAmounts(formData: FormData) {
  const amountsStr = formData.get('donationAmounts') as string;
  if (!amountsStr) {
    return { error: 'No amounts were provided.' };
  }

  try {
    const amounts = amountsStr.split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n > 0);

    if (amounts.length === 0) {
      return { error: 'Please provide valid, positive numbers.' };
    }
    
    const imageData = await readImageData();
    imageData.donationAmounts = amounts.sort((a, b) => a - b);
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Donation amounts updated successfully!' };
  } catch (error) {
    console.error('Update Donation Amounts Error:', error);
    return { error: 'An error occurred while updating the amounts.' };
  }
}

export async function addGalleryImage(formData: FormData) {
  const url = formData.get('galleryImageUrl') as string;
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
    if (!imageData.galleryImages) {
        imageData.galleryImages = [];
    }
    imageData.galleryImages.push({ src: convertedUrl, alt, hint: '' });
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Gallery image added successfully!', path: convertedUrl };
  } catch (error) {
    console.error('Add Gallery Image Error:', error);
    return { error: 'An error occurred while adding the gallery image.' };
  }
}

export async function deleteGalleryImage(src: string) {
    try {
        const imageData = await readImageData();
        imageData.galleryImages = imageData.galleryImages.filter((img) => img.src !== src);
        await writeImageData(imageData);
        
        revalidateAll();
        return { success: 'Gallery image deleted successfully.' };
    } catch(error) {
        console.error('Delete Gallery Image Error:', error);
        return { error: 'An error occurred while deleting the gallery image.' };
    }
}
