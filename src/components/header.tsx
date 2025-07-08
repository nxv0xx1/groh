'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Mountain, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface HeaderProps {
  logo: string;
}

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#sponsor", label: "Sponsor" },
    { href: "#donate", label: "Donate" },
    { href: "#contact", label: "Contact" },
];

export function Header({ logo }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between">
        
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
                                    <Link href="#donate">Donate Now</Link>
                                </Button>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop Header: Centered logo, split nav */}
        <div className="hidden w-full items-center md:flex">
            <nav className="flex flex-1 items-center justify-start gap-8 text-sm font-medium">
                {navLinks.slice(0, 2).map((link) => (
                    <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="flex-shrink-0">
                <Link href="/" className="flex flex-col items-center gap-2 text-center">
                    {logo ? (
                        <Image src={logo} alt="G.R.O.H. Logo" width={48} height={48} className="rounded-full object-cover" />
                    ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Mountain className="h-6 w-6" />
                        </div>
                    )}
                    <span className="font-headline text-xs font-bold whitespace-nowrap">God's Righteousness Orphanage Home</span>
                </Link>
            </div>

            <nav className="flex flex-1 items-center justify-end gap-8 text-sm font-medium">
                {navLinks.slice(2).map((link) => (
                    <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
                <Button asChild>
                    <Link href="#donate">Donate Now</Link>
                </Button>
            </nav>
        </div>

      </div>
    </header>
  );
}
