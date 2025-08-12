
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const CustomLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 via-red-400 to-purple-500 p-1", className)}>
        <GraduationCap className="h-6 w-6 text-white" />
    </div>
);


export default function Logo({ className, textClassName }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <CustomLogo />
      <span
        className={cn(
          'font-headline text-xl font-bold text-foreground',
          textClassName
        )}
      >
        Priyanshu's app
      </span>
    </div>
  );
}
