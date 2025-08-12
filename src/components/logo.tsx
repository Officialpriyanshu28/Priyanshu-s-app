import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const CustomLogo = ({ className }: { className?: string }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="url(#logo-gradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7L12 12L22 7"
      stroke="url(#logo-gradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
     <path
      d="M12 12V22"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 4.5L7 9.5"
      stroke="hsl(var(--accent))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
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
