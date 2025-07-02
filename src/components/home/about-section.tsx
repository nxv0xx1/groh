import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeafIcon from '@/components/icons/leaf-icon';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            About GROH
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GROH is a family run orphanage organisation established in July, 2021.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 items-start max-w-3xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20">
            <CardHeader className="flex flex-row items-center space-x-3">
              <LeafIcon className="h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-2xl text-primary">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                At G.R.O.H., we are committed to providing every child with safe shelter, access to quality education, and a strong foundation in Christian faith. We nurture each child with love, integrity, and compassion, helping them grow into responsible, godly individuals. Our home is a place of belonging, healing, and hope. We believe in raising children who will serve others and reflect God’s righteousness in the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
