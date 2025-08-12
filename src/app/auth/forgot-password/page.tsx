
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
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock logic
    toast({
      title: "Password Reset Link Sent",
      description: "Please check your email for instructions to reset your password.",
    });
    router.push('/auth/login');
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Forgot Password</CardTitle>
          <CardDescription>
            No worries! Enter your email and we'll send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-forgot">Email</Label>
              <Input id="email-forgot" type="email" placeholder="m@example.com" required />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Send Reset Link
            </Button>
            <div className="text-center">
             <Button variant="link" size="sm" asChild>
                <Link href="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Link>
             </Button>
           </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
