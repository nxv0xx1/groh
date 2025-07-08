'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { HandHelping, Heart, School } from "lucide-react";
import Link from "next/link";

export function SponsorDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl">Become a Sponsor</DialogTitle>
          <DialogDescription>
            Your sponsorship is a promise of a brighter future.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 text-sm">
          <p className="text-muted-foreground">
            By sponsoring a child at G.R.O.H., you provide more than just financial support—you provide hope, stability, and the chance for a child to reach their full potential.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <School className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Education</h4>
                <p className="text-muted-foreground">Your support covers school fees, uniforms, books, and all necessary supplies.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Healthcare & Nutrition</h4>
                <p className="text-muted-foreground">Ensure access to regular medical check-ups and nutritious meals every day.</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <HandHelping className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Personal Care</h4>
                <p className="text-muted-foreground">Contribute to clothing, personal items, and a caring, supportive environment.</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">
            You will receive regular updates on their progress, connecting you directly to the life you are changing.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button asChild>
              <Link href="#donate">Continue to Donate</Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
