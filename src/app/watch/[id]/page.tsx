
'use client';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { courses, recentOrders } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlayCircle, Lock, FileText, Download, MessageSquare, ShieldAlert } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import type { Video } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

function WatchPageClient({ courseId }: { courseId: string }) {
  const course = courses.find((c) => c.id === courseId);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  // Mock logged-in user
  const loggedInUserId = 'user-2';

  useEffect(() => {
    // Check if the user has purchased the course
    const hasPurchased = recentOrders.some(order => order.userId === loggedInUserId && order.courseId === courseId);
    setIsPurchased(hasPurchased);

    if (course && hasPurchased) {
      const firstChapter = course.chapters[0];
      if (firstChapter) {
        setActiveVideo(firstChapter.videos[0] || null);
        setActiveChapterId(firstChapter.id);
      }
    }
  }, [course, courseId]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !activeVideo || !isPurchased) return;

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

    // Initial check
    handleLoadedData();

    return () => {
        clearInterval(intervalId);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [activeVideo, isPurchased]);


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
      toast({
        title: "Preparing Download...",
        description: `Your download for ${filename} will begin shortly.`,
      });

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
      
      // Clean up by removing the link and revoking the blob URL
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
      {isPurchased && (
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
                          )}
                        >
                          <PlayCircle className="h-5 w-5 shrink-0" />
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
      )}

      <main className="flex-1 p-4 md:p-6">
          <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
                 {activeVideo && isPurchased ? (
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
                    <div className="text-white text-center p-4">
                        <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-destructive" />
                        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                        <p className="text-lg text-white/80 mb-6">You must purchase this course to watch the videos.</p>
                        <Button asChild size="lg">
                            <Link href={`/courses/${course.id}`}>Buy Course</Link>
                        </Button>
                    </div>
                 )}
            </div>
          </AspectRatio>
          {isPurchased && (
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
                         <TabsTrigger value="comments">
                            <MessageSquare className="h-4 w-4 mr-2"/>
                            Comments
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
                    <TabsContent value="comments" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Discussion</CardTitle>
                                <CardDescription>Ask questions and share your thoughts.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                               <div className="space-y-4">
                                   {/* Mock Comments */}
                                   <div className="flex items-start gap-3">
                                       <Avatar>
                                           <AvatarImage src="https://i.pravatar.cc/40?u=student1" />
                                           <AvatarFallback>S1</AvatarFallback>
                                       </Avatar>
                                       <div>
                                           <p className="font-semibold">Jane Doe</p>
                                           <p className="text-sm text-muted-foreground">This was a great explanation, thank you!</p>
                                       </div>
                                   </div>
                                   <div className="flex items-start gap-3">
                                       <Avatar>
                                           <AvatarImage src="https://i.pravatar.cc/40?u=student2" />
                                           <AvatarFallback>S2</AvatarFallback>
                                       </Avatar>
                                       <div>
                                           <p className="font-semibold">Mike Ross</p>
                                           <p className="text-sm text-muted-foreground">Could you please explain the concept of hydration again?</p>
                                       </div>
                                   </div>
                               </div>
                            </CardContent>
                            <CardFooter>
                               <form className="w-full flex items-start gap-3">
                                    <Avatar>
                                       <AvatarImage src="https://i.pravatar.cc/40?u=currentUser" />
                                       <AvatarFallback>ME</AvatarFallback>
                                    </Avatar>
                                    <Textarea placeholder="Add a comment..." className="flex-1" />
                                    <Button>Post Comment</Button>
                               </form>
                            </CardFooter>
                        </Card>
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
          )}
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
