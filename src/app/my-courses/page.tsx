import Link from "next/link";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const CourseCard = dynamic(() => import('@/components/course-card'), { 
  loading: () => <Skeleton className="h-full w-full" />,
  ssr: false 
});


export default function MyCoursesPage() {
  // Mock: Show first 3 courses as "purchased"
  const purchasedCourses = courses.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">
        My Courses
      </h1>

      {purchasedCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {purchasedCourses.map((course) => (
            <CourseCard key={course.id} course={course} isPurchased={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">No Courses Yet</h2>
          <p className="text-muted-foreground mb-4">
            You haven't purchased any courses.
          </p>
          <Button asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
