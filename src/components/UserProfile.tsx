import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Trophy, Award, Coins, Star } from "lucide-react";

interface UserProfileProps {
  user?: {
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    totalTonEarned: number;
    completedChallenges: number;
    rank: string;
    achievements: Array<{
      title: string;
      description: string;
      icon: "trophy" | "award" | "star";
    }>;
  };
}

const UserProfile = ({
  user = {
    name: "کاربر تستی",
    level: 5,
    xp: 2500,
    xpToNextLevel: 5000,
    totalTonEarned: 250,
    completedChallenges: 12,
    rank: "حرفه‌ای",
    achievements: [
      {
        title: "قهرمان چالش‌ها",
        description: "۱۰ چالش را با موفقیت به پایان رساندید",
        icon: "trophy",
      },
      {
        title: "مبتکر برتر",
        description: "۵ راه‌حل خلاقانه ارائه کردید",
        icon: "star",
      },
      {
        title: "متخصص بلاکچین",
        description: "تمام دوره‌های بلاکچین را تکمیل کردید",
        icon: "award",
      },
    ],
  },
}: UserProfileProps) => {
  const getIcon = (iconName: "trophy" | "award" | "star") => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "award":
        return <Award className="w-5 h-5 text-blue-500" />;
      case "star":
        return <Star className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-6">
      {/* User Stats Card */}
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt="User avatar"
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>
                سطح {user.level} - {user.rank}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* XP Progress */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">XP</span>
                <span className="text-sm text-gray-500">
                  {user.xp} / {user.xpToNextLevel}
                </span>
              </div>
              <Progress value={(user.xp / user.xpToNextLevel) * 100} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-reverse space-x-2">
                  <Coins className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">TON دریافتی</span>
                </div>
                <p className="mt-2 text-2xl font-bold">{user.totalTonEarned}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-reverse space-x-2">
                  <Trophy className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">چالش‌های تکمیل شده</span>
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {user.completedChallenges}
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="font-semibold">دستاوردها</h3>
              <div className="space-y-3">
                {user.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-reverse space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {getIcon(achievement.icon)}
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-500">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
