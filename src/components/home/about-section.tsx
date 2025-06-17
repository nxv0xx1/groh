import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeafIcon from '@/components/icons/leaf-icon';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our Commitment
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Discover the heart behind God's Righteousness Orphan Home and our dedication to every child's well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20">
            <CardHeader className="flex flex-row items-center space-x-3">
              <LeafIcon className="h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-2xl text-primary">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To provide a safe, nurturing, and Christ-centered home for orphaned and vulnerable children, equipping them with education, healthcare, and spiritual guidance to reach their full potential and become responsible members of society. (Placeholder text, refer to groh.ng for actual content)
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/20">
            <CardHeader className="flex flex-row items-center space-x-3">
              <LeafIcon className="h-10 w-10 text-accent" />
              <CardTitle className="font-headline text-2xl text-accent-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To see every child in our care grow into a healthy, educated, and empowered individual, rooted in faith and capable of making a positive impact on their communities and the world. We envision a future where no child is left behind. (Placeholder text, refer to groh.ng for actual content)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
