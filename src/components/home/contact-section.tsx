import ContactForm from './contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import LeafIcon from '@/components/icons/leaf-icon';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We'd love to hear from you! Whether you have questions, want to volunteer, or discuss donations, please reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg border-primary/20">
            <CardHeader>
              <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl md:text-3xl text-primary text-center">Send Us a Message</CardTitle>
              <CardDescription className="text-md text-muted-foreground text-center">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg border-accent/20">
              <CardHeader>
                <div className="mx-auto mb-4 bg-accent/10 p-3 rounded-full w-fit">
                    <MapPin className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl text-accent-foreground text-center">Visit or Write to Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-1">God's Righteousness Orphanage Home</h4>
                  <p className="text-muted-foreground">
                    Avuonkwu Olokoro, Umuahia South L. G. A. <br /> Abia State. Nigeria
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-1 flex items-center justify-center gap-2"><Phone className="h-5 w-5 text-accent"/>Phone</h4>
                  <p className="text-muted-foreground">
                    <a href="tel:07038010835" className="hover:text-primary transition-colors">07038010835</a> / <a href="tel:+2347017924476" className="hover:text-primary transition-colors">+234 701 792 4476</a>
                  </p>
                </div>
                 <div>
                  <h4 className="font-semibold text-lg text-foreground mb-1 flex items-center justify-center gap-2"><Mail className="h-5 w-5 text-accent"/>Email</h4>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@groh.ng" className="hover:text-primary transition-colors">info@groh.ng</a>
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="text-center p-6 bg-background rounded-lg shadow-md">
                <LeafIcon className="h-12 w-12 text-primary mx-auto mb-3"/>
                <p className="text-muted-foreground">
                    Your kindness and support light up the lives of our children. Thank you for considering GROH.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
