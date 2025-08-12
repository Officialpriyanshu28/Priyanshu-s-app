
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
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('p_sk_123abc456def789ghi012jkl');

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied!",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleRegenerate = () => {
    // Mock API key generation
    const newKey = `p_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated!",
      description: "A new API key has been successfully generated.",
    });
  };


  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Profile</CardTitle>
          <CardDescription>
            Manage your personal information, password, and API keys.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+1234567890" />
            </div>
            <Button>Update Profile</Button>
          </div>
          
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold font-headline">API Key</h3>
            <div className="flex items-center gap-2">
                <Input id="api-key" readOnly value={apiKey} className="font-mono"/>
                <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy API Key">
                    <Copy />
                </Button>
                <Button variant="outline" size="icon" onClick={handleRegenerate} aria-label="Regenerate API Key">
                    <RefreshCw />
                </Button>
            </div>
          </div>

          <div className="space-y-4 border-t pt-6">
             <h3 className="text-lg font-semibold font-headline">Change Password</h3>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button>Change Password</Button>
          </div>
           <div className="space-y-4 border-t pt-6 flex justify-end">
             <Button variant="destructive">Logout</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
