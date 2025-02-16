import React, { useState } from "react";
import AuthModal from "./AuthModal";
import { signInWithEmail, signUpWithEmail } from "@/lib/auth";
import ChallengesGrid from "./ChallengesGrid";
import UserProfile from "./UserProfile";
import Header from "./Header";
import CourseGrid from "./CourseGrid";
import CourseDetailModal from "./CourseDetailModal";
import BottomNavigation from "./BottomNavigation";

interface HomeProps {
  isAuthenticated?: boolean;
  onAuth?: () => void;
  userProfile?: any;
}

const Home = ({
  isAuthenticated = false,
  onAuth = () => console.log("Auth clicked"),
  userProfile = null,
}: HomeProps) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("catalog");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthSubmit = async (
    email: string,
    password: string,
    isSignUp: boolean,
  ) => {
    const { data, error } = isSignUp
      ? await signUpWithEmail(email, password)
      : await signInWithEmail(email, password);

    if (error) {
      console.error("Auth error:", error);
      return;
    }

    setIsAuthModalOpen(false);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isAuthenticated={isAuthenticated}
        onAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main content area with padding for header and bottom navigation */}
      <main className="pt-16 pb-16 min-h-screen">
        {activeTab === "catalog" && (
          <CourseGrid onCourseSelect={handleCourseSelect} />
        )}
        {activeTab === "challenges" && <ChallengesGrid />}
        {activeTab === "profile" && <UserProfile user={userProfile} />}
      </main>

      <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onSubmit={handleAuthSubmit}
      />

      {/* Course Detail Modal */}
      <CourseDetailModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onRegister={() => {
          if (!isAuthenticated) {
            onAuth();
          } else {
            console.log("Process registration for course:", selectedCourseId);
          }
        }}
      />

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};

export default Home;
