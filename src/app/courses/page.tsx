
'use client';

import { useState, useMemo } from 'react';
import CourseCard from "@/components/course-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { courses } from "@/lib/data";
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [instructor, setInstructor] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');

  const categories = useMemo(() => Array.from(new Set(courses.map(c => c.category))), []);
  const instructors = useMemo(() => Array.from(new Set(courses.map(c => c.instructor))), []);

  const filteredCourses = useMemo(() => {
    let filtered = courses
      .filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(course =>
        category === 'all' ? true : course.category === category
      )
      .filter(course =>
        instructor === 'all' ? true : course.instructor === instructor
      )
      .filter(course => {
        if (priceRange === 'all') return true;
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          return course.price >= min && course.price <= max;
        }
        return course.price >= min;
      });

    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
      default:
        // Assuming the original order is by latest
        break;
    }
    
    return filtered;
  }, [searchTerm, category, instructor, priceRange, sortOrder]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setInstructor('all');
    setPriceRange('all');
    setSortOrder('latest');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">
        All Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="relative lg:col-span-4">
          <Input 
            placeholder="Search by course name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={instructor} onValueChange={setInstructor}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Instructors</SelectItem>
            {instructors.map(inst => (
              <SelectItem key={inst} value={inst}>{inst}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-3000">Under ₹3000</SelectItem>
            <SelectItem value="3000-5000">₹3000 - ₹5000</SelectItem>
            <SelectItem value="5000-7000">₹5000 - ₹7000</SelectItem>
            <SelectItem value="7000-100000">Above ₹7000</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Sort by: Latest</SelectItem>
            <SelectItem value="price-asc">Sort by: Price Low to High</SelectItem>
            <SelectItem value="price-desc">Sort by: Price High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
       <div className="mb-8 flex justify-end">
          <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
       </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
