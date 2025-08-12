
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { liveClasses } from "@/lib/data";
import { Radio, ArrowRight, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function LiveClassPage() {
  
  const getStatusBadge = (status: 'upcoming' | 'live' | 'ended') => {
    switch (status) {
      case 'live':
        return <Badge variant="destructive" className="animate-pulse">Live</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">Upcoming</Badge>;
      case 'ended':
        return <Badge>Ended</Badge>;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex items-center gap-4 mb-8">
        <Radio className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Live Classes
        </h1>
      </div>

      {liveClasses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveClasses.map((liveClass) => (
            <Card key={liveClass.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{liveClass.title}</CardTitle>
                  {getStatusBadge(liveClass.status)}
                </div>
                <CardDescription>{liveClass.courseTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  By: {liveClass.instructor}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {format(new Date(liveClass.dateTime), "PPP p")}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full" disabled={liveClass.status === 'ended'}>
                  <Link href={`/live-class/${liveClass.id}`}>
                    {liveClass.status === 'live' ? 'Join Now' : 'Go to Class'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-muted-foreground text-center py-16 border-2 border-dashed rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Video className="h-10 w-10" />
            <p>No live classes scheduled yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
