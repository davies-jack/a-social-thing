"use client";

import React from "react";

type Props = {
  likeAmount: number;
  hasLiked: boolean;
  toggleLikePost: () => void;
  className?: string;
};

export default function LikesButton({ likeAmount, hasLiked, toggleLikePost, className }: Props) {
  return (
    <div
      className={`
        hover:text-headline-text cursor-pointer
        rounded-md bg-bg-card border-2 border-bg-primary px-2 py-1
        transition-colors duration-75
        hover:bg-bg-primary hover:border-2 hover:border-transparent hover:shadow-md
        text-xs
        flex flex-row gap-2 items-center
        ${className}
      `}
      onClick={toggleLikePost}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill={hasLiked ? "red" : "white"}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div>
        {hasLiked ? "unlike" : "like"}{" "}
        <span className="text-headline-text font-bold">{likeAmount}</span>
      </div>
    </div>
  );
}
