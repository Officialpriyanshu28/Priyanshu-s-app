
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = (e: React.MouseEvent<HTMLButtonElement>, section: string) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: `${section} settings have been successfully updated.`,
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage general site settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
         <form>
            <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="Priyanshu's app" />
            </div>
            <div className="space-y-2 mt-4">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                id="site-description"
                defaultValue="A Next.js app built in Firebase Studio."
                />
            </div>
            <Button className="mt-4" onClick={(e) => handleSaveChanges(e, 'General')}>Save Changes</Button>
         </form>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form>
            <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="light">
                    <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button className="mt-4" onClick={(e) => handleSaveChanges(e, 'Appearance')}>Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
