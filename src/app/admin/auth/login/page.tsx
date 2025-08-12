
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // For this prototype, we'll assume if the email is the admin one, they are an admin.
      // In a real app, you would check for a custom claim or a role in the database.
      if (userCredential.user.email === 'admin@example.com') {
         toast({ title: "Login Successful", description: "Redirecting to admin dashboard..." });
         router.push('/admin');
      } else {
         await auth.signOut();
         throw new Error("You are not authorized to access the admin panel.");
      }

    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = "An unknown error occurred.";

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else {
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    } finally {
        setIsLoading(false);
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
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
        </Card>
    </div>
  );
}
