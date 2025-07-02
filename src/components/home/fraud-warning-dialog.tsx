"use client";

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

const FraudWarningDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // We use sessionStorage to only show the warning once per browser session.
    const hasSeenWarning = sessionStorage.getItem('fraudWarningShown');
    if (!hasSeenWarning) {
      setIsOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    sessionStorage.setItem('fraudWarningShown', 'true');
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-destructive text-destructive-foreground border-destructive-foreground/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
            <AlertTriangle className="h-8 w-8 shrink-0" />
            BEWARE OF FRAUDSTERS!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-destructive-foreground/90 pt-4 text-base space-y-4">
            <p>
              DO NOT DONATE FUNDS INTO ANY PERSONAL ACCOUNTS for our orphanage.
            </p>
            <p>
              Please use ONLY the official God's Righteousness Orphanage Home (GROH) donation channels listed on this website.
            </p>
             <p>
              We DO NOT solicit donations via audio or video calls. Please be cautious of impersonators.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction 
            onClick={handleAcknowledge}
            className="w-full bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
          >
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FraudWarningDialog;
