
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">PDF Notes</CardTitle>
          <CardDescription>
            Access all your course notes here.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-center text-muted-foreground text-center py-16 border-2 border-dashed rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-10 w-10" />
              <p>No notes available yet.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
