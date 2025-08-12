
'use client';
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { courses, liveClasses } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";


function CourseAdminDetailPageClient({ courseId }: { courseId: string }) {
  const course = courses.find((c) => c.id === courseId);
  const courseLiveClasses = liveClasses.filter(lc => lc.courseTitle === course?.title);

  if (!course) {
     return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-[60vh] w-full" />
        </div>
    );
  }

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
    <div className="space-y-6">
       <Button variant="outline" size="sm" asChild>
            <Link href="/admin/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Courses
            </Link>
        </Button>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className="relative w-[150px] h-[84px] flex-shrink-0">
                    <Image src={course.thumbnail} alt={course.title} fill className="rounded-md object-cover" data-ai-hint="course thumbnail" />
                </div>
                <div>
                    <Badge variant="outline">{course.category}</Badge>
                    <CardTitle className="mt-1 text-2xl">{course.title}</CardTitle>
                    <CardDescription>by {course.instructor}</CardDescription>
                </div>
            </div>
             <Button asChild>
                <Link href={`/admin/courses/edit/${course.id}`}>Edit Course Info</Link>
             </Button>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="chapters">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chapters">Chapters & Videos</TabsTrigger>
            <TabsTrigger value="live-classes">Live Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Manage Chapters</CardTitle>
                            <CardDescription>Add, edit, or delete chapters and videos for this course.</CardDescription>
                        </div>
                         <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Chapter</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                   {course.chapters.map(chapter => (
                    <Card key={chapter.id}>
                        <CardHeader className="bg-muted/50 p-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-lg">{chapter.title}</h4>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="flex justify-end mb-4">
                                <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4" />Add Video</Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Video Title</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {chapter.videos.map(video => (
                                        <TableRow key={video.id}>
                                            <TableCell className="font-medium">{video.title}</TableCell>
                                            <TableCell>{video.duration}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                   ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="live-classes">
             <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Manage Live Classes</CardTitle>
                            <CardDescription>Schedule new classes or manage existing ones.</CardDescription>
                        </div>
                        <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Schedule Live Class</Button>
                    </div>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courseLiveClasses.map(lc => (
                                <TableRow key={lc.id}>
                                    <TableCell className="font-medium">{lc.title}</TableCell>
                                    <TableCell>{new Date(lc.dateTime).toLocaleString()}</TableCell>
                                    <TableCell>{getStatusBadge(lc.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default function CourseAdminDetailPage() {
  const params = useParams();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!courseId) {
    notFound();
  }

  return <CourseAdminDetailPageClient courseId={courseId} />;
}
