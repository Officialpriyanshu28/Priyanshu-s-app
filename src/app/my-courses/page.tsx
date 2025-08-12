
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/services/courseService";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Lock, ShoppingCart } from "lucide-react";
import type { Course } from "@/lib/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const CourseCard = dynamic(() => import('@/components/course-card'), { 
  loading: () => <Skeleton className="h-full w-full" />,
  ssr: false 
});


export default function MyCoursesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        try {
          // Fetch all courses
          const allCourses = await getCourses();
          
          // Fetch user's orders from Firebase RTDB
          const ordersRef = ref(db, `orders/${user.uid}`);
          const snapshot = await get(ordersRef);
          
          if (snapshot.exists()) {
            const userOrderIds = Object.keys(snapshot.val());
            const userCourses = allCourses.filter(course => userOrderIds.includes(course.id));
            setPurchasedCourses(userCourses);
          } else {
            setPurchasedCourses([]);
          }

        } catch (error) {
            console.error("Failed to fetch user courses:", error);
            setPurchasedCourses([]);
        }

      } else {
        setIsAuthenticated(false);
        setPurchasedCourses([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);


  if (isLoading) {
    return (
       <div className="container mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">
            My Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Skeleton className="h-full w-full aspect-video" />
            <Skeleton className="h-full w-full aspect-video" />
            <Skeleton className="h-full w-full aspect-video" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">
        My Courses
      </h1>

      {isAuthenticated ? (
        purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {purchasedCourses.map((course) => (
                <CourseCard key={course.id} course={course} isPurchased={true} />
              ))}
            </div>
        ) : (
             <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">You haven't purchased any courses yet.</h2>
              <p className="text-muted-foreground mb-4">
                Explore our courses and start learning today!
              </p>
              <Button asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
        )
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
            <Lock className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Please log in to see your courses</h2>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to access your purchased courses.
          </p>
          <Button asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
