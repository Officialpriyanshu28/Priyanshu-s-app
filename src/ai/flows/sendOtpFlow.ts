
'use server';
/**
 * @fileOverview A flow to generate and "send" an OTP for user verification.
 *
 * - sendOtp - A function that generates an OTP and logs it for development/testing.
 * - SendOtpInput - The input type for the sendOtp function.
 * - SendOtpOutput - The return type for the sendOtp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SendOtpInputSchema = z.object({
  email: z.string().email().describe('The email address of the user.'),
  phone: z.string().describe('The phone number of the user.'),
});
export type SendOtpInput = z.infer<typeof SendOtpInputSchema>;

const SendOtpOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    otp: z.string().optional(),
});
export type SendOtpOutput = z.infer<typeof SendOtpOutputSchema>;


export async function sendOtp(input: SendOtpInput): Promise<SendOtpOutput> {
  return sendOtpFlow(input);
}


const sendOtpFlow = ai.defineFlow(
  {
    name: 'sendOtpFlow',
    inputSchema: SendOtpInputSchema,
    outputSchema: SendOtpOutputSchema,
  },
  async (input) => {
    // In a real application, you would integrate with an SMS or email service here.
    // For this prototype, we'll generate a random 6-digit OTP and log it to the console.
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log('====================================');
    console.log('OTP VERIFICATION');
    console.log(`Sending OTP to: ${input.email} / ${input.phone}`);
    console.log(`OTP is: ${otp}`);
    console.log('====================================');
    
    // You can extend this to call a real service like Twilio or SendGrid.
    
    return {
      success: true,
      message: `An OTP has been sent to your registered mobile/email. (Check console for OTP: ${otp})`,
      otp: otp, // Returning OTP for easy testing on the client side if needed.
    };
  }
);
