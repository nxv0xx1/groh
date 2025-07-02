
import AiRecommendationsForm from './ai-recommendations-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Landmark } from 'lucide-react';


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
            <Card className="shadow-lg border-accent/20 flex flex-col">
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
                <CardTitle className="font-headline text-2xl md:text-3xl text-accent-foreground">Donate via Paystack</CardTitle>
                <CardDescription className="text-md text-muted-foreground">
                  Your generous donations directly support the children's needs—from education to healthcare. Every contribution counts towards a brighter future.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground mb-6">
                  Click the button below to make a secure one-time or recurring donation through Paystack.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-3 text-lg rounded-lg">
                  <a href="https://paystack.com/pay/your-groh-paystack-link" target="_blank" rel="noopener noreferrer">
                    Donate with Paystack
                  </a>
                </Button>
                 <p className="mt-4 text-sm text-muted-foreground">
                    You will be redirected to our secure Paystack payment page.
                </p>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="flex flex-col items-center text-center p-6 pt-0">
                  <h4 className="font-headline text-xl text-primary mb-3">Or Donate via Bank Transfer</h4>
                  <div className="text-left bg-primary/5 p-4 rounded-lg border border-primary/20 w-full max-w-sm">
                      <p className="flex items-center gap-2 font-semibold text-foreground"><Landmark className="h-5 w-5 text-primary"/>God’s Righteousness Orphanage Home</p>
                      <p className="text-muted-foreground pl-7">Zenith Bank</p>
                      <p className="font-mono text-lg text-primary pl-7">1220981362</p>
                  </div>
                   <p className="mt-4 text-sm text-muted-foreground">
                    Thank you for your support!
                  </p>
              </CardFooter>
            </Card>

            <Card className="shadow-lg border-secondary/20">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Other Ways to Help</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>Sponsor a child (education and needs).</li>
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
