
'use client';
import { notFound } from 'next/navigation';
import React, { use, useEffect } from 'react';
import { courses } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlayCircle, Lock, FileText, Download, Bot, User, Send, Paperclip } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Video } from '@/lib/types';
import { courseAssistant } from '@/ai/flows/courseAssistantFlow';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    imagePreview?: string;
}

function WatchPageClient({ courseId }: { courseId: string }) {
  const course = courses.find((c) => c.id === courseId);
  const [activeVideo, setActiveVideo] = useState<Video | null>(course?.chapters[0]?.videos[0] || null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(course?.chapters[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

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
    
    // Save progress every 5 seconds
    const intervalId = setInterval(handleTimeUpdate, 5000);

    videoElement.addEventListener('loadeddata', handleLoadedData);

    // Initial load
    handleLoadedData();

    return () => {
        clearInterval(intervalId);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [activeVideo]);


  if (!course) {
    notFound();
  }

  const handleVideoSelect = (video: Video, chapterId: string) => {
    setActiveVideo(video);
    setActiveChapterId(chapterId);
    setMessages([]); // Clear chat history when video changes
  };
  
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  
  const activeChapter = course.chapters.find(c => c.id === activeChapterId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "Image too large",
          description: "Please select an image smaller than 4MB.",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !imageFile) || !activeVideo || !activeChapter) return;

    let imageDataUri: string | undefined = undefined;
    if (imageFile && imagePreview) {
        imageDataUri = imagePreview;
    }

    const userMessage: Message = { role: 'user', content: input, imagePreview: imagePreview || undefined };
    setMessages((prev) => [...prev, userMessage]);
    
    setInput('');
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    
    setIsLoading(true);

    try {
      const assistantResponse = await courseAssistant({
        courseTitle: course.title,
        chapterTitle: activeChapter.title,
        videoTitle: activeVideo.title,
        question: input,
        imageDataUri,
      });
      const assistantMessage: Message = { role: 'assistant', content: assistantResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I couldn't get a response. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


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

      <main className="flex-1 p-4 md:p-6">
          <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg" onContextMenu={handleContextMenu}>
            <div className="w-full h-full flex items-center justify-center">
                 {activeVideo ? (
                    <video
                        ref={videoRef}
                        key={activeVideo.id}
                        className="w-full h-full"
                        controls
                        controlsList="nodownload"
                        autoPlay
                        src={activeVideo.url}
                    >
                        Your browser does not support the video tag.
                    </video>
                 ) : (
                    <p className="text-white">Select a video to play</p>
                 )}
            </div>
          </AspectRatio>
          <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold font-headline">
                {activeVideo?.title}
              </h1>
              
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
                    <TabsTrigger value="ai-assistant">
                        <Bot className="h-4 w-4 mr-2"/>
                        AI Assistant
                    </TabsTrigger>
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
                 <TabsContent value="ai-assistant" className="mt-4">
                    <div className="border rounded-lg bg-card h-[500px] flex flex-col">
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                                    {message.role === 'assistant' && (
                                         <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("p-3 rounded-lg max-w-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                        {message.imagePreview && (
                                            <Image src={message.imagePreview} alt="User upload" width={200} height={200} className="rounded-md mb-2" />
                                        )}
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                     {message.role === 'user' && (
                                         <Avatar className="h-8 w-8">
                                            <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                    <div className="p-3 rounded-lg bg-muted">
                                        <p className="text-sm">Thinking...</p>
                                    </div>
                                </div>
                            )}
                            </div>
                        </ScrollArea>
                         {imagePreview && (
                            <div className="p-4 border-t flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                <Image src={imagePreview} alt="Preview" width={40} height={40} className="rounded-md" />
                                <span className="text-sm text-muted-foreground truncate max-w-xs">{imageFile?.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => { setImagePreview(null); setImageFile(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}>Remove</Button>
                            </div>
                        )}
                        <div className="p-4 border-t">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                 <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isLoading}
                                 >
                                    <Paperclip className="h-4 w-4" />
                                 </Button>
                                 <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    accept="image/*"
                                 />
                                <Input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask a question about this video..."
                                    disabled={isLoading}
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={isLoading || (!input.trim() && !imageFile)}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </TabsContent>
              </Tabs>
          </div>
      </main>
    </div>
  );
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const courseId = use(Promise.resolve(params.id));

  if (!courseId) {
    // You can render a loading state or return null
    return null;
  }

  return <WatchPageClient courseId={courseId} />;
}
