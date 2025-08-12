
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { Course } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createCourse, updateCourse } from '@/services/courseService';

interface CourseFormProps {
  course?: Course;
}

export default function CourseForm({ course }: CourseFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(course?.thumbnail || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
        if (course) {
            // Update existing course
            await updateCourse(course.id, {
                ...course,
                title: data.title as string,
                description: data.description as string,
                price: Number(data.price),
                mrp: Number(data.mrp),
                instructor: data.instructor as string,
                category: data.category as string,
                thumbnail: imagePreview || course.thumbnail,
            });
            toast({
              title: "Course Updated",
              description: "The course details have been successfully updated.",
            });
        } else {
            // Create new course
            await createCourse({
                id: `course-${Date.now()}`, // Simple ID generation for mock
                title: data.title as string,
                description: data.description as string,
                price: Number(data.price),
                mrp: Number(data.mrp),
                instructor: data.instructor as string,
                category: data.category as string,
                thumbnail: imagePreview || 'https://placehold.co/600x400.png',
                chapters: [],
                durationHours: 0,
            });
            toast({
              title: "Course Created",
              description: "The new course has been successfully saved.",
            });
        }
        router.push('/admin/courses');
        // Optional: Force a refresh to see changes if data isn't updating automatically
        router.refresh();
    } catch (error) {
        toast({
            variant: "destructive",
            title: "An error occurred",
            description: "Could not save the course. Please try again.",
        });
    }
  };

  return (
    <div className="space-y-4">
        <Button variant="outline" size="sm" asChild>
            <Link href="/admin/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
            </Link>
        </Button>
        <Card>
            <CardHeader>
            <CardTitle>{course ? 'Edit Course' : 'Add New Course'}</CardTitle>
            <CardDescription>
                Fill in the details for the course.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input id="title" name="title" defaultValue={course?.title} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={course?.description}
                                required
                                rows={5}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input
                                id="price"
                                name="price"
                                type="number"
                                defaultValue={course?.price}
                                required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mrp">MRP (₹)</Label>
                                <Input id="mrp" name="mrp" type="number" defaultValue={course?.mrp} required />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="instructor">Instructor</Label>
                                <Input
                                id="instructor"
                                name="instructor"
                                defaultValue={course?.instructor}
                                required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                id="category"
                                name="category"
                                defaultValue={course?.category}
                                required
                                />
                            </div>
                         </div>
                    </div>
                    <div className="space-y-4">
                         <div className="space-y-2">
                            <Label>Thumbnail</Label>
                            <div className="p-2 border rounded-md aspect-video relative bg-muted">
                            {imagePreview ? (
                                <Image
                                src={imagePreview}
                                alt="Thumbnail preview"
                                fill
                                className="object-cover rounded-md"
                                data-ai-hint="course thumbnail"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <span>Image Preview</span>
                                </div>
                            )}
                            </div>
                             <Input id="thumbnail-upload" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                </div>


                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push('/admin/courses')}>
                        Cancel
                    </Button>
                    <Button type="submit">{course ? 'Update Course' : 'Create Course'}</Button>
                </div>
            </form>
            </CardContent>
        </Card>
    </div>
  );
}
