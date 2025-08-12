
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { banners, courses } from '@/lib/data';
import Image from 'next/image';
import type { Feature } from '@/components/features-grid';
import FeaturesGrid from '@/components/features-grid';
import CourseCard from '@/components/course-card';

const features: Feature[] = [
  { href: '/courses', label: 'All Courses', iconName: 'GraduationCap', new: false },
  { href: '/my-courses', label: 'My Courses', iconName: 'PlaySquare', new: false },
  { href: '/ai-assistant', label: 'AI Assistant', iconName: 'Bot', new: true },
  { href: '/notifications', label: 'Notifications', iconName: 'Bell', new: true },
  { href: '/notes', label: 'PDF Notes', iconName: 'FileText', new: false },
  { href: '/test', label: 'Test', iconName: 'ClipboardCheck', new: false },
  { href: '/timetable', label: 'Time Table', iconName: 'CalendarDays', new: false },
  { href: '/help', label: 'Help', iconName: 'HelpCircle', new: false },
];

export default function Home() {
    const purchasedCourses = courses.slice(0, 3);
    const latestCourses = courses.slice(3, 7);

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
                    priority={index === 0}
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

      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-12">
        {/* Continue Learning */}
        <section>
            <h2 className="text-2xl font-bold font-headline mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {purchasedCourses.map(course => (
                    <CourseCard key={course.id} course={course} isPurchased={true} withProgressBar={true}/>
                ))}
            </div>
        </section>

        {/* Features Grid */}
        <FeaturesGrid features={features} />

        {/* Latest Courses */}
        <section>
            <h2 className="text-2xl font-bold font-headline mb-4">Latest Courses</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {latestCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
