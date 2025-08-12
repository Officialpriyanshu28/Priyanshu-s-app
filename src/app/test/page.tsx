
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
import { courses } from "@/lib/data";
import { ClipboardCheck, ArrowRight } from "lucide-react";

export default function TestPage() {
  const tests = courses
    .flatMap((course) =>
      course.chapters.map((chapter) => ({
        ...chapter,
        courseTitle: course.title,
      }))
    )
    .filter((chapter) => chapter.quiz && chapter.quiz.questions.length > 0);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex items-center gap-4 mb-8">
        <ClipboardCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Available Tests
        </h1>
      </div>

      {tests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{test.title}</CardTitle>
                <CardDescription>{test.courseTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {test.quiz?.questions.length} Questions
                </p>
                <p className="text-sm text-muted-foreground">
                  Time Limit: {test.quiz?.timeLimitMinutes} minutes
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/test/${test.id}`}>
                    Start Test <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-muted-foreground text-center py-16 border-2 border-dashed rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <ClipboardCheck className="h-10 w-10" />
            <p>No tests available yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
