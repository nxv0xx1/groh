import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeartHandshake } from "lucide-react";

const values = [
    { title: "Safe Shelter", description: "Providing a secure and loving environment for every child." },
    { title: "Quality Education", description: "Ensuring access to education to unlock their full potential." },
    { title: "Faith Foundation", description: "Nurturing a strong spiritual and moral compass." },
    { title: "Love & Compassion", description: "Raising children in a caring, family-like atmosphere." },
];

export function AboutSection() {
  return (
    <section id="about">
      <div className="container mx-auto">
        <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-12 lg:col-span-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
                About G.R.O.H.
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Established in July 2021, GROH is a family-run orphanage dedicated to creating a brighter future for children in need.
              </p>
              <p className="mb-4">
                At God’s Righteousness Orphanage Home, we are committed to providing every child with safe shelter, access to quality education, and a strong foundation in Christian faith. We nurture each child with love, integrity, and compassion, helping them grow into responsible, godly individuals.
              </p>
              <p>
                Our home is a place of belonging, healing, and hope. We believe in raising children who will serve others and reflect God’s righteousness in the world.
              </p>
            </div>
            <div className="md:col-span-12 lg:col-span-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <HeartHandshake className="w-10 h-10 text-primary" />
                    <CardTitle className="font-headline text-3xl">Our Values</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {values.map((value, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-semibold text-left hover:no-underline">{value.title}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {value.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
