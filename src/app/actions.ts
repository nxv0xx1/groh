"use server";

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    _form?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to send message. Please check the errors below.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  // In a real application, you would send an email here.
  // For example, using a service like Resend, SendGrid, or Nodemailer.
  console.log("Contact Form Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("-------------------------");
  console.log("Simulating email sending...");
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success or failure
  // const SUCESS_RATE = 0.9; // 90% success rate
  // if (Math.random() < SUCESS_RATE) {
    return {
      message: "Thank you! Your message has been received. We will get back to you shortly.",
      success: true,
    };
  // } else {
  //   return {
  //     message: "Sorry, there was an issue sending your message. Please try again later.",
  //     success: false,
  //     errors: { _form: ["Server error during submission."] },
  //   };
  // }
}
