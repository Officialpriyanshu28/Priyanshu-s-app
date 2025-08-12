'use client';

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
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  const handleVerify = () => {
    // Mock verification logic
    router.push('/');
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
            We've sent an OTP to your email. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input id="otp" type="text" inputMode="numeric" maxLength={6} required />
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
