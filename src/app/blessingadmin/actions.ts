'use server';

import { writeFile, readFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { ImageSettings } from '@/types/images';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'images.json');
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

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

async function saveFile(file: File): Promise<string> {
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const filePath = path.join(uploadDir, filename);
    
    await writeFile(filePath, buffer);
    
    return `/uploads/${filename}`;
}

export async function uploadLogo(formData: FormData) {
  const file = formData.get('logo') as File;
  if (!file || file.size === 0) {
    return { error: 'No file was selected.' };
  }

  try {
    const publicPath = await saveFile(file);
    const imageData = await readImageData();
    imageData.logo = publicPath;
    await writeImageData(imageData);

    revalidatePath('/');
    revalidatePath('/blessingadmin');
    return { success: 'Logo updated successfully!', path: publicPath };
  } catch (error) {
    console.error('Upload Logo Error:', error);
    return { error: 'An error occurred while uploading the logo.' };
  }
}

export async function addHeroImage(formData: FormData) {
  const file = formData.get('heroImage') as File;
  const alt = formData.get('altText') as string;

  if (!file || file.size === 0) {
    return { error: 'No file was selected.' };
  }
  if (!alt) {
    return { error: 'Alternative text is required.' };
  }

  try {
    const publicPath = await saveFile(file);
    const imageData = await readImageData();
    imageData.heroCarousel.push({ src: publicPath, alt, hint: '' });
    await writeImageData(imageData);

    revalidatePath('/');
    revalidatePath('/blessingadmin');
    return { success: 'Hero image added successfully!', path: publicPath };
  } catch (error) {
    console.error('Add Hero Image Error:', error);
    return { error: 'An error occurred while adding the hero image.' };
  }
}

export async function deleteHeroImage(src: string) {
    if (!src.startsWith('/uploads/')) {
        return { error: 'Cannot delete placeholder images.' };
    }
    try {
        const imageData = await readImageData();
        imageData.heroCarousel = imageData.heroCarousel.filter((img) => img.src !== src);
        await writeImageData(imageData);
        
        const filePath = path.join(process.cwd(), 'public', src);
        await unlink(filePath).catch(err => console.error(`Failed to delete file: ${src}`, err));
        
        revalidatePath('/');
        revalidatePath('/blessingadmin');
        return { success: 'Hero image deleted successfully.' };
    } catch(error) {
        console.error('Delete Hero Image Error:', error);
        return { error: 'An error occurred while deleting the hero image.' };
    }
}

export async function updateSponsorImage(formData: FormData) {
    const file = formData.get('sponsorImage') as File;
    if (!file || file.size === 0) {
        return { error: 'No file was selected.' };
    }

    try {
        const publicPath = await saveFile(file);
        const imageData = await readImageData();
        imageData.sponsorImage = publicPath;
        await writeImageData(imageData);

        revalidatePath('/');
        revalidatePath('/blessingadmin');
        return { success: 'Sponsor image updated successfully!', path: publicPath };
    } catch (error) {
        console.error('Update Sponsor Image Error:', error);
        return { error: 'An error occurred while updating the sponsor image.' };
    }
}
