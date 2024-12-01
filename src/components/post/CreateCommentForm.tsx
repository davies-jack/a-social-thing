"use client";

import React, { useState } from "react";
import Button from "../Button";

type Props = {
  handleCreateComment: (comment: string) => Promise<void>;
};

export default function CreateCommentForm({ handleCreateComment }: Props) {
  const [comment, setComment] = useState("");
  return (
    <form role="form">
      <div className="mt-4 flex flex-col items-center justify-center w-1/2 mx-auto">
        <div>
          <label htmlFor="comment" className="text-headline-text text-sm font-bold text-left">
            add a comment
          </label>
          <textarea id="comment" className="block resize-none w-full h-24 p-2 rounded-md border border-border-secondary" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </div>
        <Button label="post" className="mt-4" onClick={() => handleCreateComment(comment)} />
      </div>
    </form>
  );
}
