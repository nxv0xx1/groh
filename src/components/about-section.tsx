import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto">
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
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">&#8226;</span>
                    <p><strong className="font-semibold">Safe Shelter:</strong> Providing a secure and loving environment for every child.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">&#8226;</span>
                    <p><strong className="font-semibold">Quality Education:</strong> Ensuring access to education to unlock their full potential.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">&#8226;</span>
                    <p><strong className="font-semibold">Faith Foundation:</strong> Nurturing a strong spiritual and moral compass.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">&#8226;</span>
                    <p><strong className="font-semibold">Love & Compassion:</strong> Raising children in a caring, family-like atmosphere.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
