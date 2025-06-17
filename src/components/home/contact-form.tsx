"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Can be used for client-side validation before server action
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg rounded-lg flex items-center gap-2">
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="h-5 w-5" />
          Send Message
        </>
      )}
    </Button>
  );
}

const ContactForm = () => {
  const { toast } = useToast();
  const [state, formAction] = useFormState<ContactFormState | undefined, FormData>(submitContactForm, undefined);
  
  // Using react-hook-form for client-side validation feedback, though server action handles final validation
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });


  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? "Success!" : "Oops!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset(); // Reset form on successful submission
      }
    }
  }, [state, toast, form]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-md font-semibold text-foreground">Full Name</Label>
        <Input 
          id="name" 
          name="name" 
          placeholder="Your Name" 
          className="mt-1 focus:ring-primary focus:border-primary" 
          aria-invalid={!!state?.errors?.name || !!form.formState.errors.name}
          aria-describedby="name-error"
          {...form.register("name")}
        />
        {(state?.errors?.name || form.formState.errors.name) && (
          <p id="name-error" className="mt-1 text-sm text-destructive">
            {state?.errors?.name?.[0] || form.formState.errors.name?.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-md font-semibold text-foreground">Email Address</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="your.email@example.com" 
          className="mt-1 focus:ring-primary focus:border-primary" 
          aria-invalid={!!state?.errors?.email || !!form.formState.errors.email}
          aria-describedby="email-error"
          {...form.register("email")}
        />
        {(state?.errors?.email || form.formState.errors.email) && (
          <p id="email-error" className="mt-1 text-sm text-destructive">
            {state?.errors?.email?.[0] || form.formState.errors.email?.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="subject" className="text-md font-semibold text-foreground">Subject</Label>
        <Input 
          id="subject" 
          name="subject" 
          placeholder="Inquiry about volunteering" 
          className="mt-1 focus:ring-primary focus:border-primary" 
          aria-invalid={!!state?.errors?.subject || !!form.formState.errors.subject}
          aria-describedby="subject-error"
          {...form.register("subject")}
        />
        {(state?.errors?.subject || form.formState.errors.subject) && (
          <p id="subject-error" className="mt-1 text-sm text-destructive">
            {state?.errors?.subject?.[0] || form.formState.errors.subject?.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-md font-semibold text-foreground">Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          rows={5} 
          placeholder="Your message here..." 
          className="mt-1 min-h-[120px] focus:ring-primary focus:border-primary" 
          aria-invalid={!!state?.errors?.message || !!form.formState.errors.message}
          aria-describedby="message-error"
          {...form.register("message")}
        />
        {(state?.errors?.message || form.formState.errors.message) && (
          <p id="message-error" className="mt-1 text-sm text-destructive">
            {state?.errors?.message?.[0] || form.formState.errors.message?.message}
          </p>
        )}
      </div>
      
      {state?.errors?._form && (
        <p className="text-sm text-destructive text-center">{state.errors._form[0]}</p>
      )}

      <SubmitButton />
    </form>
  );
};

export default ContactForm;
