

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { banners, courses } from '@/lib/data';
import Image from 'next/image';
import {
    Book,
    PlaySquare,
    Bell,
    FileText,
    ClipboardCheck,
    CalendarDays,
    HelpCircle,
    Link2,
    Bot,
    GraduationCap,
    Radio,
    Download,
    FilePenLine
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const features = [
  { href: '/courses', label: 'All Courses', icon: GraduationCap, new: false },
  { href: '/my-courses', label: 'My Courses', icon: PlaySquare, new: false },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot, new: true },
  { href: '/notifications', label: 'Notifications', icon: Bell, new: true },
  { href: '/assignments', label: 'Assignments', icon: FilePenLine, new: true },
  { href: '/notes', label: 'PDF Notes', icon: FileText, new: false },
  { href: '/test', label: 'Test', icon: ClipboardCheck, new: false },
  { href: '/timetable', label: 'Time Table', icon: CalendarDays, new: false },
  { href: '/live-class', label: 'Live Class', icon: Radio, new: true },
  { href: '/help', label: 'Help', icon: HelpCircle, new: false },
  { href: '/social', label: 'Social Links', icon: Link2, new: false },
  { href: '/#', label: 'Download', icon: Download, new: false },
];


export default function Home() {
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
        {/* Features Grid */}
        <section>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {features.map(({ href, label, icon: Icon, new: isNew }) => (
              <Link href={href} key={label} className="block">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center aspect-square">
                    {isNew && (
                      <Badge className="absolute top-1 right-1 bg-yellow-400 text-black hover:bg-yellow-400/80">
                        New
                      </Badge>
                    )}
                    <Icon className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
