
'use client';

import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

function VerifyComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [otpInput, setOtpInput] = useState('');
  const [correctOtp, setCorrectOtp] = useState('');

  useEffect(() => {
    // For testing purposes, we get the OTP from the query param
    const otpFromUrl = searchParams.get('otp');
    if (otpFromUrl) {
      setCorrectOtp(otpFromUrl);
    }
  }, [searchParams]);

  const handleVerify = () => {
    if (otpInput === correctOtp && correctOtp !== '') {
      toast({
        title: "Verification Successful",
        description: "Your account has been created. Redirecting to home page.",
      });
      router.push('/');
    } else {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Verify Your Account</CardTitle>
          <CardDescription>
            We've sent an OTP to your email/phone. Please enter it below.
            <br/>
            (For testing, check the server console for the OTP).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input 
              id="otp" 
              type="text" 
              inputMode="numeric" 
              maxLength={6} 
              required
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />
          </div>
          <Button onClick={handleVerify} className="w-full bg-accent hover:bg-accent/90">
            Verify & Proceed
          </Button>
           <div className="text-center">
             <Button variant="link" size="sm">
                Resend OTP
             </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyComponent />
        </Suspense>
    )
}
