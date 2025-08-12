import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({ className, textClassName }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <BrainCircuit className="h-6 w-6 text-primary" />
      <span
        className={cn(
          'font-headline text-xl font-bold text-foreground',
          textClassName
        )}
      >
        SkillzUp
      </span>
    </div>
  );
}
