
'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, Image as ImageIcon, FileText, Code, Sparkles, Loader2, Send, MessageSquare, Key } from 'lucide-react';
import { advancedAssistant, AdvancedAssistantInput, ChatMessage } from '@/ai/flows/advancedAssistantFlow';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';


const ApiKeyInput = () => {
    const [apiKey, setApiKey] = useState('');
    const { toast } = useToast();
    
    const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value);
        // This is a simple way to pass the key to the parent handlers.
        // In a real app, you'd likely use state management (Context, Zustand, etc.)
        (window as any).tempApiKey = e.target.value;
    };
    
    useEffect(() => {
        (window as any).tempApiKey = '';
        return () => delete (window as any).tempApiKey;
    }, []);

    return (
        <div className="relative mb-4">
            <Label htmlFor="api-key" className="sr-only">API Key</Label>
            <Input 
                id="api-key"
                type="password"
                placeholder="Enter your AI API Key here..."
                value={apiKey}
                onChange={handleApiKeyChange}
                className="pl-10"
            />
            <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
    );
};

const ChatInterface = ({
    apiKey,
    handleSubmit,
    isLoading,
    question,
    setQuestion,
    chatHistory,
    chatScrollAreaRef
} : {
    apiKey: string,
    handleSubmit: (mode: AdvancedAssistantInput['mode']) => void,
    isLoading: boolean,
    question: string,
    setQuestion: (q: string) => void,
    chatHistory: ChatMessage[],
    chatScrollAreaRef: React.RefObject<HTMLDivElement>
}) => (
    <Card className="flex flex-col h-[70vh]">
        <CardHeader>
            <CardTitle>Chat with AI</CardTitle>
            <CardDescription>Enter your API Key and start chatting. I'm here to help.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
             <ApiKeyInput />
             <ScrollArea className="flex-1 pr-4" ref={chatScrollAreaRef}>
                 <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : '')}>
                            {msg.role === 'model' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                </Avatar>
                            )}
                             <div className={cn("p-3 rounded-lg max-w-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                               <ReactMarkdown className="prose dark:prose-invert max-w-none break-words">
                                {msg.content}
                               </ReactMarkdown>
                             </div>
                        </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                           <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                Thinking...
                            </div>
                       </div>
                    )}
                 </div>
             </ScrollArea>
             <form className="flex items-center gap-2 border-t pt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('chat'); }}>
                <Input 
                    placeholder="Type your message..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !(window as any).tempApiKey}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </CardContent>
    </Card>
);

const ImageSolverTab = ({
    image,
    imagePreview,
    handleImageChange,
    question,
    setQuestion,
    apiKey,
    handleSubmit,
    isLoading,
    response
} : any) => (
    <Card>
        <CardHeader>
          <CardTitle>Solve from Image</CardTitle>
          <CardDescription>Upload an image with a question, and let the AI solve it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ApiKeyInput />
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {imagePreview && (
            <div className="p-2 border rounded-md">
              <img src={imagePreview} alt="Image preview" className="max-h-60 rounded-md mx-auto" />
            </div>
          )}
          <div>
            <Label htmlFor="image-question">Question</Label>
            <Textarea id="image-question" placeholder="e.g., 'Solve for x in the equation shown.'" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
           <div className="mt-4">
              <Button onClick={() => handleSubmit('image_solver')} disabled={isLoading || !(window as any).tempApiKey} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Thinking...' : 'Get Answer'}
              </Button>
            </div>

            {isLoading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /></div>}
            {response && <RenderResponse response={response} />}
        </CardContent>
    </Card>
);

const TextGeniusTab = ({
    text,
    setText,
    apiKey,
    handleTextGenSubmit,
    isLoading,
    mode,
    response,
}: any) => (
    <Card>
        <CardHeader>
          <CardTitle>Summarize & Mind Map Text</CardTitle>
          <CardDescription>Paste any text to get a quick summary or a structured mind map.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <ApiKeyInput />
           <div>
            <Label htmlFor="text-input">Your Text</Label>
            <Textarea id="text-input" placeholder="Paste text from a PDF, article, or notes here..." value={text} onChange={(e) => setText(e.target.value)} rows={10} />
          </div>
          <div className="flex gap-4">
              <Button className="w-full" onClick={() => handleTextGenSubmit('text_genius_summary')} disabled={isLoading || !(window as any).tempApiKey}>
                {isLoading && mode === 'text_genius_summary' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Summarize
              </Button>
               <Button className="w-full" variant="outline" onClick={() => handleTextGenSubmit('text_genius_mindmap')} disabled={isLoading || !(window as any).tempApiKey}>
                {isLoading && mode === 'text_genius_mindmap' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Mind Map
              </Button>
          </div>
          {isLoading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /></div>}
          {response && <RenderResponse response={response} />}
        </CardContent>
    </Card>
);

const CodeDoctorTab = ({
    code,
    setCode,
    apiKey,
    handleSubmit,
    isLoading,
    response
}: any) => (
     <Card>
        <CardHeader>
          <CardTitle>Debug Your Code</CardTitle>
          <CardDescription>Paste your code snippet and the AI will find and fix errors for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ApiKeyInput />
          <div>
              <Label htmlFor="code-input">Code Snippet</Label>
              <Textarea id="code-input" placeholder="Paste your code here..." value={code} onChange={(e) => setCode(e.target.value)} rows={10} className="font-mono" />
          </div>
          <div className="mt-4">
              <Button onClick={() => handleSubmit('code_doctor')} disabled={isLoading || !(window as any).tempApiKey} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Thinking...' : 'Get Answer'}
              </Button>
            </div>

            {isLoading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /></div>}
            {response && <RenderResponse response={response} />}
        </CardContent>
      </Card>
);

const RenderResponse = ({ response }: { response: string }) => (
    <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> AI Response</h3>
        <Card>
            <CardContent className="p-4">
                <ReactMarkdown className="prose dark:prose-invert max-w-none">
                    {response}
                </ReactMarkdown>
            </CardContent>
        </Card>
    </div>
);


export default function AiAssistantPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [mode, setMode] = useState<AdvancedAssistantInput['mode']>('chat');
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (chatScrollAreaRef.current) {
        chatScrollAreaRef.current.scrollTo({
            top: chatScrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [chatHistory, isLoading]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImage(dataUri);
        setImagePreview(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (currentMode?: AdvancedAssistantInput['mode']) => {
    const modeToUse = currentMode || mode;
    const apiKey = (window as any).tempApiKey;

    if (!apiKey) {
      toast({ variant: 'destructive', title: 'Please enter your API Key.' });
      return;
    }
    
    let input: AdvancedAssistantInput = { mode: modeToUse, apiKey };
    let hasInput = false;

    if (modeToUse === 'image_solver') {
      if (!image || !question) {
        toast({ variant: 'destructive', title: 'Please upload an image and ask a question.' });
        return;
      }
      input.image = image;
      input.question = question;
      hasInput = true;
    } else if (modeToUse === 'text_genius_summary' || modeToUse === 'text_genius_mindmap') {
      if (!text) {
        toast({ variant: 'destructive', title: 'Please enter some text.' });
        return;
      }
      input.question = text; 
      hasInput = true;
    } else if (modeToUse === 'code_doctor') {
      if (!code) {
        toast({ variant: 'destructive', title: 'Please enter some code.' });
        return;
      }
      input.code = code;
      hasInput = true;
    } else if (modeToUse === 'chat') {
        if (!question) {
            toast({ variant: 'destructive', title: 'Please enter a message.' });
            return;
        }
        input.question = question;
        input.chat_history = chatHistory;
        hasInput = true;
        setChatHistory(prev => [...prev, {role: 'user', content: question}]);
        setQuestion('');
    }

    if (!hasInput) return;

    setIsLoading(true);
    setResponse('');
    try {
      const result = await advancedAssistant(input);
      if (modeToUse === 'chat') {
        setChatHistory(prev => [...prev, {role: 'model', content: result}]);
      } else {
        setResponse(result);
      }
    } catch (error: any) {
      console.error('AI Assistant Error:', error);
      const errorMessage = error?.message || 'Failed to get a response from the AI assistant.';
      if (modeToUse === 'chat') {
         setChatHistory(prev => [...prev, {role: 'model', content: `Sorry, an error occurred: ${errorMessage}`}]);
      }
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    
    if (newTab === 'chat') setMode('chat');
    if (newTab === 'image_solver') setMode('image_solver');
    if (newTab === 'text_genius') setMode('text_genius_summary');
    if (newTab === 'code_doctor') setMode('code_doctor');
    
    setResponse('');
    setQuestion('');
    setCode('');
    setText('');
    setImage(null);
    setImagePreview(null);
    if(newTab !== 'chat') setChatHistory([]);
  }
  
  const handleTextGenSubmit = (textGenMode: 'text_genius_summary' | 'text_genius_mindmap') => {
    setMode(textGenMode);
    handleSubmit(textGenMode);
  }

  const TabContentLoader = () => (
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
  )

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6">
      <div className="flex flex-col items-center text-center mb-8">
        <Bot className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Advanced AI Assistant
        </h1>
        <p className="text-muted-foreground mt-2">
          Your powerful assistant for chat, solving problems, summarizing text, and fixing code.
        </p>
      </div>

      <Tabs defaultValue="chat" onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" /> Chat</TabsTrigger>
          <TabsTrigger value="image_solver"><ImageIcon className="mr-2 h-4 w-4" /> Image Solver</TabsTrigger>
          <TabsTrigger value="text_genius"><FileText className="mr-2 h-4 w-4" /> Text Genius</TabsTrigger>
          <TabsTrigger value="code_doctor"><Code className="mr-2 h-4 w-4" /> Code Doctor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
            <ChatInterface 
                apiKey={(window as any).tempApiKey}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                question={question}
                setQuestion={setQuestion}
                chatHistory={chatHistory}
                chatScrollAreaRef={chatScrollAreaRef}
            />
        </TabsContent>
        
        <TabsContent value="image_solver">
          <Suspense fallback={<TabContentLoader/>}>
             <ImageSolverTab
                image={image}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                question={question}
                setQuestion={setQuestion}
                apiKey={(window as any).tempApiKey}
                handleSubmit={handleSubmit}
                isLoading={isLoading && mode === 'image_solver'}
                response={response}
             />
          </Suspense>
        </TabsContent>

        <TabsContent value="text_genius">
           <Suspense fallback={<TabContentLoader/>}>
             <TextGeniusTab
                text={text}
                setText={setText}
                apiKey={(window as any).tempApiKey}
                handleTextGenSubmit={handleTextGenSubmit}
                isLoading={isLoading && (mode === 'text_genius_summary' || mode === 'text_genius_mindmap')}
                mode={mode}
                response={response}
             />
           </Suspense>
        </TabsContent>

        <TabsContent value="code_doctor">
           <Suspense fallback={<TabContentLoader/>}>
             <CodeDoctorTab
                code={code}
                setCode={setCode}
                apiKey={(window as any).tempApiKey}
                handleSubmit={handleSubmit}
                isLoading={isLoading && mode === 'code_doctor'}
                response={response}
             />
            </Suspense>
        </TabsContent>
      </Tabs>
      
    </div>
  );
}

