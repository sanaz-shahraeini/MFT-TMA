import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trophy, Clock, Coins } from "lucide-react";

export interface ChallengeProps {
  title: string;
  description: string;
  category: string;
  reward: number;
  xp: number;
  deadline: string;
  difficulty: "آسان" | "متوسط" | "سخت";
  onParticipate: () => void;
}

const ChallengeCard = ({
  title,
  description,
  category,
  reward,
  xp,
  deadline,
  difficulty,
  onParticipate,
}: ChallengeProps) => {
  const difficultyColors = {
    آسان: "bg-green-100 text-green-800",
    متوسط: "bg-yellow-100 text-yellow-800",
    سخت: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{category}</Badge>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{deadline}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Coins className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="font-medium">{reward} TON</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 text-purple-500 mr-1" />
              <span className="font-medium">{xp} XP</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onParticipate}>
          شرکت در چالش
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
