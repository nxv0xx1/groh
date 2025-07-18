'use client';

import type { ImageSettings } from '@/types/images';
import { useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addHeroImage, deleteHeroImage, updateSponsorImage, uploadLogo, updateFavicon, updateDonationAmounts, addGalleryImage, deleteGalleryImage } from '../actions';
import { Trash2, Upload } from 'lucide-react';

export function AdminPanel({ initialImages }: { initialImages: ImageSettings }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const logoFormRef = useRef<HTMLFormElement>(null);
  const sponsorFormRef = useRef<HTMLFormElement>(null);
  const heroFormRef = useRef<HTMLFormElement>(null);
  const faviconFormRef = useRef<HTMLFormElement>(null);
  const donationAmountsFormRef = useRef<HTMLFormElement>(null);
  const galleryFormRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (action: (formData: FormData) => Promise<any>, ref: React.RefObject<HTMLFormElement>) => {
    return (formData: FormData) => {
      // Check if file input is empty for forms that require it
      const fileInput = ref.current?.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files?.length === 0) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please select a file to upload.' });
        return;
      }

      startTransition(async () => {
        try {
          const result = await action(formData);
          if (result?.error) {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
          } else {
            toast({ title: 'Success!', description: result.success });
            ref.current?.reset();
            router.refresh();
          }
        } catch (error) {
            console.error("An unexpected client-side error occurred:", error);
            toast({ variant: 'destructive', title: 'Client Error', description: 'An unexpected error occurred. Please check the console.' });
        }
      });
    };
  };

  const handleDeleteHeroImage = (src: string) => {
    startTransition(async () => {
      const result = await deleteHeroImage(src);
      if (result?.error) {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      } else {
        toast({ title: 'Success!', description: result.success });
        router.refresh();
      }
    });
  };

  const handleDeleteGalleryImage = (src: string) => {
    startTransition(async () => {
      const result = await deleteGalleryImage(src);
      if (result?.error) {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      } else {
        toast({ title: 'Success!', description: 'Gallery image deleted.' });
        router.refresh();
      }
    });
  };

  const canDeleteHeroImages = initialImages.heroCarousel.length > 1;

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Site Logo</CardTitle>
          <CardDescription>Upload a new site logo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {initialImages.logo ? (
              <Image src={initialImages.logo} alt="Current Logo" width={64} height={64} className="rounded-full bg-muted object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">No Logo</div>
            )}
          </div>
          <form ref={logoFormRef} action={handleFormSubmit(uploadLogo, logoFormRef)} className="space-y-2">
            <Label htmlFor="logoFile">New Logo File</Label>
            <Input id="logoFile" name="logoFile" type="file" required accept="image/*" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Uploading...' : <><Upload className="mr-2 h-4 w-4" /> Update Logo</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Site Favicon</CardTitle>
          <CardDescription>Update the browser tab icon (favicon).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {initialImages.favicon ? (
              <Image src={initialImages.favicon} alt="Current Favicon" width={32} height={32} className="rounded-md bg-muted object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs">No Icon</div>
            )}
          </div>
          <form ref={faviconFormRef} action={handleFormSubmit(updateFavicon, faviconFormRef)} className="space-y-2">
            <Label htmlFor="faviconFile">New Favicon File</Label>
            <Input id="faviconFile" name="faviconFile" type="file" required accept="image/png, image/x-icon, image/svg+xml" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Uploading...' : <><Upload className="mr-2 h-4 w-4" /> Update Favicon</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sponsor Section Image</CardTitle>
          <CardDescription>Update the image in the "Sponsor a Child" section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-video w-full">
            {initialImages.sponsorImage ? (
                <Image src={initialImages.sponsorImage} alt="Current Sponsor Image" fill className="object-cover rounded-md" />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm rounded-md">No Image</div>
            )}
          </div>
          <form ref={sponsorFormRef} action={handleFormSubmit(updateSponsorImage, sponsorFormRef)} className="space-y-2">
            <Label htmlFor="sponsorImageFile">New Sponsor Image</Label>
            <Input id="sponsorImageFile" name="sponsorImageFile" type="file" required accept="image/*" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Uploading...' : <><Upload className="mr-2 h-4 w-4" /> Update Image</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Carousel Images</CardTitle>
          <CardDescription>Add or remove images from the homepage carousel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Current Images</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {initialImages.heroCarousel.map((image, index) => (
                <div key={index} className="flex items-center gap-2 text-sm p-1 rounded-md bg-muted/50">
                  <Image src={image.src} alt={image.alt} width={40} height={40} className="object-cover rounded" />
                  <span className="truncate flex-1" title={image.alt}>{image.alt}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteHeroImage(image.src)}
                    disabled={isPending || !canDeleteHeroImages}
                    aria-label="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <form ref={heroFormRef} action={handleFormSubmit(addHeroImage, heroFormRef)} className="space-y-2 border-t pt-4">
            <h4 className="font-semibold">Add New Image</h4>
            <Label htmlFor="heroImageFile">Image File</Label>
            <Input id="heroImageFile" name="heroImageFile" type="file" required accept="image/*" />
            <Label htmlFor="hero-alt">Alternative Text</Label>
            <Input id="hero-alt" name="altText" type="text" required placeholder="e.g., Children playing outside" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : <><Upload className="mr-2 h-4 w-4" /> Add to Carousel</>}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>Add or remove images from the gallery page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Current Images</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 grid grid-cols-3 gap-2">
              {(initialImages.galleryImages || []).map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <Image src={image.src} alt={image.alt} fill className="object-cover rounded-md" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="w-10 h-10"
                      onClick={() => handleDeleteGalleryImage(image.src)}
                      disabled={isPending}
                      aria-label="Delete image"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {(!initialImages.galleryImages || initialImages.galleryImages.length === 0) && (
              <p className="text-sm text-muted-foreground mt-2">No gallery images yet.</p>
            )}
          </div>
          <form ref={galleryFormRef} action={handleFormSubmit(addGalleryImage, galleryFormRef)} className="space-y-2 border-t pt-4">
            <h4 className="font-semibold">Add New Image</h4>
            <Label htmlFor="galleryImageFile">Image File</Label>
            <Input id="galleryImageFile" name="galleryImageFile" type="file" required accept="image/*" />
            <Label htmlFor="gallery-alt">Alternative Text</Label>
            <Input id="gallery-alt" name="altText" type="text" required placeholder="e.g., Children playing outside" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : <><Upload className="mr-2 h-4 w-4" /> Add to Gallery</>}
            </Button>
          </form>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Donation Quick Select</CardTitle>
          <CardDescription>Set the preset donation amounts (in NGN).</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={donationAmountsFormRef} action={handleFormSubmit(updateDonationAmounts, donationAmountsFormRef)} className="space-y-2">
            <Label htmlFor="donation-amounts">Amounts (comma-separated)</Label>
            <Input 
              id="donation-amounts" 
              name="donationAmounts" 
              type="text" 
              required 
              placeholder="e.g., 5000, 10000, 25000"
              defaultValue={initialImages.donationAmounts?.join(', ')}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Amounts'}
            </Button>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
