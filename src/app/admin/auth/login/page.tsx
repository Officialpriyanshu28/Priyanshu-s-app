
'use client';

import { useState } from "react";
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

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Default credentials for easy testing.
    // For production, use environment variables for security.
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      toast({ title: "Login Successful", description: "Redirecting to admin dashboard..." });
      router.push('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Logo />
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-center">Admin Login</CardTitle>
                <CardDescription className="text-center">
                Enter your credentials to access the admin panel.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input 
                    id="email-login" 
                    type="email" 
                    placeholder="admin@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input 
                    id="password-login" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <Button onClick={handleLogin} className="w-full">
                 Login
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
