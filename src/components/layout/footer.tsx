import Link from 'next/link';
import LeafIcon from '@/components/icons/leaf-icon';
import TiktokIcon from '@/components/icons/tiktok-icon';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <LeafIcon className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-primary">GROH</span>
            </Link>
            <p className="text-sm text-center md:text-left">
              Supporting God's Righteousness Orphan Home.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-headline text-lg font-semibold mb-3 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#get-involved" className="hover:text-primary transition-colors">Get Involved</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="https://paystack.com/pay/your-groh-paystack-link" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Donate</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-headline text-lg font-semibold mb-3 text-primary">Connect</h3>
            <p className="mb-1">Email: <a href="mailto:info@groh.ng" className="hover:text-primary transition-colors">info@groh.ng</a></p>
            <p className="mb-4">Phone: <a href="tel:07038010835" className="hover:text-primary transition-colors">07038010835</a></p>
            <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://www.facebook.com/share/16YAGFmnai/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Facebook className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                </a>
                <a href="https://www.instagram.com/godsrighteousnessorphanagehome?igsh=bXRmNTQ5Z2kzNmJn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@groh_orphanage?_t=ZN-8xX5hxGn8uE&_r=1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <TiktokIcon className="h-6 w-6" />
                    <span className="sr-only">TikTok</span>
                </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} GROH. All rights reserved. Inspired by God's Righteousness Orphan Home.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
