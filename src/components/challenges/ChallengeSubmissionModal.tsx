import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface ChallengeSubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: {
    id: string;
    title: string;
    submissionType: "code" | "file" | "text";
  };
  onSubmit: (content: string) => Promise<void>;
}

const ChallengeSubmissionModal = ({
  open,
  onOpenChange,
  challenge,
  onSubmit,
}: ChallengeSubmissionModalProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(content);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>ارسال پاسخ چالش</DialogTitle>
          <DialogDescription>{challenge.title}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {challenge.submissionType === "text" && (
            <Textarea
              placeholder="پاسخ خود را اینجا وارد کنید..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          )}

          {challenge.submissionType === "code" && (
            <Textarea
              placeholder="کد خود را اینجا وارد کنید..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono"
              required
            />
          )}

          {challenge.submissionType === "file" && (
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // TODO: Handle file upload
                  setContent(file.name);
                }
              }}
              required
            />
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "در حال ارسال..." : "ارسال پاسخ"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeSubmissionModal;
