import { notFound } from "next/navigation";
import Image from "next/image";
import { courses } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);

  return (
    <div>
      <div className="w-full aspect-video relative">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          data-ai-hint="online course video"
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Badge variant="outline">{course.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
              {course.title}
            </h1>
            <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 fill-current"/>
                    <Star className="h-5 w-5 text-muted-foreground fill-muted-foreground"/>
                </div>
                <span className="text-muted-foreground">(1,234 reviews)</span>
            </div>
            <p className="text-lg text-muted-foreground">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card p-4 border-t md:hidden">
         <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-primary">{course.price}</p>
                <p className="text-md text-muted-foreground line-through">{course.mrp}</p>
            </div>
            <Button className="bg-accent hover:bg-accent/90">Buy Now</Button>
         </div>
      </div>

      {/* Desktop sidebar-like purchase card */}
      <div className="hidden md:block fixed top-24 right-6 w-80">
          <div className="bg-card border rounded-lg shadow-sm p-6 space-y-4">
               <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-primary">{course.price}</p>
                <p className="text-lg text-muted-foreground line-through">{course.mrp}</p>
                <Badge variant="destructive">{discount}% off</Badge>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-lg">Buy Now</Button>
            <p className="text-xs text-center text-muted-foreground">30-Day Money-Back Guarantee</p>
          </div>
      </div>

    </div>
  );
}
