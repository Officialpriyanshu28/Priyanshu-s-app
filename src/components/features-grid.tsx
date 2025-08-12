
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    GraduationCap,
    PlaySquare,
    Bot,
    Bell,
    FilePenLine,
    FileText,
    ClipboardCheck,
    CalendarDays,
    HelpCircle,
    Link2,
    Download,
    Code2,
    type LucideIcon
} from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
    GraduationCap,
    PlaySquare,
    Bot,
    Bell,
    FilePenLine,
    FileText,
    ClipboardCheck,
    CalendarDays,
    HelpCircle,
    Link2,
    Download,
    Code2,
};

export interface Feature {
    href: string;
    label: string;
    iconName: string;
    new: boolean;
}

interface FeaturesGridProps {
    features: Feature[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
    return (
        <section>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {features.map(({ href, label, iconName, new: isNew }) => {
                const Icon = iconMap[iconName];
                if (!Icon) return null;

                return (
                    <Link href={href} key={label} className="block">
                    <Card className="h-full transition-shadow hover:shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center p-4 text-center aspect-square">
                        {isNew && (
                            <Badge className="absolute top-1 right-1 bg-yellow-400 text-black hover:bg-yellow-400/80">
                            New
                            </Badge>
                        )}
                        <Icon className="h-8 w-8 mb-2 text-primary" />
                        <span className="text-sm font-medium text-foreground">{label}</span>
                        </CardContent>
                    </Card>
                    </Link>
                )
            })}
            </div>
        </section>
    );
}
