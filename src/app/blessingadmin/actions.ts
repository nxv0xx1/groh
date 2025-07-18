
'use server';

import { revalidatePath } from 'next/cache';
import type { ImageSettings } from '@/types/images';
import { del } from '@vercel/blob';
import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const KV_KEY = 'image_settings';

async function readImageData(): Promise<ImageSettings> {
  const { getImageData: getDefaultImageData } = await import('@/lib/image-data');
  try {
    const data = await kv.get<ImageSettings>(KV_KEY);
    if (!data) {
      return getDefaultImageData();
    }
    return data;
  } catch (error) {
     console.warn("Could not read from KV, falling back to default image data.", error)
     return getDefaultImageData();
  }
}

async function writeImageData(data: ImageSettings) {
  await kv.set(KV_KEY, data);
}

function revalidateAll() {
  revalidatePath('/');
  revalidatePath('/blessingadmin');
  revalidatePath('/gallery');
  revalidatePath('/layout');
}

function isVercelBlobUrl(url: string | undefined): boolean {
    if (!url) return false;
    try {
        const hostname = new URL(url).hostname;
        return hostname.endsWith('.public.blob.vercel-storage.com');
    } catch (e) {
        return false;
    }
}

async function deleteFile(url: string | undefined): Promise<void> {
    if (!isVercelBlobUrl(url)) return;
    try {
        await del(url!);
    } catch (error) {
        console.warn(`Could not delete file from blob storage: ${url}`, error);
    }
}

export async function uploadLogo(payload: { url: string }) {
  try {
    const newUrl = payload.url;
    if (!newUrl) {
      return { error: 'No file URL was provided.' };
    }

    const imageData = await readImageData();
    await deleteFile(imageData.logo);
    
    imageData.logo = newUrl;
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Logo updated successfully!', path: newUrl };
  } catch (error: any) {
    console.error('Upload Logo Error:', error);
    return { error: error.message || 'An error occurred while updating the logo.' };
  }
}

export async function updateFavicon(payload: { url: string }) {
  try {
    const newUrl = payload.url;
    if (!newUrl) {
      return { error: 'No file URL was provided.' };
    }

    const imageData = await readImageData();
    await deleteFile(imageData.favicon);

    imageData.favicon = newUrl;
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Favicon updated successfully!', path: newUrl };
  } catch (error: any) {
    console.error('Update Favicon Error:', error);
    return { error: error.message || 'An error occurred while updating the favicon.' };
  }
}

export async function addHeroImage(payload: { url: string; altText: string }) {
  try {
    const { url: newUrl, altText: alt } = payload;

    if (!newUrl) {
      return { error: 'No file URL was provided.' };
    }
    if (!alt) {
      return { error: 'Alternative text is required.' };
    }

    const imageData = await readImageData();
    imageData.heroCarousel.push({ src: newUrl, alt, hint: '' });
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Hero image added successfully!', path: newUrl };
  } catch (error: any) {
    console.error('Add Hero Image Error:', error);
    return { error: error.message || 'An error occurred while adding the hero image.' };
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
        await deleteFile(src);
        
        revalidateAll();
        return { success: 'Hero image deleted successfully.' };
    } catch(error: any) {
        console.error('Delete Hero Image Error:', error);
        return { error: error.message || 'An error occurred while deleting the hero image.' };
    }
}

export async function updateSponsorImage(payload: { url: string }) {
    try {
        const newUrl = payload.url;
        if (!newUrl) {
            return { error: 'No file URL was provided.' };
        }

        const imageData = await readImageData();
        await deleteFile(imageData.sponsorImage);

        imageData.sponsorImage = newUrl;
        await writeImageData(imageData);

        revalidateAll();
        return { success: 'Sponsor image updated successfully!', path: newUrl };
    } catch (error: any) {
        console.error('Update Sponsor Image Error:', error);
        return { error: error.message || 'An error occurred while updating the sponsor image.' };
    }
}

export async function updateDonationAmounts(formData: FormData) {
  try {
    const amountsStr = formData.get('donationAmounts') as string;
    if (!amountsStr) {
      return { error: 'No amounts were provided.' };
    }

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
  } catch (error: any) {
    console.error('Update Donation Amounts Error:', error);
    return { error: error.message || 'An error occurred while updating the amounts.' };
  }
}

export async function addGalleryImage(payload: { url: string; altText: string }) {
  try {
    const { url: newUrl, altText: alt } = payload;
    if (!newUrl) {
      return { error: 'No file URL was provided.' };
    }
    if (!alt) {
      return { error: 'Alternative text is required.' };
    }

    const imageData = await readImageData();
    
    if (!imageData.galleryImages) {
        imageData.galleryImages = [];
    }
    imageData.galleryImages.push({ src: newUrl, alt, hint: '' });
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Gallery image added successfully!', path: newUrl };
  } catch (error: any) {
    console.error('Add Gallery Image Error:', error);
    return { error: error.message || 'An error occurred while adding the gallery image.' };
  }
}

export async function deleteGalleryImage(src: string) {
    try {
        const imageData = await readImageData();
        imageData.galleryImages = (imageData.galleryImages || []).filter((img) => img.src !== src);
        await writeImageData(imageData);
        await deleteFile(src);
        
        revalidateAll();
        return { success: 'Gallery image deleted successfully.' };
    } catch(error: any) {
        console.error('Delete Gallery Image Error:', error);
        return { error: error.message || 'An error occurred while deleting the gallery image.' };
    }
}
