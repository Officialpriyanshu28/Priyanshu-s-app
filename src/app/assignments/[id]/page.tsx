
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { courses } from '@/lib/data';
import type { Assignment, Course } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import Link from 'next/link';
import { FilePenLine, Clock, CheckCircle, Upload, File, ArrowLeft } from 'lucide-react';

export default function AssignmentDetailPage() {
  const params = useParams();
  const assignmentId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { toast } = useToast();

  const [assignment, course] = (() => {
    for (const c of courses) {
      const a = c.assignments?.find(a => a.id === assignmentId);
      if (a) return [a as Assignment, c as Course];
    }
    return [null, null];
  })();

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (assignment) {
      setIsOverdue(new Date(assignment.dueDate) < new Date());
    }
  }, [assignment]);

  if (!assignment || !course) {
    notFound();
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a file to upload.',
      });
      return;
    }
    
    setIsSubmitting(true);
    // Mock submission logic
    setTimeout(() => {
      toast({
        title: 'Assignment Submitted!',
        description: 'Your assignment has been successfully submitted.',
      });
      setIsSubmitting(false);
       const mockSubmission = {
            id: 'sub-new',
            submittedAt: new Date().toISOString(),
            fileUrl: '#',
            fileName: file.name,
            status: 'submitted' as const
       }
       assignment.submission = mockSubmission;
       router.refresh(); 
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assignments
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{assignment.title}</CardTitle>
                    <CardDescription>
                        From course: <Link href={`/courses/${course.id}`} className="text-primary hover:underline">{course.title}</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{assignment.description}</p>
                </CardContent>
                 <CardFooter>
                    <div className="text-sm font-medium text-muted-foreground">
                        Total Marks: {assignment.totalMarks}
                    </div>
                </CardFooter>
            </Card>

            {assignment.submission?.status === 'graded' && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-6 w-6 text-green-600"/>
                            Grading & Feedback
                        </CardTitle>
                        <CardDescription>
                            Your assignment has been graded by the instructor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold">{assignment.submission.grade}</p>
                            <p className="text-xl text-muted-foreground">/ {assignment.totalMarks}</p>
                         </div>
                         <div>
                            <h4 className="font-semibold mb-2">Instructor Feedback:</h4>
                            <div className="p-4 bg-muted rounded-lg text-muted-foreground">
                                {assignment.submission.feedback || "No feedback provided."}
                            </div>
                         </div>
                    </CardContent>
                </Card>
            )}
        </div>

        <aside className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                    <div className="flex items-center gap-2">
                       <Clock className="h-4 w-4 text-muted-foreground" />
                       <span className="font-medium">Due Date</span>
                    </div>
                     <p className={isOverdue ? "text-destructive font-semibold" : ""}>
                        {format(new Date(assignment.dueDate), "PPP p")}
                    </p>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle className="text-lg">
                        {assignment.submission ? 'Your Submission' : 'Submit Your Work'}
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    {assignment.submission ? (
                        <div className="space-y-4">
                            <div>
                                <Label>Status</Label>
                                <Badge variant={assignment.submission.status === 'graded' ? 'default' : 'secondary'} className={assignment.submission.status === 'graded' ? 'bg-green-600' : ''}>
                                    {assignment.submission.status}
                                </Badge>
                            </div>
                             <div>
                                <Label>Submitted On</Label>
                                <p className="text-sm text-muted-foreground">{format(new Date(assignment.submission.submittedAt), "PPP p")}</p>
                            </div>
                            <div>
                                <Label>File</Label>
                                <div className="flex items-center gap-2 p-2 border rounded-md">
                                    <File className="h-5 w-5 text-primary"/>
                                    <span className="text-sm font-medium truncate">{assignment.submission.fileName}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="assignment-file">Upload File</Label>
                                <Input id="assignment-file" type="file" onChange={handleFileChange} />
                                {file && <p className="text-xs text-muted-foreground mt-2">Selected: {file.name}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting || isOverdue}>
                                {isSubmitting && <Upload className="mr-2 h-4 w-4 animate-pulse" />}
                                {isOverdue ? 'Submission Closed' : (isSubmitting ? 'Submitting...' : 'Submit Assignment')}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </aside>

      </div>
    </div>
  );
}
