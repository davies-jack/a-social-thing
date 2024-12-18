"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Alert from "../atoms/Alert";
type Props = {
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function CreatePostForm({ onSubmit }: Props) {
  const [post, setPost] = useState("");
  const [noContentError, setNoContentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={(formData) => {
        setIsLoading(true);
        setNoContentError(false);

        if (post.length === 0) {
          setNoContentError(true);
        }

        if (post.length <= 175 && post.length > 0) {
          onSubmit(formData);
          setPost("");
        }
        setIsLoading(false);
      }}
      className="flex flex-col gap-2"
    >
      {noContentError && <Alert type="error">please enter a post.</Alert>}
      {post.length > 175 && <Alert type="error">your post is too long.</Alert>}

      <label
        htmlFor="status"
        className="text-xs text-headline-text font-bold tracking-normal leading-tight"
      >
        what&apos;s on your mind?
      </label>
      <textarea
        name="status"
        id="status"
        placeholder="tell us about your day, your thoughts, your feelings..."
        className="w-full resize-none rounded-sm p-2 text-black text-xs tracking-normal leading-tight"
        onChange={(e) => {
          setNoContentError(false);
          setPost(e.target.value);
        }}
        value={post}
      />
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <Button label="post your status" disabled={isLoading} />
        <p
          className={`
            text-sm text-button-text
            font-bold
            ${post.length > 175 ? "text-red-500" : ""}
          `}
        >
          {post.length} / 175
        </p>
      </div>
    </form>
  );
}
