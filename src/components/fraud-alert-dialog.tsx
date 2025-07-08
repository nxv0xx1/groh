'use client';

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
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'fraud_warning_acknowledged';

export function FraudAlertDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This check runs only on the client, after the component has mounted.
    // This prevents hydration errors.
    const hasAcknowledged = localStorage.getItem(STORAGE_KEY);
    if (!hasAcknowledged) {
      setIsOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
             <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
            <AlertDialogTitle>Important Security Notice</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Please be aware of potential fraudsters. To ensure your contribution reaches the children, please only use the official donation channels provided exclusively on this website.
          <br /><br />
          We do not solicit donations through any other means.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={handleAcknowledge}>I understand</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
