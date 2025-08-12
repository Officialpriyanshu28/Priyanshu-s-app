
'use client';

import { useState } from "react";
import Link from 'next/link';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/logo";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { sendOtp } from "@/ai/flows/sendOtpFlow";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStudentLogin = (e: React.FormEvent) => {
      e.preventDefault();
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    try {
      // Call the AI flow to "send" the OTP
      const result = await sendOtp({ email, phone });

      if (result.success) {
        toast({
          title: "OTP Sent",
          description: "An OTP has been sent to you. Please check the console.",
        });
        // In a real app, you might not pass the OTP in the query string for security
        // But for this prototype, it simplifies testing.
        router.push(`/auth/verify?otp=${result.otp}`);
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message || "Could not send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Student Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input 
                  id="email-login"
                  name="email"
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="password-login">Password</Label>
                   <Link href="/auth/forgot-password" passHref>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                        Forgot Password?
                      </Button>
                   </Link>
                </div>
                <Input 
                  id="password-login"
                  name="password"
                  type="password" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Sign Up</CardTitle>
            <CardDescription>
              Create a new account to start learning.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-signup">Name</Label>
                <Input id="name-signup" name="name" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-signup">Phone</Label>
                <Input id="phone-signup" name="phone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Sending OTP...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
