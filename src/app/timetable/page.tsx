
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function TimetablePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Time Table</CardTitle>
          <CardDescription>
            View your class schedule here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center text-muted-foreground text-center py-16 border-2 border-dashed rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="h-10 w-10" />
              <p>No schedule available yet.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
