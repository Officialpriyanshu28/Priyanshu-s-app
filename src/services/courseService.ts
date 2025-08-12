
import { courses as initialCourses } from '@/lib/data';
import type { Course } from '@/lib/types';

// This is a mock database in memory.
// In a real application, this would be your SQL database connection.
let courses: Course[] = [...initialCourses];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches all courses.
 * In a real app, this would be: SELECT * FROM courses;
 */
export async function getCourses(): Promise<Course[]> {
  await delay(500);
  return courses;
}

/**
 * Fetches a single course by its ID.
 * In a real app, this would be: SELECT * FROM courses WHERE id = ?;
 */
export async function getCourseById(id: string): Promise<Course | undefined> {
  await delay(500);
  return courses.find(c => c.id === id);
}

/**
 * Creates a new course.
 * In a real app, this would be an INSERT statement.
 */
export async function createCourse(newCourse: Course): Promise<Course> {
  await delay(500);
  courses.push(newCourse);
  return newCourse;
}

/**
 * Updates an existing course.
 * In a real app, this would be an UPDATE statement.
 */
export async function updateCourse(id: string, updatedData: Partial<Course>): Promise<Course | null> {
  await delay(500);
  const courseIndex = courses.findIndex(c => c.id === id);
  if (courseIndex === -1) {
    return null;
  }
  courses[courseIndex] = { ...courses[courseIndex], ...updatedData };
  return courses[courseIndex];
}

/**
 * Deletes a course.
 * In a real app, this would be a DELETE statement.
 */
export async function deleteCourse(id: string): Promise<boolean> {
  await delay(500);
  const initialLength = courses.length;
  courses = courses.filter(c => c.id !== id);
  return courses.length < initialLength;
}
