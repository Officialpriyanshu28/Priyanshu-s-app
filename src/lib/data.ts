
import type { Course, Banner } from './types';

export const banners: Banner[] = [
  { image: 'https://placehold.co/1600x700.png', alt: 'SkillzUp Banner 1' },
  { image: 'https://placehold.co/1600x700.png', alt: 'SkillzUp Banner 2' },
  { image: 'https://placehold.co/1600x700.png', alt: 'SkillzUp Banner 3' },
];

const placeholderVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const courses: Course[] = [
  {
    id: 'nextjs-mastery',
    title: 'Next.js 14 Mastery',
    description: 'Master the latest version of Next.js with hands-on projects and real-world examples. From basics to advanced concepts like Server Actions and the App Router.',
    price: 4999,
    mrp: 9999,
    thumbnail: 'https://placehold.co/600x400.png',
    category: 'Web Development',
    chapters: [
      {
        id: 'chap1',
        title: 'Introduction to Next.js',
        videos: [
          { id: 'vid1_1', title: 'Course Overview', duration: '5:30', url: placeholderVideoUrl },
          { id: 'vid1_2', title: 'Setting up your environment', duration: '12:15', url: placeholderVideoUrl },
        ],
        notes: [
          { id: 'note1_1', title: 'Chapter 1 Notes', url: '/notes/sample-notes.pdf' },
          { id: 'note1_2', title: 'Setup Guide', url: '/notes/sample-notes.pdf' },
        ],
        quiz: {
            id: 'quiz1',
            title: 'Next.js Basics Quiz',
            timeLimitMinutes: 1,
            questions: [
                {
                    id: 'q1',
                    text: 'What is the main benefit of using Next.js?',
                    options: [
                        { id: 'opt1_1', text: 'Server-Side Rendering' },
                        { id: 'opt1_2', text: 'Styling with CSS-in-JS' },
                        { id: 'opt1_3', text: 'Database integration' },
                    ],
                    correctOptionId: 'opt1_1',
                    explanation: 'Next.js provides server-side rendering out of the box, which improves performance and SEO.'
                },
                {
                    id: 'q2',
                    text: 'What is the file name for a page route in the App Router?',
                    options: [
                        { id: 'opt2_1', text: 'index.js' },
                        { id: 'opt2_2', text: 'page.tsx' },
                        { id: 'opt2_3', text: 'route.js' },
                    ],
                    correctOptionId: 'opt2_2',
                    explanation: 'In the Next.js App Router, `page.tsx` (or .js) is the special file used to create a UI for a route segment.'
                }
            ]
        }
      },
      {
        id: 'chap2',
        title: 'App Router Essentials',
        videos: [
          { id: 'vid2_1', title: 'File-based Routing', duration: '15:00', url: placeholderVideoUrl },
          { id: 'vid2_2', title: 'Layouts and Pages', duration: '18:45', url: placeholderVideoUrl },
        ],
        notes: [
           { id: 'note2_1', title: 'Routing Cheatsheet', url: '/notes/sample-notes.pdf' },
        ],
        quiz: {
            id: 'quiz2',
            title: 'App Router Quiz',
            timeLimitMinutes: 2,
            questions: [
                 {
                    id: 'q3',
                    text: 'What file is used to create a shared layout for a route segment?',
                    options: [
                        { id: 'opt3_1', text: 'layout.tsx' },
                        { id: 'opt3_2', text: 'template.tsx' },
                        { id: 'opt3_3', text: 'page.tsx' },
                    ],
                    correctOptionId: 'opt3_1',
                    explanation: '`layout.tsx` is the special file that allows you to create a UI that is shared between multiple pages.'
                }
            ]
        }
      },
    ],
  },
  {
    id: 'tailwind-css-pro',
    title: 'Tailwind CSS for Pros',
    description: 'Go from beginner to pro with Tailwind CSS. Learn utility-first concepts, responsive design, and how to build beautiful, custom UIs without writing custom CSS.',
    price: 2999,
    mrp: 5999,
    thumbnail: 'https://placehold.co/600x400.png',
    category: 'Web Design',
    chapters: [
       {
        id: 'chap1_tw',
        title: 'Getting Started',
        videos: [
          { id: 'vid1_1_tw', title: 'What is Tailwind?', duration: '8:00', url: placeholderVideoUrl },
        ],
        notes: [
           { id: 'note_tw_1', title: 'Tailwind Cheatsheet', url: '/notes/sample-notes.pdf' },
        ]
      },
    ],
  },
  {
    id: 'react-deep-dive',
    title: 'React Deep Dive',
    description: 'Understand the core concepts of React, including hooks, context, performance optimization, and state management.',
    price: 5999,
    mrp: 11999,
    thumbnail: 'https://placehold.co/600x400.png',
    category: 'Web Development',
    chapters: [
       {
        id: 'chap1_r',
        title: 'React Fundamentals',
        videos: [
          { id: 'vid1_1_r', title: 'JSX and Components', duration: '20:10', url: placeholderVideoUrl },
        ],
        notes: []
      },
    ],
  },
  {
    id: 'fullstack-firebase',
    title: 'Full-stack with Firebase',
    description: 'Build full-stack, serverless applications with Firebase. Covers Authentication, Firestore, Storage, and Cloud Functions.',
    price: 6999,
    mrp: 14999,
    thumbnail: 'https://placehold.co/600x400.png',
    category: 'Full-stack',
    chapters: [
       {
        id: 'chap1_fb',
        title: 'Firebase Auth',
        videos: [
          { id: 'vid1_1_fb', title: 'Email & Password Login', duration: '25:00', url: placeholderVideoUrl },
        ],
        notes: []
      },
    ],
  },
  {
    id: 'javascript-es2024',
    title: 'Modern JavaScript (ES2024)',
    description: 'Get up to date with the latest features in JavaScript. Understand modern syntax, asynchronous programming, and new APIs.',
    price: 3999,
    mrp: 7999,
    thumbnail: 'https://placehold.co/600x400.png',
    category: 'Web Development',
    chapters: [
      {
        id: 'chap1_js',
        title: 'Async/Await',
        videos: [
          { id: 'vid1_1_js', title: 'Promises vs Async/Await', duration: '14:30', url: placeholderVideoUrl },
        ],
        notes: []
      },
    ],
  },
   {
    id: 'uiux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of great UI/UX design. Covers user research, wireframing, prototyping, and visual design using Figma.',
    price: 4999,
    mrp: 9999,
    thumbnail: 'https://placehold.co/600x400.png',
    category: 'Web Design',
    chapters: [
      {
        id: 'chap1_uiux',
        title: 'Introduction to Design Thinking',
        videos: [
          { id: 'vid1_1_uiux', title: 'The Design Thinking Process', duration: '18:00', url: placeholderVideoUrl },
        ],
        notes: []
      },
    ],
  },
];
