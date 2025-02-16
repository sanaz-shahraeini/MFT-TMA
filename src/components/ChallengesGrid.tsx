import React, { useState } from "react";
import ChallengeCard, { ChallengeProps } from "./ChallengeCard";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";

const SAMPLE_CHALLENGES: Omit<ChallengeProps, "onParticipate">[] = [
  {
    title: "چالش برنامه‌نویسی هفتگی",
    description: "حل مسئله الگوریتمی با محدودیت زمانی",
    category: "برنامه‌نویسی",
    reward: 50,
    xp: 1000,
    deadline: "۲ روز مانده",
    difficulty: "متوسط",
  },
  {
    title: "طراحی رابط کاربری",
    description: "طراحی یک رابط کاربری برای اپلیکیشن کیف پول",
    category: "طراحی گرافیک",
    reward: 100,
    xp: 2000,
    deadline: "۵ روز مانده",
    difficulty: "سخت",
  },
  {
    title: "بهینه‌سازی فرآیند",
    description: "ارائه راه‌حل برای بهبود گردش کار پروژه",
    category: "مدیریت پروژه",
    reward: 30,
    xp: 800,
    deadline: "۳ روز مانده",
    difficulty: "آسان",
  },
];

const ChallengesGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="جستجوی چالش‌ها..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="programming">برنامه‌نویسی</SelectItem>
            <SelectItem value="design">طراحی گرافیک</SelectItem>
            <SelectItem value="management">مدیریت پروژه</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_CHALLENGES.map((challenge, index) => (
          <ChallengeCard
            key={index}
            {...challenge}
            onParticipate={() =>
              console.log(`Participating in challenge: ${challenge.title}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesGrid;
