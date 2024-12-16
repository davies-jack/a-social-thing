"use client";

import React, { useState } from "react";
import Button from "@/components/atoms/Button";

type Props = {
  handleCreateComment: (comment: string) => Promise<void>;
};

export default function CreateCommentForm({ handleCreateComment }: Props) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await handleCreateComment(comment);
    setComment("");
    setIsLoading(false);
  };
  return (
    <div className="mt-4">
      <div>
        <label htmlFor="comment" className="text-headline-text text-sm font-bold text-left">
          add a comment
        </label>
        <textarea
          id="comment"
          className="block resize-none w-full p-2 rounded-md border border-border-secondary"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <Button label="post" className="mt-4 self-end" onClick={handleSubmit} disabled={isLoading} />
    </div>
  );
}
