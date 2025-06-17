import AiRecommendationsForm from './ai-recommendations-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const GetInvolvedSection = () => {
  return (
    <section id="get-involved" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            Make a Difference Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Your support can change lives. Explore ways to contribute your time, skills, or resources.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <AiRecommendationsForm />

          <div className="space-y-8">
            <Card className="shadow-lg border-accent/20">
              <CardHeader className="text-center">
                 <div className="mx-auto mb-4 bg-accent/10 p-3 rounded-full w-fit">
                    <Heart className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl md:text-3xl text-accent-foreground">Donate Securely</CardTitle>
                <CardDescription className="text-md text-muted-foreground">
                  Your generous donations directly support the children's needs, from education to healthcare. Every contribution counts.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Click the button below to make a secure donation through the official GROH website.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-3 text-lg rounded-lg">
                  <a href="https://groh.ng" target="_blank" rel="noopener noreferrer">
                    Donate via groh.ng
                  </a>
                </Button>
                 <p className="mt-4 text-sm text-muted-foreground">
                    You will be redirected to the official God's Righteousness Orphan Home website.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-secondary/20">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Other Ways to Help</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>Sponsor a child's education or healthcare.</li>
                  <li>Organize a fundraising event in your community.</li>
                  <li>Donate essential supplies like food, clothing, and school materials.</li>
                  <li>Spread awareness about GROH and our mission.</li>
                </ul>
                <p className="mt-4 text-sm">
                  For more information on these options, please <Link href="#contact" className="text-primary hover:underline">contact us</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
