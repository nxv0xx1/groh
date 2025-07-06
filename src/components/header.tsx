import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#sponsor", label: "Sponsor" },
    { href: "#donate", label: "Donate" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-xl font-bold">G.R.O.H. Hope Home</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden md:flex">
          <Link href="#donate">Donate Now</Link>
        </Button>
        {/* Mobile menu could be added here later */}
      </div>
    </header>
  );
}
