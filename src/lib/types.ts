
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
  id: string;
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
