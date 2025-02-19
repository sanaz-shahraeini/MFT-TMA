import React, { useState, useEffect } from "react";
import ChallengeCard from "./ChallengeCard";
import ChallengeSubmissionModal from "./ChallengeSubmissionModal";
import { getChallenges, submitChallenge } from "@/lib/challenges";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ChallengesGrid = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    const { challenges, error } = await getChallenges();
    if (error) {
      console.error("Error loading challenges:", error);
      return;
    }
    setChallenges(challenges || []);
    setLoading(false);
  };

  const handleParticipate = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (challenge) {
      setSelectedChallenge(challenge);
      setIsSubmissionModalOpen(true);
    }
  };

  const handleSubmit = async (content: string) => {
    if (!selectedChallenge) return;

    const { error } = await submitChallenge(selectedChallenge.id, content);
    if (error) {
      console.error("Error submitting challenge:", error);
      return;
    }

    setIsSubmissionModalOpen(false);
    // Optionally refresh challenges or show success message
  };

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="جستجوی چالش‌ها..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="programming">برنامه‌نویسی</SelectItem>
            <SelectItem value="design">طراحی گرافیک</SelectItem>
            <SelectItem value="marketing">دیجیتال مارکتینگ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
            onParticipate={handleParticipate}
          />
        ))}
      </div>

      {selectedChallenge && (
        <ChallengeSubmissionModal
          open={isSubmissionModalOpen}
          onOpenChange={setIsSubmissionModalOpen}
          challenge={selectedChallenge}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ChallengesGrid;
