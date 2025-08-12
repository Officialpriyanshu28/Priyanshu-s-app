
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { courses } from '@/lib/data';
import type { Assignment } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AssignmentWithCourse extends Assignment {
  courseTitle: string;
  courseId: string;
}

export default function AssignmentsPage() {
  const [filter, setFilter] = useState('all');

  const allAssignments: AssignmentWithCourse[] = useMemo(() => {
    return courses.flatMap(course =>
      course.assignments
        ? course.assignments.map(assignment => ({
            ...assignment,
            courseTitle: course.title,
            courseId: course.id,
          }))
        : []
    );
  }, []);

  const filteredAssignments = useMemo(() => {
    let assignments = allAssignments;
    if (filter === 'pending') {
      assignments = assignments.filter(a => !a.submission);
    } else if (filter === 'submitted') {
      assignments = assignments.filter(a => !!a.submission);
    } else if (filter === 'graded') {
      assignments = assignments.filter(a => a.submission?.status === 'graded');
    }
    return assignments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [allAssignments, filter]);

  const getStatusBadge = (assignment: AssignmentWithCourse) => {
    if (assignment.submission?.status === 'graded') {
      return <Badge variant="default" className="bg-green-600">Graded</Badge>;
    }
    if (assignment.submission) {
      return <Badge variant="secondary">Submitted</Badge>;
    }
    if (new Date(assignment.dueDate) < new Date()) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    return <Badge variant="outline">Pending</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <FilePenLine className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            Assignments
          </h1>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter assignments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="graded">Graded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map(assignment => (
            <Card key={assignment.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-2">{assignment.title}</CardTitle>
                    {getStatusBadge(assignment)}
                </div>
                <CardDescription>{assignment.courseTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Due in {formatDistanceToNow(new Date(assignment.dueDate), { addSuffix: true })}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <span>Total Marks: {assignment.totalMarks}</span>
                    </div>
                    {assignment.submission?.status === 'graded' && (
                         <div className="flex items-center gap-2 font-semibold">
                            <CheckCircle className="h-4 w-4 text-green-600"/>
                            <span>Grade: {assignment.submission.grade}/{assignment.totalMarks}</span>
                        </div>
                    )}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/assignments/${assignment.id}`}>
                    {assignment.submission ? 'View Submission' : 'View Assignment'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <FilePenLine className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No Assignments Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            There are no assignments matching your filter.
          </p>
        </div>
      )}
    </div>
  );
}
