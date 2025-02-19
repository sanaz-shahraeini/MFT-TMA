import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trophy, Clock, Coins } from "lucide-react";

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  rewardTon: number;
  rewardXp: number;
  endDate: string;
  submissionType: "code" | "file" | "text";
  evaluationType: "moderator" | "community";
  onParticipate: (id: string) => void;
}

const ChallengeCard = ({
  id,
  title,
  description,
  category,
  rewardTon,
  rewardXp,
  endDate,
  submissionType,
  evaluationType,
  onParticipate,
}: ChallengeProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{submissionType} submission</Badge>
            <div className="flex items-center space-x-reverse space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{endDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="flex items-center">
              <Coins className="w-4 h-4 text-yellow-500 ml-1" />
              <span className="font-medium">{rewardTon} TON</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 text-purple-500 ml-1" />
              <span className="font-medium">{rewardXp} XP</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onParticipate(id)}>
          شرکت در چالش
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
