import { getImageData } from '@/lib/image-data';
import { GalleryGrid } from './_components/gallery-grid';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function GalleryPage() {
  const { galleryImages, logo } = await getImageData();
  
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header logo={logo} />
      <main className="flex-1">
        <section className="container mx-auto py-10 pt-28">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Gallery</h1>
            <p className="text-muted-foreground mt-2 text-lg">A glimpse into our home and the lives we nurture.</p>
          </div>
          <GalleryGrid images={galleryImages ?? []} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
