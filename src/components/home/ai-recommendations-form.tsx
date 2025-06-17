"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { recommendOpportunities, type RecommendOpportunitiesOutput } from '@/ai/flows/recommend-opportunities';
import { useToast } from '@/hooks/use-toast';
import LeafIcon from '@/components/icons/leaf-icon';
import { Loader2, Wand2, Users, Gift } from 'lucide-react';

const formSchema = z.object({
  interests: z.string().min(10, { message: "Please describe your interests in at least 10 characters." }).max(500, { message: "Please keep your interests under 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const AiRecommendationsForm = () => {
  const [recommendations, setRecommendations] = useState<RecommendOpportunitiesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendOpportunities({ interests: data.interests });
      setRecommendations(result);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
          <Wand2 className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Find Your Way to Help</CardTitle>
        <CardDescription className="text-md text-muted-foreground">
          Tell us your interests, and our AI will suggest personalized volunteering and donation opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="interests" className="text-lg font-semibold text-foreground">Your Interests & Passions</FormLabel>
                  <FormControl>
                    <Textarea
                      id="interests"
                      placeholder="e.g., 'I love teaching children, enjoy outdoor activities, and have experience in fundraising.'"
                      className="min-h-[120px] focus:ring-accent focus:border-accent"
                      {...field}
                      aria-describedby="interests-help"
                    />
                  </FormControl>
                  <p id="interests-help" className="text-sm text-muted-foreground">
                    The more details you provide, the better our suggestions will be!
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg rounded-lg flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                <>
                  <LeafIcon className="h-5 w-5" />
                  Discover Opportunities
                </>
              )}
            </Button>
          </form>
        </Form>

        {recommendations && (
          <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {recommendations.volunteeringOpportunities && recommendations.volunteeringOpportunities.length > 0 && (
              <div>
                <h3 className="font-headline text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
                  <Users className="h-7 w-7 text-primary" />
                  Volunteering Opportunities
                </h3>
                <ul className="space-y-3 list-inside">
                  {recommendations.volunteeringOpportunities.map((opp, index) => (
                    <li key={index} className="p-4 bg-background rounded-lg shadow border border-border flex items-start">
                      <LeafIcon className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                      <span className="text-foreground">{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recommendations.donationOptions && recommendations.donationOptions.length > 0 && (
              <div>
                <h3 className="font-headline text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
                  <Gift className="h-7 w-7 text-primary" />
                  Donation Options
                </h3>
                <ul className="space-y-3 list-inside">
                  {recommendations.donationOptions.map((opt, index) => (
                     <li key={index} className="p-4 bg-background rounded-lg shadow border border-border flex items-start">
                      <LeafIcon className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
                       <span className="text-foreground">{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiRecommendationsForm;
