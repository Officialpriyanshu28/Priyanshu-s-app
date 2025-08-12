
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
import { Laptop, Smartphone, LogOut } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const mockDevices = [
    { id: 'device-1', type: 'Laptop', name: 'Chrome on macOS', location: 'New York, USA', isCurrent: true },
    { id: 'device-2', type: 'Smartphone', name: 'Mobile App on iPhone 15', location: 'New York, USA', isCurrent: false },
]

export default function ProfilePage() {
  const { toast } = useToast();

  const handleUpdate = (e: React.FormEvent, section: string) => {
    e.preventDefault();
     toast({
      title: "Profile Updated",
      description: `Your ${section.toLowerCase()} has been updated.`,
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Profile</CardTitle>
          <CardDescription>
            Manage your personal information, password, and active devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <form onSubmit={(e) => handleUpdate(e, 'Personal Information')} className="space-y-4">
             <h3 className="text-lg font-semibold font-headline">Personal Information</h3>
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
            <Button type="submit">Update Profile</Button>
          </form>
          
          <form onSubmit={(e) => handleUpdate(e, 'Password')} className="space-y-4 border-t pt-6">
             <h3 className="text-lg font-semibold font-headline">Change Password</h3>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button type="submit">Change Password</Button>
          </form>

          <div className="space-y-4 border-t pt-6">
             <h3 className="text-lg font-semibold font-headline">Device Management</h3>
             <p className="text-sm text-muted-foreground">You are logged in on these devices. You can log out from any of them.</p>
             <div className="space-y-3">
                {mockDevices.map(device => (
                    <div key={device.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                           {device.type === 'Laptop' ? <Laptop className="h-5 w-5 text-muted-foreground" /> : <Smartphone className="h-5 w-5 text-muted-foreground" />}
                            <div>
                                <p className="font-medium text-sm">{device.name} {device.isCurrent && <Badge variant="secondary">This device</Badge>}</p>
                                <p className="text-xs text-muted-foreground">{device.location}</p>
                            </div>
                        </div>
                        {!device.isCurrent && <Button variant="ghost" size="sm"><LogOut className="mr-2 h-4 w-4" />Logout</Button>}
                    </div>
                ))}
             </div>
          </div>

           <div className="space-y-4 border-t pt-6 flex justify-end">
             <Button variant="destructive">Logout from All Devices</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
