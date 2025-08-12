import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { courses, banners } from "@/lib/data";
import CourseCard from "@/components/course-card";

export default function Home() {
  const latestCourses = courses.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <section className="w-full">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden rounded-none md:rounded-lg shadow-none border-none">
                  <CardContent className="flex aspect-[16/7] items-center justify-center p-0">
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      width={1280}
                      height={560}
                      className="h-full w-full object-cover"
                      data-ai-hint="online course banner"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
          </div>
        </Carousel>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">
          Latest Courses
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
          {latestCourses.map((course) => (
            <div key={course.id} className="min-w-[280px] md:min-w-[320px]">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold font-headline">
            All Courses
          </h2>
          <Button asChild variant="link">
            <Link href="/courses">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
