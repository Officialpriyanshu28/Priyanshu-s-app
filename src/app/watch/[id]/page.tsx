
'use client';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { courses } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlayCircle, Lock, FileText, Download } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import type { Video } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

function WatchPageClient({ courseId }: { courseId: string }) {
  const course = courses.find((c) => c.id === courseId);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (course) {
      const firstChapter = course.chapters[0];
      if (firstChapter) {
        setActiveVideo(firstChapter.videos[0] || null);
        setActiveChapterId(firstChapter.id);
      }
    }
  }, [course]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !activeVideo) return;

    const handleTimeUpdate = () => {
        if (videoElement.currentTime > 0) {
            localStorage.setItem(`video-progress-${activeVideo.id}`, videoElement.currentTime.toString());
        }
    };

    const handleLoadedData = () => {
        const savedTime = localStorage.getItem(`video-progress-${activeVideo.id}`);
        if (savedTime) {
            videoElement.currentTime = parseFloat(savedTime);
        }
    };
    
    const intervalId = setInterval(handleTimeUpdate, 5000);

    videoElement.addEventListener('loadeddata', handleLoadedData);

    handleLoadedData();

    return () => {
        clearInterval(intervalId);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [activeVideo]);


  if (!course) {
    return notFound();
  }

  const handleVideoSelect = (video: Video, chapterId: string) => {
    setActiveVideo(video);
    setActiveChapterId(chapterId);
  };
  
  const activeChapter = course.chapters.find(c => c.id === activeChapterId);

  const handleDownload = async (url: string, filename: string) => {
    try {
      // For mock data, we can directly use the provided URL if it's external
      // or create a downloadable link if it's a local path.
      // This implementation simulates fetching and downloading.
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast({
        title: "Download Started",
        description: `Downloading ${filename}`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: `Could not download the file "${filename}". Please try again later.`,
      });
    }
  };


  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <aside className="w-full md:w-80 lg:w-96 border-r bg-card">
        <div className="p-4">
          <h2 className="text-xl font-bold font-headline truncate">{course.title}</h2>
        </div>
        <Accordion type="single" collapsible defaultValue={`item-${course.chapters[0]?.id}`} className="w-full">
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

      <main className="flex-1 p-4 md:p-6">
          <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
                 {activeVideo ? (
                    <video
                        ref={videoRef}
                        key={activeVideo.id}
                        className="w-full h-full"
                        controls
                        autoPlay
                        src={activeVideo.url}
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        Your browser does not support the video tag.
                    </video>
                 ) : (
                    <p className="text-white">Select a video to play</p>
                 )}
            </div>
          </AspectRatio>
          <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold font-headline">
                    {activeVideo?.title}
                </h1>
              </div>
              
              <Tabs defaultValue="description" className="mt-4">
                <TabsList>
                    <TabsTrigger value="description">
                        <FileText className="h-4 w-4 mr-2"/>
                        Description
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                        <FileText className="h-4 w-4 mr-2"/>
                        Notes
                    </TabsTrigger>
                    <TabsTrigger value="download">
                        <Download className="h-4 w-4 mr-2"/>
                        Download
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                     <p className="text-muted-foreground">This section contains the description for the video: "{activeVideo?.title}". Enhance your learning by following along.</p>
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
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleDownload(note.url, `${note.title}.pdf`)}
                           >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                           </Button>
                        </li>
                      ))}
                    </ul>
                   ) : (
                    <p className="text-muted-foreground text-center py-8">No notes available for this chapter.</p>
                   )}
                </TabsContent>
                <TabsContent value="download" className="mt-4">
                     {activeVideo ? (
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                                <PlayCircle className="h-5 w-5 text-primary" />
                                <span className="font-medium">{activeVideo.title}</span>
                            </div>
                            <Button 
                                variant="outline"
                                onClick={() => handleDownload(activeVideo.url, `${activeVideo.title}.mp4`)}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Video
                            </Button>
                        </div>
                     ) : (
                        <p className="text-muted-foreground text-center py-8">No video selected.</p>
                     )}
                </TabsContent>
              </Tabs>
          </div>
      </main>
    </div>
  );
}


export default function WatchPage() {
  const params = useParams();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!courseId) {
    // This can be a loading state or return null
    return null;
  }
  
  return <WatchPageClient courseId={courseId} />;
}
