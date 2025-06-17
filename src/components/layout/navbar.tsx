"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LeafIcon from '@/components/icons/leaf-icon';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#impact', label: 'Our Impact' },
    { href: '#get-involved', label: 'Get Involved' },
    { href: '#contact', label: 'Contact Us' },
  ];

  const NavLinkItems = ({ inSheet }: { inSheet?: boolean }) => (
    <>
      {navLinks.map((link) => (
        inSheet ? (
          <SheetClose asChild key={link.href}>
            <Link
              href={link.href}
              className="block px-4 py-2 text-lg hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          </SheetClose>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md"
          >
            {link.label}
          </Link>
        )
      ))}
    </>
  );


  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <LeafIcon className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-primary">GROH Connect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <NavLinkItems />
          </nav>
          
          <div className="hidden md:block">
             <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="https://groh.ng" target="_blank" rel="noopener noreferrer">Donate Now</a>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                         <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <LeafIcon className="h-8 w-8 text-primary" />
                            <span className="font-headline text-xl font-bold text-primary">GROH Connect</span>
                        </Link>
                        <SheetClose asChild>
                             <Button variant="ghost" size="icon">
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                        </SheetClose>
                    </div>
                    <nav className="flex flex-col space-y-3">
                        <NavLinkItems inSheet />
                    </nav>
                    <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <a href="https://groh.ng" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                        Donate Now
                        </a>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
