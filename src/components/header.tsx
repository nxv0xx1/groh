'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Mountain, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  logo: string;
}

const navLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "/#about", label: "About" },
    { href: "/#sponsor", label: "Sponsor" },
    { href: "/#contact", label: "Contact" },
];

export function Header({ logo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled ? "border-b border-border/20 bg-background/90 backdrop-blur-sm shadow-sm" : "border-b border-transparent"
      )}>
      <div className={cn(
          "container mx-auto flex items-center justify-between transition-all duration-300 ease-in-out",
          scrolled ? "h-20" : "h-24"
        )}>
        
        {/* Mobile Header: Logo left, hamburger right */}
        <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center gap-3">
                {logo ? (
                    <Image src={logo} alt="G.R.O.H. Logo" width={40} height={40} className="rounded-full object-cover" />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Mountain className="h-6 w-6" />
                    </div>
                )}
                {/* Short name for mobile */}
                <span className="font-headline text-xl font-bold">G.R.O.H.</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs p-0">
                    <div className="flex h-full flex-col">
                        <div className="p-6 border-b">
                            <SheetClose asChild>
                                <Link href="/">
                                    <span className="font-headline text-xl font-bold">God's Righteousness Orphanage Home</span>
                                </Link>
                            </SheetClose>
                        </div>
                        <nav className="flex flex-col gap-1 p-6">
                            {navLinks.map((link) => (
                                <SheetClose asChild key={link.href}>
                                    <Link href={link.href} className="rounded-md p-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                        <div className="mt-auto p-6">
                            <SheetClose asChild>
                                <Button asChild className="w-full">
                                    <Link href="/#donate">Donate Now</Link>
                                </Button>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop Header: Logo left, nav right */}
        <div className="hidden w-full items-center justify-between md:flex">
            <Link href="/" className="flex items-center gap-3">
                {logo ? (
                    <Image src={logo} alt="G.R.O.H. Logo" width={scrolled ? 48: 56} height={scrolled ? 48 : 56} className="rounded-full object-cover transition-all duration-300 ease-in-out" />
                ) : (
                    <div className={cn("flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 ease-in-out", scrolled ? "h-12 w-12" : "h-14 w-14")}>
                        <Mountain className="h-6 w-6" />
                    </div>
                )}
                <span className="font-headline text-lg font-bold">God's Righteousness Orphanage Home</span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
                <Button asChild>
                    <Link href="/#donate">Donate Now</Link>
                </Button>
            </nav>
        </div>

      </div>
    </header>
  );
}
