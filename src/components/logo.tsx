import { cn } from '@/lib/utils';
import { Box } from 'lucide-react';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const CustomLogo = ({ className }: { className?: string }) => (
    <Box className={cn('text-primary', className)} size={28} strokeWidth={1.5} />
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
