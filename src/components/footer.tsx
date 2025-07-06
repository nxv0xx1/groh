import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { TikTokIcon } from "./icons/tiktok-icon";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=100078909491799",
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
    },
    {
      href: "https://www.instagram.com/godsrighteousnessorphanagehome/",
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@groh_orphanage",
      icon: <TikTokIcon className="w-5 h-5 fill-current" />,
      name: "TikTok",
    },
  ];
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {currentYear} God’s Righteousness Orphanage Home. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}
              className="text-muted-foreground hover:text-primary transition-colors duration-300">
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
