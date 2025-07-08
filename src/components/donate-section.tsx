"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Banknote, Check, Copy, CreditCard } from "lucide-react";
import { usePaystackPayment } from "react-paystack";

export function DonateSection({ donationAmounts }: { donationAmounts: number[] }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const accountNumber = "1220981362";

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email,
    amount: (Number(amount) * 100),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onPaystackSuccess = (reference: any) => {
    toast({
      title: "Donation Successful!",
      description: `Thank you for your generosity. Transaction reference: ${reference.reference}`,
    });
    setEmail("");
    setAmount("");
    setSelectedAmount(null);
  };

  const onPaystackClose = () => {
    toast({
      variant: "destructive",
      title: "Payment window closed.",
      description: "The payment process was cancelled.",
    });
  };

  const handleDonateClick = () => {
    if (!email || !amount || Number(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid email and donation amount.",
      });
      return;
    }
    initializePayment({ onSuccess: onPaystackSuccess, onClose: onPaystackClose });
  };

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

  const handleQuickSelect = (quickAmount: number) => {
    setAmount(String(quickAmount));
    setSelectedAmount(quickAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    if (selectedAmount !== null && Number(newAmount) !== selectedAmount) {
      setSelectedAmount(null);
    }
  };

  return (
    <section id="donate">
      <div className="container mx-auto">
        <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-4 md:p-8 lg:p-12">
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
              <CardContent className="flex-grow flex flex-col space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="me@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (NGN)</Label>
                  <div className="flex flex-wrap gap-2 my-2">
                    {(donationAmounts || []).map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant={selectedAmount === quickAmount ? 'default' : 'outline'}
                        className="flex-1 min-w-[100px]"
                        onClick={() => handleQuickSelect(quickAmount)}
                      >
                        {quickAmount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="Or enter a custom amount" 
                    value={amount} 
                    onChange={handleAmountChange}
                    required
                  />
                </div>
                <Button onClick={handleDonateClick} size="lg" className="w-full mt-auto">
                  Donate with Paystack
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
