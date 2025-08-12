
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { courses } from '@/lib/data';
import type { Question, Option } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Timer, XCircle } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Answer = {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
};

export default function TestPlayerPage() {
  const params = useParams();
  const testId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [chapter, setChapter] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const foundChapter = courses
      .flatMap((c) => c.chapters)
      .find((ch) => ch.id === testId);

    if (foundChapter && foundChapter.quiz) {
      setChapter(foundChapter);
      setQuiz(foundChapter.quiz);
      setTimeLeft(foundChapter.quiz.timeLimitMinutes * 60);
    } else {
      // Handle case where test is not found after client-side hydration
    }
  }, [testId]);

  useEffect(() => {
    if (timeLeft <= 0 && quiz && !isFinished) {
      handleFinishTest();
      return;
    }
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quiz, isFinished]);

  if (!quiz) {
    // This can be a loading state
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading test...</p>
      </div>
    );
  }

  const handleNextQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOptionId;

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption!,
        isCorrect,
      },
    ]);

    setSelectedOption(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishTest(true);
    }
  };
  
  const handleFinishTest = (submitted = false) => {
    setIsFinished(true);
    if (submitted) {
        // If the user submits manually, process the last answer
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctOptionId;
         setAnswers(prev => [
            ...prev,
            {
                questionId: currentQuestion.id,
                selectedOptionId: selectedOption!,
                isCorrect,
            },
        ]);
    }
    setShowResults(true);
  };


  const currentQuestion: Question = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const score = answers.filter((a) => a.isCorrect).length;

  if (showResults) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">Test Results</CardTitle>
            <CardDescription>
              You scored {score} out of {quiz.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-5xl font-bold">
                {Math.round((score / quiz.questions.length) * 100)}%
              </p>
            </div>
            <div className="space-y-4">
              {quiz.questions.map((q: Question, index: number) => {
                const userAnswer = answers.find(a => a.questionId === q.id);
                const isCorrect = userAnswer?.isCorrect;
                return (
                  <div key={q.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                       {isCorrect ? (
                         <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                       ) : (
                         <XCircle className="h-5 w-5 text-red-500 mt-1" />
                       )}
                       <p className="flex-1 font-semibold">{index + 1}. {q.text}</p>
                    </div>
                    {!isCorrect && userAnswer && (
                       <div className="mt-2 pl-8 text-sm space-y-2">
                          <p>Your answer: <span className="font-medium text-red-500">{q.options.find(o => o.id === userAnswer.selectedOptionId)?.text}</span></p>
                          <p>Correct answer: <span className="font-medium text-green-500">{q.options.find(o => o.id === q.correctOptionId)?.text}</span></p>
                          <p className="text-muted-foreground p-2 bg-muted rounded-md mt-1">{q.explanation}</p>
                       </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter>
             <Button asChild className="w-full">
                <Link href="/test">Back to Tests</Link>
             </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline">
            {quiz.title}
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
            <div className="flex items-center gap-2 font-medium">
              <Timer className="h-5 w-5" />
              <span>
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-semibold">{currentQuestion.text}</p>
          <RadioGroup
            value={selectedOption || ''}
            onValueChange={setSelectedOption}
            className="space-y-3"
          >
            {currentQuestion.options.map((option: Option) => (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={cn(
                  'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors',
                  selectedOption === option.id && 'bg-primary/10 border-primary'
                )}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <span>{option.text}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className="w-full"
          >
            {currentQuestionIndex < quiz.questions.length - 1
              ? 'Next Question'
              : 'Submit Test'}
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog open={isFinished && timeLeft <= 0 && !showResults}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time for this test has expired. Your submitted answers will be graded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowResults(true)}>
              Show Results
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
