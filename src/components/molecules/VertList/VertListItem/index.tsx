import React from "react";

type Props = {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  noCursor?: boolean;
};

export default function VertListItem({
  children,
  isFirst = false,
  isLast = false,
  noCursor = false,
}: Props) {
  return (
    <li
      className={`
        w-full
        border-b border-[#121212]
        bg-bg-card
        hover:bg-[#121212] hover:text-headline-text
        py-3 px-4
        ${isFirst ? "rounded-t-lg" : ""}
        ${isLast ? "border-b-0 rounded-b-lg" : ""}
        ${noCursor ? "cursor-default" : "cursor-pointer"}
      `}
    >
      {children}
    </li>
  );
}
