import { getImageData } from '@/lib/image-data';
import { AdminPanel } from './_components/admin-panel';
import { AlertCircle } from 'lucide-react';

export default async function AdminPage() {
  const images = await getImageData();
  
  return (
    <div className="bg-background">
      <section className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage the images displayed on your website.</p>
        </div>
        <div className="bg-accent/50 border-l-4 border-primary text-foreground/90 p-4 mb-8 rounded-r-lg" role="alert">
          <div className='flex items-start'>
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold">Image Upload Instructions</h3>
              <p className="text-sm mt-2">
                Use the forms below to upload images directly. The system will automatically handle storage and link them to your site.
              </p>
            </div>
          </div>
        </div>
        <AdminPanel initialImages={images} />
      </section>
    </div>
  );
}
