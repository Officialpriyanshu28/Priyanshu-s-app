import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import CourseCard from '@/components/course-card';
import { banners, courses } from '@/lib/data';
import Image from 'next/image';

export default function Home() {
  const featuredCourses = courses.slice(0, 4);

  return (
    <div>
      {/* Hero Section with Carousel */}
      <div className="w-full">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/7]">
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    className="object-cover"
                    data-ai-hint="online course banner"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Featured Courses */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Featured Courses
            </h2>
            <Button asChild variant="outline">
              <Link href="/courses">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* All Courses */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              All Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Categories Section (Example) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 text-center">
            Explore by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">Web Development</Button>
            <Button variant="secondary" size="lg">Web Design</Button>
            <Button variant="secondary" size="lg">Full-stack</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
