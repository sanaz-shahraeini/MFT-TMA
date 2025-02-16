import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  nftRequired: boolean;
  hasDiscount: boolean;
}

interface CourseGridProps {
  courses?: Course[];
  onCourseSelect?: (courseId: string) => void;
}

const CourseGrid = ({
  courses = [
    {
      id: "1",
      title: "مقدمه‌ای بر بلاکچین",
      description: "آموزش مفاهیم پایه تکنولوژی بلاکچین و ارزهای دیجیتال",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
      price: 100,
      nftRequired: false,
      hasDiscount: true,
    },
    {
      id: "2",
      title: "قراردادهای هوشمند پیشرفته",
      description: "تسلط بر هنر نوشتن قراردادهای هوشمند امن و کارآمد",
      imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
      price: 200,
      nftRequired: true,
      hasDiscount: false,
    },
    {
      id: "3",
      title: "مبانی دیفای",
      description: "درک مفاهیم فایننس غیرمتمرکز و کاربردهای آن",
      imageUrl: "https://images.unsplash.com/photo-1639322537674-e8f5f08c4d89",
      price: 150,
      nftRequired: false,
      hasDiscount: true,
    },
  ],
  onCourseSelect = (courseId: string) =>
    console.log(`Selected course: ${courseId}`),
}: CourseGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Filters Section */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="جستجوی دوره‌ها..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="مرتب‌سازی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="price-low">قیمت: کم به زیاد</SelectItem>
              <SelectItem value="price-high">قیمت: زیاد به کم</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
            price={course.price}
            nftRequired={course.nftRequired}
            hasDiscount={course.hasDiscount}
            onRegister={() => onCourseSelect(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
