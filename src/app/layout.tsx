import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getImageData } from "@/lib/image-data";

export async function generateMetadata(): Promise<Metadata> {
  const { favicon } = await getImageData();
 
  return {
    title: "G.R.O.H. | God's Righteousness Orphanage Home",
    description: "God's Righteousness Orphanage Home - A place of belonging, healing, and hope.",
    icons: {
      icon: favicon || undefined,
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
