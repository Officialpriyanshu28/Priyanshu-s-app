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
}

export interface Video {
  id: string;
  title: string;
  duration: string;
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
