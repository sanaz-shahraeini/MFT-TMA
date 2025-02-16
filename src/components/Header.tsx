import React from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
  onAuth?: () => void;
}

const Header = ({
  isAuthenticated = false,
  onAuth = () => console.log("Auth clicked"),
}: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">پلتفرم آموزشی TON</h1>
      </div>

      <div className="flex items-center space-x-4">
        {!isAuthenticated && (
          <Button onClick={onAuth} className="bg-primary hover:bg-primary/90">
            ورود / ثبت نام
          </Button>
        )}
        {isAuthenticated && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                alt="User avatar"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
