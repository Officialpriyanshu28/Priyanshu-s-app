
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
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { signUp, logIn, user } = useAuth();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await logIn(loginEmail, loginPassword);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push('/');
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      await signUp(signupEmail, signupPassword, signupName, signupPhone);
      toast({
        title: "Sign Up Successful",
        description: "Your account has been created. Welcome!",
      });
      router.push('/');
    } catch (error: any)
    {
      console.error("Sign up failed:", error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message || "Could not create account. Please try again.",
      });
    } finally {
      setSignupLoading(false);
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input 
                  id="email-login"
                  name="email"
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loginLoading}>
                 {loginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loginLoading ? 'Logging in...' : 'Login'}
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
                <Input 
                  id="name-signup" 
                  name="name" 
                  type="text" 
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-signup">Phone</Label>
                <Input 
                  id="phone-signup" 
                  name="phone" 
                  type="tel" 
                  required
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input 
                  id="email-signup" 
                  name="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input 
                  id="password-signup" 
                  name="password" 
                  type="password" 
                  required 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={signupLoading}>
                 {signupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {signupLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
