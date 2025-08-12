

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  mrp: number;
  thumbnail: string;
  category: string;
  chapters: Chapter[];
  banner?: string;
  instructor: string;
  durationHours: number;
  liveClasses?: LiveClass[];
}

export interface Chapter {
  id: string;
  title: string;
  videos: Video[];
  notes: Note[];
  quiz?: Quiz;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  url: string;
}

export interface Banner {
  image: string;
  alt: string;
}

export interface Note {
  id:string;
  title: string;
  url: string;
}

export interface Quiz {
    id: string;
    title: string;
    timeLimitMinutes: number;
    questions: Question[];
}

export interface Question {
    id: string;
    text: string;
    options: Option[];
    correctOptionId: string;
    explanation: string;
}

export interface Option {
    id: string;
    text: string;
}

export interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  dateTime: string;
  status: 'upcoming' | 'live' | 'ended';
  recordingUrl?: string;
  notesUrl?: string;
  courseTitle?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

export interface PollOption {
  id: string;
  text: string;
}

export interface PollRanking {
  rank: number;
  name: string;
  timeSeconds: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Student" | "Instructor";
  status: "Active" | "Inactive" | "Blocked";
  joined: string;
  avatar: string;
}

export interface RecentOrder {
    id: string;
    userId: string;
    courseId: string;
    amount: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Failed';
}
