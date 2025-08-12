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
