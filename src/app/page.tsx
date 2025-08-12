import Link from 'next/link';
import {
  Bell,
  BookOpen,
  ClipboardCheck,
  FileText,
  HelpCircle,
  Link2,
  Calendar,
  Bot,
  User,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    title: 'My Courses',
    href: '/my-courses',
    icon: BookOpen,
    description: 'Access your purchased courses.',
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    description: 'View your latest notifications.',
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Manage your profile details.',
  },
  {
    title: 'Test',
    href: '/test',
    icon: ClipboardCheck,
    description: 'Take tests to check knowledge.',
  },
  {
    title: 'Time Table',
    href: '/timetable',
    icon: Calendar,
    description: 'Check your class schedule.',
  },
  {
    title: 'PDF Notes',
    href: '/notes',
    icon: FileText,
    description: 'Access all course notes here.',
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle,
    description: 'Get help and support.',
  },
  {
    title: 'AI Assistant',
    href: '/ai-assistant',
    icon: Bot,
    description: 'Get help from AI assistant.',
  },
  {
    title: 'Social Links',
    href: '/social',
    icon: Link2,
    description: 'Connect with us on social media.',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Dashboard</CardTitle>
          <CardDescription>Welcome back! Here's your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title}>
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors h-full text-center">
                  <feature.icon className="h-8 w-8 mb-2" />
                  <p className="font-semibold text-sm">{feature.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
