
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
import { Laptop, Smartphone, LogOut, Award, Trophy, Crown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const mockDevices = [
    { id: 'device-1', type: 'Laptop', name: 'Chrome on macOS', location: 'New York, USA', isCurrent: true },
    { id: 'device-2', type: 'Smartphone', name: 'Mobile App on iPhone 15', location: 'New York, USA', isCurrent: false },
]

const mockAchievements = [
    { id: 'achieve-1', name: 'Course Conqueror', description: 'Finish your first course', icon: <Award className="h-8 w-8 text-yellow-500" /> },
    { id: 'achieve-2', name: 'Quiz Master', description: 'Score 100% on a quiz', icon: <Trophy className="h-8 w-8 text-blue-500" /> },
    { id: 'achieve-3', name: 'Perfect Week', description: 'Log in for 7 days in a row', icon: <Award className="h-8 w-8 text-green-500" /> },
];

const mockLeaderboard = [
    { rank: 1, name: 'Alice', points: 1250, avatar: 'https://i.pravatar.cc/40?u=alice' },
    { rank: 2, name: 'John Doe', points: 1100, avatar: 'https://i.pravatar.cc/40?u=john' },
    { rank: 3, name: 'Bob', points: 980, avatar: 'https://i.pravatar.cc/40?u=bob' },
    { rank: 4, name: 'Charlie', points: 950, avatar: 'https://i.pravatar.cc/40?u=charlie' },
    { rank: 5, name: 'David', points: 800, avatar: 'https://i.pravatar.cc/40?u=david' },
];

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdate = (e: React.FormEvent, section: string) => {
    e.preventDefault();
     toast({
      title: "Profile Updated",
      description: `Your ${section.toLowerCase()} has been updated.`,
    });
  }

  const handleLogout = () => {
    // In a real app, this would clear tokens/session
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
    });
    router.push('/auth/login');
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
             <h3 className="text-lg font-semibold font-headline">Achievements</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockAchievements.map(achieve => (
                    <div key={achieve.id} className="flex flex-col items-center text-center p-4 border rounded-lg bg-muted/50">
                        {achieve.icon}
                        <p className="font-bold mt-2 text-sm">{achieve.name}</p>
                        <p className="text-xs text-muted-foreground">{achieve.description}</p>
                    </div>
                ))}
             </div>
          </div>
          
           <div className="space-y-4 border-t pt-6">
             <h3 className="text-lg font-semibold font-headline flex items-center gap-2"><Trophy className="text-yellow-500" />Top Learners</h3>
             <div className="space-y-3">
                {mockLeaderboard.map(learner => (
                    <div key={learner.rank} className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center gap-3">
                           <span className="font-bold text-lg w-6 text-center">
                             {learner.rank === 1 ? <Crown className="h-5 w-5 text-yellow-500"/> : learner.rank}
                           </span>
                           <Avatar className="h-9 w-9">
                              <AvatarImage src={learner.avatar} alt={learner.name} />
                              <AvatarFallback>{learner.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                           <p className="font-medium">{learner.name}</p>
                        </div>
                        <p className="font-bold">{learner.points} pts</p>
                    </div>
                ))}
             </div>
          </div>

          <div className="space-y-4 border-t pt-6">
             <h3 className="text-lg font-semibold font-headline">Device Management</h3>
             <p className="text-sm text-muted-foreground">You are logged in on these devices. You can log out from any of them.</p>
             <div className="space-y-3">
                {mockDevices.map(device => (
                    <div key={device.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                           {device.type === 'Laptop' ? <Laptop className="h-5 w-5 text-muted-foreground" /> : <Smartphone className="h-5 w-5 text-muted-foreground" />}
                            <div>
                                <div className="font-medium text-sm">{device.name} {device.isCurrent && <Badge variant="secondary">This device</Badge>}</div>
                                <p className="text-xs text-muted-foreground">{device.location}</p>
                            </div>
                        </div>
                        {!device.isCurrent && <Button variant="ghost" size="sm"><LogOut className="mr-2 h-4 w-4" />Logout</Button>}
                    </div>
                ))}
             </div>
          </div>

           <div className="space-y-4 border-t pt-6 flex justify-end">
             <Button variant="destructive" onClick={handleLogout}>Logout from All Devices</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
