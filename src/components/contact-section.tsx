import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { TikTokIcon } from "./icons/tiktok-icon";
import Link from "next/link";

export function ContactSection() {
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=100078909491799",
      icon: <Facebook className="w-6 h-6" />,
      name: "Facebook",
    },
    {
      href: "https://www.instagram.com/godsrighteousnessorphanagehome/",
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@groh_orphanage",
      icon: <TikTokIcon className="w-6 h-6 fill-current" />,
      name: "TikTok",
    },
  ];

  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
          We would love to hear from you. Whether you have a question, want to visit, or wish to help, feel free to reach out.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 text-primary rounded-full p-4 mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-2xl font-semibold mb-2">Phone</h3>
            <a href="tel:07038010835" className="hover:text-primary">07038010835</a>
            <a href="tel:+2347017924476" className="hover:text-primary">+2347017924476</a>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 text-primary rounded-full p-4 mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-2xl font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground italic">groh.orphanage@email.com</p>
            <p className="text-sm text-muted-foreground">(Placeholder)</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 text-primary rounded-full p-4 mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-2xl font-semibold mb-2">Address</h3>
            <p>Avuonkwu Olokoro, Umuahia South L.G.A., Abia State, Nigeria</p>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="font-headline text-2xl font-semibold mb-4">Follow Our Journey</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}
                className="text-muted-foreground hover:text-primary transition-colors duration-300">
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
