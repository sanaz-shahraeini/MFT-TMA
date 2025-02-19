import React, { useState } from "react";
import CourseCard from "./CourseCard";
import RightSidebar from "./RightSidebar";
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
  level: "beginner" | "intermediate" | "advanced";
  category: string;
}

interface CourseGridProps {
  courses?: Course[];
  onCourseSelect?: (courseId: string) => void;
}

const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    title: "مقدمه‌ای بر بلاکچین",
    description: "آموزش مفاهیم پایه تکنولوژی بلاکچین و ارزهای دیجیتال",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    price: 100,
    nftRequired: false,
    hasDiscount: true,
    level: "beginner",
    category: "blockchain",
  },
  {
    id: "2",
    title: "قراردادهای هوشمند پیشرفته",
    description: "تسلط بر هنر نوشتن قراردادهای هوشمند امن و کارآمد",
    imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    price: 200,
    nftRequired: true,
    hasDiscount: false,
    level: "advanced",
    category: "smart-contracts",
  },
  {
    id: "3",
    title: "مبانی دیفای",
    description: "درک مفاهیم فایننس غیرمتمرکز و کاربردهای آن",
    imageUrl: "https://images.unsplash.com/photo-1639322537674-e8f5f08c4d89",
    price: 150,
    nftRequired: false,
    hasDiscount: true,
    level: "intermediate",
    category: "defi",
  },
  {
    id: "4",
    title: "توسعه dApp با TON",
    description: "ساخت برنامه‌های غیرمتمرکز روی شبکه TON",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    price: 180,
    nftRequired: false,
    hasDiscount: true,
    level: "intermediate",
    category: "blockchain",
  },
  {
    id: "5",
    title: "امنیت در بلاکچین",
    description: "اصول امنیت در توسعه قراردادهای هوشمند و dApp ها",
    imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    price: 250,
    nftRequired: true,
    hasDiscount: false,
    level: "advanced",
    category: "smart-contracts",
  },
  {
    id: "6",
    title: "تحلیل بازار کریپتو",
    description: "آموزش تحلیل تکنیکال و فاندامنتال در بازار ارزهای دیجیتال",
    imageUrl: "https://images.unsplash.com/photo-1639322537674-e8f5f08c4d89",
    price: 120,
    nftRequired: false,
    hasDiscount: true,
    level: "beginner",
    category: "blockchain",
  },
  {
    id: "7",
    title: "NFT و متاورس",
    description: "آشنایی با دنیای NFT ها و فرصت‌های متاورس",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    price: 160,
    nftRequired: false,
    hasDiscount: true,
    level: "beginner",
    category: "nft",
  },
  {
    id: "8",
    title: "معماری بلاکچین",
    description: "درک عمیق معماری و زیرساخت‌های بلاکچین",
    imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    price: 220,
    nftRequired: true,
    hasDiscount: false,
    level: "advanced",
    category: "blockchain",
  },
];

const ITEMS_PER_PAGE = 6;

const CourseGrid = ({
  courses = SAMPLE_COURSES,
  onCourseSelect = (courseId: string) =>
    console.log(`Selected course: ${courseId}`),
}: CourseGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: Set<string>;
  }>({
    "سطح دوره": new Set(),
    دسته‌بندی: new Set(),
    ویژگی‌ها: new Set(),
  });

  const handleFilterChange = (
    sectionTitle: string,
    optionId: string,
    checked: boolean,
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[sectionTitle].add(optionId);
      } else {
        newFilters[sectionTitle].delete(optionId);
      }
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) => {
      // Text search
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Level filter
      const levelFilter = activeFilters["سطح دوره"];
      const matchesLevel =
        levelFilter.size === 0 || levelFilter.has(course.level);

      // Category filter
      const categoryFilter = activeFilters["دسته‌بندی"];
      const matchesCategory =
        categoryFilter.size === 0 || categoryFilter.has(course.category);

      // Features filter
      const featureFilter = activeFilters["ویژگی‌ها"];
      const matchesFeatures =
        featureFilter.size === 0 ||
        (featureFilter.has("nft-required") && course.nftRequired) ||
        (featureFilter.has("has-discount") && course.hasDiscount);

      return (
        matchesSearch && matchesLevel && matchesCategory && matchesFeatures
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex gap-6">
      <RightSidebar onFilterChange={handleFilterChange} />

      <div className="flex-1">
        {/* Filters Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="جستجوی دوره‌ها..."
              className="pr-10"
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
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCourses.map((course) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              قبلی
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              بعدی
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseGrid;
