
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { getCourses } from "@/services/courseService";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
     <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
             <div>
                <CardTitle>Courses</CardTitle>
                <CardDescription>
                    Manage your courses.
                </CardDescription>
             </div>
             <Button asChild>
                <Link href="/admin/courses/new">Add New Course</Link>
             </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Image src={course.thumbnail} alt={course.title} width={80} height={45} className="rounded-md object-cover aspect-video" data-ai-hint="course thumbnail" />
                     <Link href={`/admin/courses/${course.id}`} className="hover:underline flex items-center gap-2">
                        <span className="font-semibold">{course.title}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                     </Link>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                   <TableCell>₹{course.price}</TableCell>
                  <TableCell>
                    <Badge variant="default">Published</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/edit/${course.id}`}>Edit Course Info</Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}`}>Manage Content</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Unpublish</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
