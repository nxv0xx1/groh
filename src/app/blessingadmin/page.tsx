import { getImageData } from '@/lib/image-data';
import { AdminPanel } from './_components/admin-panel';

export default async function AdminPage() {
  const images = await getImageData();
  
  return (
    <div className="bg-background">
      <section className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage the images displayed on your website.</p>
        </div>
        <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 mb-8 rounded-r-lg" role="alert">
          <h3 className="font-bold">Important Notice</h3>
          <p className="text-sm">
            This admin panel saves uploaded images directly to the project's filesystem. This method is 
            <strong> not suitable for a live, deployed website</strong>, as uploaded files will be deleted on every new deployment.
            For a production-ready solution, a cloud storage service is required.
          </p>
        </div>
        <AdminPanel initialImages={images} />
      </section>
    </div>
  );
}
