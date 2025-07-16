
'use server';

import { revalidatePath } from 'next/cache';
import type { ImageSettings, HeroImage } from '@/types/images';
import { put, del } from '@vercel/blob';
import { kv } from '@vercel/kv';

const KV_KEY = 'image_settings';

// Helper function to ensure environment is ready
function checkEnvironment() {
  if (process.env.VERCEL_ENV === 'production' && (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN)) {
    throw new Error('Vercel KV credentials are not configured in the production environment.');
  }
   if (process.env.VERCEL_ENV === 'production' && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Vercel Blob storage token is not configured in the production environment.');
  }
}

async function readImageData(): Promise<ImageSettings> {
  checkEnvironment();
  const data = await kv.get<ImageSettings>(KV_KEY);
  if (!data) {
    // This could be the first run, so let's check the default data function
    const { getImageData } = await import('@/lib/image-data');
    return getImageData();
  }
  return data;
}

async function writeImageData(data: ImageSettings) {
  checkEnvironment();
  await kv.set(KV_KEY, data);
}

function revalidateAll() {
  revalidatePath('/');
  revalidatePath('/blessingadmin');
  revalidatePath('/gallery');
  revalidatePath('/layout'); // For favicon
}

async function uploadFile(file: File, folder: string): Promise<string> {
    checkEnvironment();
    if (!file || file.size === 0) {
        throw new Error('No file was provided or the file is empty.');
    }
    const blob = await put(`${folder}/${file.name}`, file, {
        access: 'public',
        addRandomSuffix: false,
    });
    return blob.url;
}

async function deleteFile(url: string | undefined): Promise<void> {
    if (!url) return;
    try {
        checkEnvironment();
        await del(url);
    } catch (error) {
        // Log the error but don't block the operation
        console.warn(`Could not delete file from blob storage: ${url}`, error);
    }
}

export async function uploadLogo(formData: FormData) {
  const file = formData.get('logoFile') as File;
  if (!file) {
    return { error: 'No file was provided.' };
  }

  try {
    const imageData = await readImageData();
    await deleteFile(imageData.logo);
    
    const newUrl = await uploadFile(file, 'logos');
    imageData.logo = newUrl;
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Logo updated successfully!', path: newUrl };
  } catch (error: any) {
    console.error('Upload Logo Error:', error);
    return { error: error.message || 'An error occurred while updating the logo.' };
  }
}

export async function updateFavicon(formData: FormData) {
  const file = formData.get('faviconFile') as File;
  if (!file) {
    return { error: 'No file was provided.' };
  }

  try {
    const imageData = await readImageData();
    await deleteFile(imageData.favicon);

    const newUrl = await uploadFile(file, 'favicons');
    imageData.favicon = newUrl;
    await writeImageData(imageData);

    revalidateAll();
    return { success: 'Favicon updated successfully!', path: newUrl };
  } catch (error: any) {
    console.error('Update Favicon Error:', error);
    return { error: error.message || 'An error occurred while updating the favicon.' };
  }
}

export async function addHeroImage(formData: FormData) {
  const file = formData.get('heroImageFile') as File;
  const alt = formData.get('altText') as string;

  if (!file) {
    return { error: 'No file was provided.' };
  }
  if (!alt) {
    return { error: 'Alternative text is required.' };
  }

  try {
    const newUrl = await uploadFile(file, 'hero_carousel');
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

export async function updateSponsorImage(formData: FormData) {
    const file = formData.get('sponsorImageFile') as File;
    if (!file) {
        return { error: 'No file was provided.' };
    }

    try {
        const imageData = await readImageData();
        await deleteFile(imageData.sponsorImage);

        const newUrl = await uploadFile(file, 'sponsor_images');
        imageData.sponsorImage = newUrl;
        await writeImageData(imageData);

        revalidateAll();
        return { success: 'Sponsor image updated successfully!', path: newUrl };
    } catch (error: any) {
        console.error('Update Sponsor Image Error:', error);
        return { error: error..message || 'An error occurred while updating the sponsor image.' };
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
  } catch (error: any) {
    console.error('Update Donation Amounts Error:', error);
    return { error: error.message || 'An error occurred while updating the amounts.' };
  }
}

export async function addGalleryImage(formData: FormData) {
  const file = formData.get('galleryImageFile') as File;
  const alt = formData.get('altText') as string;

  if (!file) {
    return { error: 'No file was provided.' };
  }
  if (!alt) {
    return { error: 'Alternative text is required.' };
  }

  try {
    const newUrl = await uploadFile(file, 'gallery');
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
        imageData.galleryImages = imageData.galleryImages.filter((img) => img.src !== src);
        await writeImageData(imageData);
        await deleteFile(src);
        
        revalidateAll();
        return { success: 'Gallery image deleted successfully.' };
    } catch(error: any) {
        console.error('Delete Gallery Image Error:', error);
        return { error: error.message || 'An error occurred while deleting the gallery image.' };
    }
}
