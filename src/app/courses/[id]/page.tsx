'use client';
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { courses } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Radio, Download, Video, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";

function CourseDetailClient({ courseId }: { courseId: string }) {
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);

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
    <div>
      <div className="w-full aspect-video relative">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          data-ai-hint="online course video"
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Badge variant="outline">{course.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
              {course.title}
            </h1>
            <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 text-muted-foreground fill-muted-foreground"/>
                </div>
                <span className="text-muted-foreground">(1,234 reviews)</span>
            </div>
            <p className="text-lg text-muted-foreground">{course.description}</p>
            
            {course.liveClasses && course.liveClasses.length > 0 && (
                 <div className="space-y-4 pt-4">
                    <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                        <Radio className="h-6 w-6 text-primary"/>
                        Live Classes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {course.liveClasses.map(liveClass => (
                            <Card key={liveClass.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                      <CardTitle className="text-lg">{liveClass.title}</CardTitle>
                                      {getStatusBadge(liveClass.status)}
                                    </div>
                                    <CardDescription>By: {liveClass.instructor}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                      Date: {format(new Date(liveClass.dateTime), "PPP p")}
                                    </p>
                                </CardContent>
                                <CardFooter className="mt-auto flex flex-col items-stretch gap-2">
                                    {liveClass.status === 'ended' ? (
                                        <>
                                            <Button asChild>
                                                <Link href={liveClass.recordingUrl || '#'}>
                                                    <Video className="mr-2 h-4 w-4"/>
                                                    Watch Recording
                                                </Link>
                                            </Button>
                                            <Button asChild variant="outline">
                                                <Link href={liveClass.notesUrl || '#'} download>
                                                   <Download className="mr-2 h-4 w-4"/>
                                                   Download PDF
                                                </Link>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button asChild>
                                            <Link href={`/live-class/${liveClass.id}`}>
                                                {liveClass.status === 'live' ? 'Join Now' : 'Go to Class'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                 </div>
            )}

          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card p-4 border-t md:hidden">
         <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{course.price}</p>
                <p className="text-md text-muted-foreground line-through">{course.mrp}</p>
            </div>
            <Button className="bg-accent hover:bg-accent/90">Buy Now</Button>
         </div>
      </div>

      {/* Desktop sidebar-like purchase card */}
      <div className="hidden md:block fixed top-24 right-6 w-80">
          <div className="bg-card border rounded-lg shadow-sm p-6 space-y-4">
               <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{course.price}</p>
                <p className="text-lg text-muted-foreground line-through">{course.mrp}</p>
                <Badge variant="destructive">{discount}% off</Badge>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-lg">Buy Now</Button>
            <p className="text-xs text-center text-muted-foreground">30-Day Money-Back Guarantee</p>
          </div>
      </div>

    </div>
  );
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!courseId) {
    // You can render a loading state or return null
    return null;
  }

  return <CourseDetailClient courseId={courseId} />;
}
