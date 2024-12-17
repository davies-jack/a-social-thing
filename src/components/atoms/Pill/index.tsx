import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className }: Props) {
  return (
    <div
      className={`
        text-xs text-paragraph-text
        cursor-pointer
        bg-[#080808]
        border-2 border-bg-primary rounded-md
        px-3 py-1
        transition-colors duration-75
        hover:bg-bg-primary hover:border-2 hover:border-transparent hover:shadow-md hover:text-headline-text
        ${className}
    `}
    >
      {children}
    </div>
  );
}
