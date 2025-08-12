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
import { Button } from './ui/button';

interface CourseCardProps {
  course: Course;
  isPurchased?: boolean;
}

export default function CourseCard({ course, isPurchased = false }: CourseCardProps) {
  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);

  return (
    <div className="group relative block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
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
        {!isPurchased && (
           <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-primary">{course.price}</p>
                    <p className="text-sm text-muted-foreground line-through">
                    {course.mrp}
                    </p>
                </div>
                {discount > 0 && (
                    <Badge variant="destructive">{discount}% off</Badge>
                )}
            </CardFooter>
        )}
      </Card>
        <Link 
            href={isPurchased ? `/watch/${course.id}` : `/courses/${course.id}`} 
            className="absolute inset-0 z-10"
        >
             <span className="sr-only">View Course</span>
        </Link>
       {isPurchased && (
         <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button size="lg" asChild>
                <Link href={`/watch/${course.id}`}>Start Learning</Link>
            </Button>
         </div>
       )}
    </div>
  );
}
