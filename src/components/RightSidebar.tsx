import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Lock, Wallet, Star } from "lucide-react";

interface FilterSection {
  title: string;
  options: { id: string; label: string; count?: number }[];
}

interface RightSidebarProps {
  filters?: FilterSection[];
  onFilterChange?: (
    sectionId: string,
    optionId: string,
    checked: boolean,
  ) => void;
}

const DEFAULT_FILTERS: FilterSection[] = [
  {
    title: "سطح دوره",
    options: [
      { id: "beginner", label: "مقدماتی", count: 4 },
      { id: "intermediate", label: "متوسط", count: 3 },
      { id: "advanced", label: "پیشرفته", count: 2 },
    ],
  },
  {
    title: "دسته‌بندی",
    options: [
      { id: "blockchain", label: "بلاکچین", count: 5 },
      { id: "defi", label: "دیفای", count: 2 },
      { id: "nft", label: "NFT", count: 2 },
      { id: "smart-contracts", label: "قراردادهای هوشمند", count: 3 },
    ],
  },
  {
    title: "ویژگی‌ها",
    options: [
      { id: "nft-required", label: "نیاز به NFT" },
      { id: "has-discount", label: "دارای تخفیف" },
      { id: "certificate", label: "گواهی پایان دوره" },
    ],
  },
];

const RightSidebar = ({
  filters = DEFAULT_FILTERS,
  onFilterChange = () => {},
}: RightSidebarProps) => {
  return (
    <Card className="w-64 h-[calc(100vh-6rem)] bg-white overflow-hidden flex flex-col sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">فیلترها</CardTitle>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="space-y-6">
          {filters.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-sm">{section.title}</h3>
              <div className="space-y-2">
                {section.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-reverse space-x-2"
                  >
                    <Checkbox
                      id={option.id}
                      onCheckedChange={(checked) =>
                        onFilterChange(
                          section.title,
                          option.id,
                          checked as boolean,
                        )
                      }
                    />
                    <div className="flex items-center justify-between flex-1">
                      <Label
                        htmlFor={option.id}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                      {option.count && (
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {index < filters.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default RightSidebar;
