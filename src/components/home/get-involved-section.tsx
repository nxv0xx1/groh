
import AiRecommendationsForm from './ai-recommendations-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image'; // Added import for Image

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
              <div className="w-full bg-slate-100 dark:bg-slate-800 p-4 flex justify-center items-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <Image
                      src="/groh-logo.png" 
                      alt="GROH Shelter & Education - Playful logo with children and a house"
                      layout="fill"
                      objectFit="contain"
                      data-ai-hint="children shelter education logo"
                    />
                </div>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl md:text-3xl text-accent-foreground">Donate Securely via Paystack</CardTitle>
                <CardDescription className="text-md text-muted-foreground">
                  Your generous donations directly support the children's needs&mdash;from education to healthcare. Every contribution counts towards a brighter future.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Click the button below to make a secure one-time or recurring donation through Paystack.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-3 text-lg rounded-lg">
                  {/* IMPORTANT: Update this link to your actual Paystack donation page */}
                  <a href="https://paystack.com/pay/your-groh-paystack-link" target="_blank" rel="noopener noreferrer">
                    Donate with Paystack
                  </a>
                </Button>
                 <p className="mt-4 text-sm text-muted-foreground">
                    You will be redirected to our secure Paystack payment page. Thank you for your support!
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
