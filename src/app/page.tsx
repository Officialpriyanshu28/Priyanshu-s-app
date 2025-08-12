
import Link from 'next/link';
import {
  BookOpen,
  Bell,
  FileText,
  ClipboardCheck,
  Calendar,
  HelpCircle,
  Link2,
  GraduationCap,
  Bot,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { courses } from '@/lib/data';
import CourseCard from '@/components/course-card';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/courses', label: 'All Courses', icon: GraduationCap },
  { href: '/my-courses', label: 'My Courses', icon: BookOpen },
  { href: '/notifications', label: 'Notifications', icon: Bell, new: true },
  { href: '/notes', label: 'PDF Notes', icon: FileText },
  { href: '/test', label: 'Test', icon: ClipboardCheck },
  { href: '/timetable', label: 'Time Table', icon: Calendar },
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/social', label: 'Social Links', icon: Link2 },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
];

export default function Home() {
  const latestCourses = courses.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">
        Welcome to your Dashboard
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {menuItems.map(({ href, label, icon: Icon, new: isNew }) => (
          <Link href={href} key={href} className="flex flex-col items-center">
            <Card className="w-full aspect-square flex items-center justify-center p-4 transition-all hover:shadow-lg hover:bg-accent/20 relative">
               {isNew && (
                <Badge className="absolute top-1 right-1 bg-destructive text-destructive-foreground">
                  नया
                </Badge>
              )}
              <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                <div className="p-3 bg-primary/10 rounded-full">
                   <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <p className="mt-2 text-center text-sm font-medium text-foreground">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
                Latest Courses
            </h2>
             <Button variant="outline" asChild>
                <Link href="/courses">View All</Link>
             </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
