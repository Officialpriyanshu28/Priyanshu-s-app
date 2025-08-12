import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/course-card';
import { courses } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredCourses = courses.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary/5 text-center py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            Upskill with Priyanshu's app
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore a wide range of courses in technology and design. Start your learning journey today and achieve your goals.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/courses">
              Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-center mb-10">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
               <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
