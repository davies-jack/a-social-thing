"use client";

import { useState } from "react";
type Props = {
  onSubmit: (
    formData: FormData,
  ) => Promise<void>;
};

export default function CreatePostForm({ onSubmit }: Props) {
  const [post, setPost] = useState("");
  const [noContentError, setNoContentError] = useState(false);

  return (
    <form
      action={(formData) => {
        setNoContentError(false);

        if (post.length === 0) {
          setNoContentError(true);
        }

        if (post.length <= 175 && post.length > 0) {
          onSubmit(formData);
          setPost("");
        }
      }}
      className="w-full flex flex-col gap-2 items-start p-6"
    >
      {noContentError && (
        <p className="text-red-500 text-sm m-0 p-0 font-bold">
          please enter a post.
        </p>
      )}
      {post.length > 175 && (
        <p className="text-red-500 text-sm m-0 p-0 font-bold">
          your post is too long. please keep it under 175 characters.
        </p>
      )}
      <textarea
        name="status"
        id="status"
        placeholder="what's on your mind?"
        className="w-full resize-none rounded-md p-2 text-black"
        onChange={(e) => {
          setNoContentError(false);
          setPost(e.target.value);
        }}
        value={post}
      />
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <button
          type="submit"
          className="rounded-md p-2 px-4 text-sm text-button-text bg-bg-button font-bold self-end"
        >
          post your status
        </button>
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
