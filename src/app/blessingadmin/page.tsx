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
              <h3 className="font-bold">How to Use Google Drive for Images</h3>
              <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
                <li>Upload your image to Google Drive.</li>
                <li>Right-click the file and select <strong>Share</strong> &gt; <strong>Share</strong>.</li>
                <li>Under "General access", change "Restricted" to <strong>"Anyone with the link"</strong>.</li>
                <li>Click <strong>"Copy link"</strong> and paste it into the appropriate field below.</li>
              </ol>
              <p className="text-sm mt-2">
                The system will automatically convert the link for display on the website.
              </p>
            </div>
          </div>
        </div>
        <AdminPanel initialImages={images} />
      </section>
    </div>
  );
}
