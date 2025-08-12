
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Notifications</CardTitle>
          <CardDescription>
            Here are your latest notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Bell className="h-6 w-6 text-primary" />
            <div>
                <p className="font-semibold">New Course Added!</p>
                <p className="text-sm text-muted-foreground">"React Deep Dive" is now available. Check it out!</p>
            </div>
          </div>
           <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Bell className="h-6 w-6 text-primary" />
            <div>
                <p className="font-semibold">Your progress has been saved.</p>
                <p className="text-sm text-muted-foreground">You completed "Chapter 1" of "Next.js 14 Mastery".</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
