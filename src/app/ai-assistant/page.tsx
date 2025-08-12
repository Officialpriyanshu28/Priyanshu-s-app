
'use client';

import React, { useState } from 'react';
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
import { Bot, Image as ImageIcon, FileText, Code, Sparkles, Loader2 } from 'lucide-react';
import { advancedAssistant, AdvancedAssistantInput } from '@/ai/flows/advancedAssistantFlow';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

export default function AiAssistantPage() {
  const [activeTab, setActiveTab] = useState('image_solver');
  const [mode, setMode] = useState<AdvancedAssistantInput['mode']>('image_solver');
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { toast } = useToast();

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
    let input: AdvancedAssistantInput = { mode: modeToUse };
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
      input.question = text; // Use question field for text
      hasInput = true;
    } else if (modeToUse === 'code_doctor') {
      if (!code) {
        toast({ variant: 'destructive', title: 'Please enter some code.' });
        return;
      }
      input.code = code;
      hasInput = true;
    }

    if (!hasInput) return;

    setIsLoading(true);
    setResponse('');
    try {
      const result = await advancedAssistant(input);
      setResponse(result);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to get a response from the AI assistant.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // Set a default mode for the new tab
    if (newTab === 'image_solver') setMode('image_solver');
    if (newTab === 'text_genius') setMode('text_genius_summary'); // Default to summary
    if (newTab === 'code_doctor') setMode('code_doctor');
    
    // Reset states
    setResponse('');
    setQuestion('');
    setCode('');
    setText('');
    setImage(null);
    setImagePreview(null);
  }
  
  const handleTextGenSubmit = (textGenMode: 'text_genius_summary' | 'text_genius_mindmap') => {
    setMode(textGenMode);
    handleSubmit(textGenMode);
  }

  const renderResponse = () => (
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

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6">
      <div className="flex flex-col items-center text-center mb-8">
        <Bot className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Advanced AI Assistant
        </h1>
        <p className="text-muted-foreground mt-2">
          Your powerful assistant for solving problems, summarizing text, and fixing code.
        </p>
      </div>

      <Tabs defaultValue="image_solver" onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image_solver"><ImageIcon className="mr-2 h-4 w-4" /> Image Solver</TabsTrigger>
          <TabsTrigger value="text_genius"><FileText className="mr-2 h-4 w-4" /> Text Genius</TabsTrigger>
          <TabsTrigger value="code_doctor"><Code className="mr-2 h-4 w-4" /> Code Doctor</TabsTrigger>
        </TabsList>

        <TabsContent value="image_solver">
          <Card>
            <CardHeader>
              <CardTitle>Solve from Image</CardTitle>
              <CardDescription>Upload an image with a question, and let the AI solve it.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text_genius">
          <Card>
            <CardHeader>
              <CardTitle>Summarize & Mind Map Text</CardTitle>
              <CardDescription>Paste any text to get a quick summary or a structured mind map.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="text-input">Your Text</Label>
                <Textarea id="text-input" placeholder="Paste text from a PDF, article, or notes here..." value={text} onChange={(e) => setText(e.target.value)} rows={10} />
              </div>
              <div className="flex gap-4">
                  <Button className="w-full" onClick={() => handleTextGenSubmit('text_genius_summary')} disabled={isLoading}>
                    {isLoading && mode === 'text_genius_summary' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Summarize
                  </Button>
                   <Button className="w-full" variant="outline" onClick={() => handleTextGenSubmit('text_genius_mindmap')} disabled={isLoading}>
                    {isLoading && mode === 'text_genius_mindmap' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Mind Map
                  </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code_doctor">
          <Card>
            <CardHeader>
              <CardTitle>Debug Your Code</CardTitle>
              <CardDescription>Paste your code snippet and the AI will find and fix errors for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                  <Label htmlFor="code-input">Code Snippet</Label>
                  <Textarea id="code-input" placeholder="Paste your code here..." value={code} onChange={(e) => setCode(e.target.value)} rows={10} className="font-mono" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {(activeTab === 'image_solver' || activeTab === 'code_doctor') && (
        <div className="mt-4">
          <Button onClick={() => handleSubmit()} disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Thinking...' : 'Get Answer'}
          </Button>
        </div>
      )}

      {isLoading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /></div>}

      {response && renderResponse()}
    </div>
  );
}
