
'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { liveClasses } from '@/lib/data';
import type { Poll, PollOption, PollRanking } from '@/lib/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BarChart, MessageCircle, Send, Trophy, Crown, User, Bot } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock Data
const mockPoll: Poll = {
  id: 'poll1',
  question: 'Which new feature in Next.js 14 are you most excited about?',
  options: [
    { id: 'opt1', text: 'Server Actions' },
    { id: 'opt2', text: 'Improved Turbopack' },
    { id: 'opt3', text: 'Partial Prerendering' },
    { id: 'opt4', text: 'Other' },
  ],
};

const mockPollResults = [
  { name: 'Server Actions', votes: 45 },
  { name: 'Improved Turbopack', votes: 25 },
  { name: 'Partial Prerendering', votes: 20 },
  { name: 'Other', votes: 10 },
];

const mockPollRankings: PollRanking[] = [
  { rank: 1, name: 'Alice', timeSeconds: 2.5 },
  { rank: 2, name: 'Bob', timeSeconds: 2.8 },
  { rank: 3, name: 'Charlie', timeSeconds: 3.1 },
  { rank: 4, name: 'David', timeSeconds: 3.5 },
  { rank: 5, name: 'Eve', timeSeconds: 4.0 },
];

export default function LiveClassDetailPage() {
  const params = useParams();
  const liveClassId = Array.isArray(params.id) ? params.id[0] : params.id;
  const liveClass = liveClasses.find((lc) => lc.id === liveClassId);
  
  const [showPoll, setShowPoll] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!liveClass) {
    notFound();
  }
  
  const handlePollSubmit = () => {
    if(selectedOption) {
        setSubmitted(true);
    }
  }

  const PollCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-headline">Live Poll</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="font-semibold">{mockPoll.question}</p>
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-2" disabled={submitted}>
                {mockPoll.options.map(option => (
                    <Label key={option.id} htmlFor={option.id} className={cn("flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors", selectedOption === option.id && "bg-primary/10 border-primary")}>
                       <RadioGroupItem value={option.id} id={option.id} />
                       <span>{option.text}</span>
                    </Label>
                ))}
            </RadioGroup>
            <Button className="w-full" onClick={handlePollSubmit} disabled={!selectedOption || submitted}>
                {submitted ? 'Submitted' : 'Submit Answer'}
            </Button>
        </CardContent>
    </Card>
  );
  
  const ResultsCard = () => (
     <Card>
        <CardHeader>
            <CardTitle className="text-lg font-headline">Poll Results</CardTitle>
        </CardHeader>
        <CardContent>
             <AspectRatio ratio={16 / 9}>
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={mockPollResults}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="votes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </AspectRatio>
        </CardContent>
    </Card>
  );

  const RankingCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2"><Trophy className="text-yellow-500" /> Fastest Fingers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {mockPollRankings.map(ranking => (
                <div key={ranking.rank} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-3">
                       <span className="font-bold text-lg w-6 text-center">
                         {ranking.rank === 1 ? <Crown className="h-5 w-5 text-yellow-500"/> : ranking.rank}
                       </span>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/40?u=${ranking.name}`} />
                            <AvatarFallback>{ranking.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{ranking.name}</span>
                    </div>
                     <span className="text-sm text-muted-foreground">{ranking.timeSeconds.toFixed(2)}s</span>
                </div>
            ))}
        </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Main Content: Video + Info */}
      <div className="flex-1 lg:w-2/3 p-4 md:p-6 flex flex-col">
        <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg mb-4">
          <div className="w-full h-full flex items-center justify-center text-white relative">
            <p>Live Stream Placeholder</p>
             {liveClass.status === 'live' && <Badge variant="destructive" className="absolute top-4 left-4 animate-pulse">LIVE</Badge>}
          </div>
        </AspectRatio>
        <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-headline mb-1">{liveClass.title}</h1>
            <p className="text-muted-foreground">{liveClass.courseTitle}</p>
        </div>
      </div>

      {/* Sidebar: Chat + Poll */}
      <aside className="w-full lg:w-1/3 border-l bg-card flex flex-col">
        <Tabs defaultValue="poll" className="flex-1 flex flex-col">
          <TabsList className="m-2 grid w-[calc(100%-1rem)] grid-cols-2">
            <TabsTrigger value="poll"><BarChart className="h-4 w-4 mr-2" />Poll & Ranking</TabsTrigger>
            <TabsTrigger value="chat"><MessageCircle className="h-4 w-4 mr-2" />Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="poll" className="flex-1 overflow-y-auto p-4 space-y-4">
             {showPoll ? <PollCard /> : <ResultsCard />}
             {submitted && <RankingCard />}
          </TabsContent>
          
          <TabsContent value="chat" className="flex-1 flex flex-col">
             <ScrollArea className="flex-1 p-4">
                 <div className="space-y-4">
                    {/* Mock Chat Messages */}
                    <div className="flex items-start gap-3">
                         <Avatar className="h-8 w-8"><AvatarFallback><Bot /></AvatarFallback></Avatar>
                         <div className="p-3 rounded-lg bg-muted max-w-sm"><p className="text-sm">Welcome everyone! The class will start shortly. Feel free to ask questions here.</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                         <Avatar className="h-8 w-8"><AvatarFallback><User /></AvatarFallback></Avatar>
                         <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-sm"><p className="text-sm">Hi! Looking forward to it.</p></div>
                    </div>
                 </div>
             </ScrollArea>
             <div className="p-4 border-t">
                <form className="flex items-center gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
                </form>
             </div>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
