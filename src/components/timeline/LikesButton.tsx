"use client";

import React from "react";

type Props = {
  likeAmount: number;
  hasLiked: boolean;
  toggleLikePost: () => void;
  className?: string; 
};

export default function LikesButton({
  likeAmount,
  hasLiked,
  toggleLikePost,
  className,
}: Props) {
  return (
    <div
      className={`
        hover:text-headline-text cursor-pointer
        rounded-md bg-bg-card border-2 border-bg-primary px-2 py-1
        transition-colors duration-75
        hover:bg-bg-primary hover:border-2 hover:border-transparent hover:shadow-md
        text-xs
        ${hasLiked && "border-2 border-red-600 hover:border-red-800"}
        ${className}
      `}
      onClick={toggleLikePost}
    >
      {hasLiked ? "unlike" : "like"}{" "}
      <span className="text-headline-text font-bold">{likeAmount}</span>
    </div>
  );
}
