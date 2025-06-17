import Link from 'next/link';
import LeafIcon from '@/components/icons/leaf-icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <LeafIcon className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-primary">GROH Connect</span>
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
              <li><a href="https://groh.ng" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Donate</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-headline text-lg font-semibold mb-3 text-primary">Connect</h3>
            <p className="mb-1">Email: <a href="mailto:info@groh.ng" className="hover:text-primary transition-colors">info@groh.ng</a></p>
            <p>Phone: <a href="tel:+234XXXXXXXXXX" className="hover:text-primary transition-colors">+234 XXX XXXX XXX</a> (Placeholder)</p>
            {/* Add social media links if available */}
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} GROH Connect. All rights reserved. Inspired by God's Righteousness Orphan Home.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
