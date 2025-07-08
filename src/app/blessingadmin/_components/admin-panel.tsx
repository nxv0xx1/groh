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
import { addHeroImage, deleteHeroImage, updateSponsorImage, uploadLogo, updateFavicon } from '../actions';
import { Trash2 } from 'lucide-react';

export function AdminPanel({ initialImages }: { initialImages: ImageSettings }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const logoFormRef = useRef<HTMLFormElement>(null);
  const sponsorFormRef = useRef<HTMLFormElement>(null);
  const heroFormRef = useRef<HTMLFormElement>(null);
  const faviconFormRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (action: (formData: FormData) => Promise<any>, ref: React.RefObject<HTMLFormElement>) => {
    return (formData: FormData) => {
      startTransition(async () => {
        const result = await action(formData);
        if (result?.error) {
          toast({ variant: 'destructive', title: 'Error', description: result.error });
        } else {
          toast({ title: 'Success!', description: result.success });
          ref.current?.reset();
          router.refresh();
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

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Site Logo</CardTitle>
          <CardDescription>Update the site logo using a Google Drive link.</CardDescription>
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
            <Label htmlFor="logo-url">New Logo URL</Label>
            <Input id="logo-url" name="logoUrl" type="text" required placeholder="Paste Google Drive link here" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Logo'}
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
            <Label htmlFor="favicon-url">New Favicon URL</Label>
            <Input id="favicon-url" name="faviconUrl" type="text" required placeholder="Paste Google Drive link here" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Favicon'}
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
            <Image src={initialImages.sponsorImage} alt="Current Sponsor Image" fill className="object-cover rounded-md" />
          </div>
          <form ref={sponsorFormRef} action={handleFormSubmit(updateSponsorImage, sponsorFormRef)} className="space-y-2">
            <Label htmlFor="sponsor-url">New Sponsor Image URL</Label>
            <Input id="sponsor-url" name="sponsorImageUrl" type="text" required placeholder="Paste Google Drive link here" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Sponsor Image'}
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
                    disabled={isPending}
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
            <Label htmlFor="hero-url">Image URL</Label>
            <Input id="hero-url" name="heroImageUrl" type="text" required placeholder="Paste Google Drive link here" />
            <Label htmlFor="hero-alt">Alternative Text</Label>
            <Input id="hero-alt" name="altText" type="text" required placeholder="e.g., Children playing outside" />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add to Carousel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
