"use client";

import React from "react";

type Props = {
  likeAmount: number;
  hasLiked: boolean;
  toggleLikePost: () => void;
};

export default function LikesButton({
  likeAmount,
  hasLiked,
  toggleLikePost,
}: Props) {
  return (
    <li
      className="hover:text-headline-text cursor-pointer"
      onClick={toggleLikePost}
    >
      {hasLiked ? "unlike" : "like"}{" "}
      <span className="text-headline-text font-bold">{likeAmount}</span>
    </li>
  );
}
