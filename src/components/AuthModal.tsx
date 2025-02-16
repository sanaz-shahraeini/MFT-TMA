import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (email: string, password: string, isSignUp: boolean) => void;
}

const AuthModal = ({
  open = false,
  onOpenChange = () => {},
  onSubmit = () => {},
}: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, isSignUp);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "ثبت نام" : "ورود"}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "برای ایجاد حساب کاربری فرم زیر را تکمیل کنید"
              : "برای ورود به حساب کاربری خود اطلاعات زیر را وارد کنید"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button type="submit">{isSignUp ? "ثبت نام" : "ورود"}</Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "قبلاً حساب کاربری دارید؟ وارد شوید"
                : "حساب کاربری ندارید؟ ثبت نام کنید"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
