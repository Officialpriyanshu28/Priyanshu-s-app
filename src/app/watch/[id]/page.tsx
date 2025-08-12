'use client'
import { notFound } from 'next/navigation';
import { courses } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlayCircle, Lock, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Video } from '@/lib/types';

export default function WatchPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  const [activeVideo, setActiveVideo] = useState<Video | null>(course?.chapters[0]?.videos[0] || null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(course?.chapters[0]?.id || null);

  if (!course) {
    notFound();
  }

  const handleVideoSelect = (video: Video, chapterId: string) => {
    setActiveVideo(video);
    setActiveChapterId(chapterId);
  };
  
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  
  const activeChapter = course.chapters.find(c => c.id === activeChapterId);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <aside className="w-full md:w-80 lg:w-96 border-r bg-card">
        <div className="p-4">
          <h2 className="text-xl font-bold font-headline truncate">{course.title}</h2>
        </div>
        <Accordion type="single" collapsible defaultValue={`item-${course.chapters[0].id}`} className="w-full">
          {course.chapters.map((chapter) => (
            <AccordionItem value={`item-${chapter.id}`} key={chapter.id}>
              <AccordionTrigger className="px-4 text-base font-semibold">
                {chapter.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {chapter.videos.map((video, index) => (
                    <li key={video.id}>
                      <button
                        onClick={() => handleVideoSelect(video, chapter.id)}
                        className={cn(
                          "w-full text-left flex items-center gap-3 p-3 transition-colors hover:bg-accent/50",
                          activeVideo?.id === video.id && "bg-accent text-accent-foreground",
                           index > 1 && "text-muted-foreground" // Mock locked videos
                        )}
                        disabled={index > 1} // Mock locked videos
                      >
                        {index > 1 ? <Lock className="h-5 w-5 shrink-0" /> : <PlayCircle className="h-5 w-5 shrink-0" />}
                        <span className="flex-grow text-sm">{video.title}</span>
                        <span className="text-xs text-muted-foreground">{video.duration}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>

      <main className="flex-1 p-4 md:p-6" onContextMenu={handleContextMenu}>
          <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
                 <video
                    key={activeVideo?.id}
                    className="w-full h-full"
                    controls
                    controlsList="nodownload"
                    autoPlay
                    src="" // In a real app, you would source the video URL here
                 >
                    Your browser does not support the video tag.
                 </video>
                 {/* Placeholder if no video src */}
                 <p className="text-white">Video player for: {activeVideo?.title}</p>
            </div>
          </AspectRatio>
          <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold font-headline">
                {activeVideo?.title}
              </h1>
              
              <Tabs defaultValue="description" className="mt-4">
                <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                     <p className="text-muted-foreground">Welcome to the first video! Let's get started.</p>
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                   {activeChapter && activeChapter.notes.length > 0 ? (
                    <ul className="space-y-3">
                      {activeChapter.notes.map((note) => (
                        <li key={note.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                           <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <span className="font-medium">{note.title}</span>
                           </div>
                           <Button asChild variant="outline" size="sm">
                             <Link href={note.url} target="_blank" download>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                             </Link>
                           </Button>
                        </li>
                      ))}
                    </ul>
                   ) : (
                    <p className="text-muted-foreground text-center py-8">No notes available for this chapter.</p>
                   )}
                </TabsContent>
              </Tabs>
          </div>
      </main>
    </div>
  );
}
