import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact">
      <div className="container mx-auto">
        <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 text-center">
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
        </div>
      </div>
    </section>
  );
}
