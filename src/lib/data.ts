
import type { Course, Banner, LiveClass, User, RecentOrder } from './types';

export const banners: Banner[] = [
  { image: 'https://placehold.co/1600x700.png', alt: 'SkillzUp Banner 1' },
  { image: 'https://placehold.co/1600x700.png', alt: 'SkillzUp Banner 2' },
  { image: 'https://placehold.co/1600x700.png', alt: 'SkillzUp Banner 3' },
];

const placeholderVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const placeholderPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const liveClasses: LiveClass[] = [
    {
        id: 'lc-1',
        courseTitle: 'Next.js 14 Mastery',
        title: 'Live Q&A: Next.js App Router',
        instructor: 'John Doe',
        dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        status: 'upcoming'
    },
    {
        id: 'lc-2',
        courseTitle: 'Next.js 14 Mastery',
        title: 'Deep Dive into Server Components',
        instructor: 'John Doe',
        dateTime: new Date().toISOString(),
        status: 'live'
    },
    {
        id: 'lc-3',
        courseTitle: 'Next.js 14 Mastery',
        title: 'Introduction to Next.js (Recording)',
        instructor: 'John Doe',
        dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: 'ended',
        recordingUrl: placeholderVideoUrl,
        notesUrl: placeholderPdfUrl,
    }
];

// This data is now for mock purposes only, like for the recent orders widget.
// The primary source of truth for courses is now Firebase.
export const users: User[] = [
  {
    id: 'user-1',
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    joined: "2023-01-15",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026024d",
  },
  {
    id: 'user-2',
    name: "Olivia Smith",
    email: "olivia@example.com",
    role: "Student",
    status: "Active",
    joined: "2023-02-20",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704d",
  },
   {
    id: 'user-3',
    name: "Bob Johnson",
    email: "bob.j@example.com",
    role: "Student",
    status: "Inactive",
    joined: "2023-03-10",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026705d",
  },
   {
    id: 'user-4',
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Instructor",
    status: "Active",
    joined: "2023-03-12",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026706d",
  },
];

export const recentOrders: RecentOrder[] = [
    {
        id: 'order-1',
        userId: 'user-1',
        courseId: 'nextjs-mastery',
        amount: 4999,
        date: '2023-10-23',
        status: 'Paid'
    },
    {
        id: 'order-2',
        userId: 'user-2',
        courseId: 'tailwind-css-pro',
        amount: 2999,
        date: '2023-10-22',
        status: 'Paid'
    },
     {
        id: 'order-3',
        userId: 'user-2',
        courseId: 'react-deep-dive',
        amount: 5999,
        date: '2023-10-21',
        status: 'Paid'
    }
]
