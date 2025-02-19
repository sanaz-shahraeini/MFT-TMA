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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Lock, Wallet } from "lucide-react";

interface CourseCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  nftRequired?: boolean;
  hasDiscount?: boolean;
  onRegister?: () => void;
}

const CourseCard = ({
  title = "مقدمه‌ای بر بلاکچین",
  description = "آموزش مفاهیم پایه تکنولوژی بلاکچین و ارزهای دیجیتال",
  imageUrl = "https://images.unsplash.com/photo-1639322537228-f710d846310a",
  price = 100,
  nftRequired = false,
  hasDiscount = false,
  onRegister = () => console.log("Register clicked"),
}: CourseCardProps) => {
  return (
    <Card className="w-[360px] h-[420px] bg-white overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {nftRequired && (
          <div className="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    <Lock className="w-4 h-4 ml-1" />
                    نیاز به NFT
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>برای ثبت‌نام در این دوره نیاز به NFT خاصی دارید</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">{price} TON</span>
          {hasDiscount && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              تخفیف دارندگان TON
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onRegister}>
          ثبت‌نام
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
