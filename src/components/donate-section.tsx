"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Banknote, Check, Copy, CreditCard } from "lucide-react";
import Link from "next/link";

export function DonateSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const accountNumber = "1220981362";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: `Account number ${accountNumber} has been copied.`,
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="donate" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Make a Donation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your generous contribution helps us provide food, shelter, education, and hope to our children. Every donation makes a difference.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Banknote className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Bank Transfer</CardTitle>
              </div>
              <CardDescription>
                For direct donations within Nigeria.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bank Name:</span>
                <span className="font-semibold">Zenith Bank</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-semibold">God’s Righteousness Orphanage Home</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{accountNumber}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy} aria-label="Copy account number">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
               <div className="flex items-center gap-4">
                 <CreditCard className="w-8 h-8 text-primary" />
                 <CardTitle className="font-headline text-2xl">Online Donation</CardTitle>
              </div>
              <CardDescription>
                Use Paystack for secure online donations from anywhere.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground mb-6">Click the button below to donate securely online.</p>
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="#" target="_blank" rel="noopener noreferrer">Donate with Paystack</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
