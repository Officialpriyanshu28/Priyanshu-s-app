import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
              data-ai-hint="online course thumbnail"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2 line-clamp-2 text-lg font-bold font-headline">
            {course.title}
          </CardTitle>
          <Badge variant="outline">{course.category}</Badge>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">${course.price}</p>
            <p className="text-sm text-muted-foreground line-through">
              ${course.mrp}
            </p>
          </div>
          {discount > 0 && (
            <Badge variant="destructive">{discount}% off</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
