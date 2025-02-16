import React from "react";
import { Trophy, Book, User, Award } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const BottomNavigation = ({
  activeTab = "catalog",
  onTabChange = () => console.log("Tab changed"),
}: BottomNavigationProps) => {
  const tabs = [
    {
      id: "catalog",
      label: "دوره‌ها",
      icon: <Book className="w-5 h-5" />,
    },
    {
      id: "challenges",
      label: "چالش‌ها",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: "profile",
      label: "پروفایل",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "certificates",
      label: "گواهی‌ها",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 flex items-center justify-around px-4 z-50">
      <TooltipProvider>
        {tabs.map((tab) => (
          <Tooltip key={tab.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex flex-col items-center justify-center h-12 w-16 space-y-1 ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.icon}
                <span className="text-xs">{tab.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tab.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default BottomNavigation;
