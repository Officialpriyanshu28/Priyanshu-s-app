
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ClipboardCheck, Download, LineChart } from "lucide-react";
import { courses } from "@/lib/data";

// Mock data for analytics
const analyticsData = courses.map(course => ({
  id: course.id,
  title: course.title,
  students: Math.floor(Math.random() * 200) + 50, // 50 to 250 students
  completionRate: Math.floor(Math.random() * 70) + 30, // 30% to 100%
  averageScore: Math.floor(Math.random() * 25) + 75, // 75% to 100%
}));

const totalEnrollments = analyticsData.reduce((acc, course) => acc + course.students, 0);
const averageCompletion = Math.round(analyticsData.reduce((acc, course) => acc + course.completionRate, 0) / analyticsData.length);
const totalQuizzes = courses.filter(c => c.chapters.some(ch => ch.quiz)).length;


export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <LineChart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Analytics & Reports</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrollments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion Rate
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletion}%</div>
             <p className="text-xs text-muted-foreground">
              Average across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">
              Available in all courses
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <div>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>
                        Detailed analytics for each course.
                    </CardDescription>
                 </div>
                 <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export to CSV
                 </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Average Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.title}</TableCell>
                  <TableCell>{data.students.toLocaleString()}</TableCell>
                  <TableCell>{data.completionRate}%</TableCell>
                  <TableCell>{data.averageScore}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
