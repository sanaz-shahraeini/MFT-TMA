import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Lock, Wallet, CheckCircle2, BookOpen } from "lucide-react";
import { registerForCourse } from "@/lib/courses";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CourseDetailModalProps {
  isAuthenticated?: boolean;
  onAuth?: () => void;
  courseId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  price?: number;
  curriculum?: Array<{ title: string; duration: string }>;
  nftRequired?: boolean;
  hasDiscount?: boolean;
  onRegister?: () => void;
}

const CourseDetailModal = ({
  courseId = "1",
  open = true,
  onOpenChange = () => {},
  title = "مقدمه‌ای بر تکنولوژی بلاکچین",
  description = "یک دوره جامع که مفاهیم پایه تکنولوژی بلاکچین، ارزهای دیجیتال و برنامه‌های غیرمتمرکز را پوشش می‌دهد. مناسب برای مبتدیانی که می‌خواهند وارد دنیای وب۳ شوند.",
  price = 100,
  curriculum = [
    { title: "مبانی بلاکچین", duration: "۲ ساعت" },
    { title: "اصول رمزنگاری", duration: "۱.۵ ساعت" },
    { title: "قراردادهای هوشمند", duration: "۳ ساعت" },
    { title: "اصول دیفای", duration: "۲.۵ ساعت" },
  ],
  nftRequired = false,
  hasDiscount = false,
  isAuthenticated = false,
  onAuth = () => {},
  onRegister = async () => {
    if (!isAuthenticated) {
      onAuth();
      return;
    }

    try {
      const { registration, error } = await registerForCourse(courseId);
      if (error) throw error;
      toast({
        title: "ثبت‌نام موفق",
        description: "شما با موفقیت در دوره ثبت‌نام کردید",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error registering for course:", error);
      toast({
        title: "خطا در ثبت‌نام",
        description: "مشکلی در ثبت‌نام پیش آمده است. لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  },
}: CourseDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] max-h-[800px] bg-white overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <div className="flex gap-2">
              {nftRequired && (
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <Lock className="w-4 h-4 ml-1" />
                  NFT Required
                </Badge>
              )}
              {hasDiscount && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  TON Holder Discount
                </Badge>
              )}
            </div>
          </div>
          <DialogDescription className="mt-2 text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow mt-6 pl-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                سرفصل‌های دوره
              </h3>
              <div className="mt-4 space-y-3">
                {curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{item.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold">اطلاعات پرداخت</h3>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-lg">{price} TON</span>
                  {hasDiscount && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      ۲۰٪ تخفیف برای دارندگان TON
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            انصراف
          </Button>
          <Button onClick={onRegister}>ثبت‌نام</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
