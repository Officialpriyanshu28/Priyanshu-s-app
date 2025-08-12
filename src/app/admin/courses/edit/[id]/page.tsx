
'use client';
import { useParams } from 'next/navigation';
import { courses } from '@/lib/data';
import CourseForm from '../../course-form';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
        <div>
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-96 w-full" />
        </div>
    );
  }

  return <CourseForm course={course} />;
}
