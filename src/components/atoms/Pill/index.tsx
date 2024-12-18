import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  large?: boolean;
  darker?: boolean;
};

export default function Pill({ children, className, onClick, large, darker }: Props) {
  const classNames = className ? className : "";
  const largeClassNames =
    "text-sm border-l-4 bx-4 py-2 hover:border-l-4 border-transparent hover:border-bg-button";
  const smallerClassNames = "text-xs px-3 py-1 hover:bg-[#080808]";
  return (
    <div
      onClick={onClick}
      className={`
        ${darker ? "bg-[#080808]" : "bg-bg-card"}
        cursor-pointer
        rounded-sm
        transition-colors duration-75
        hover:text-headline-text
        hover:shadow-lg
        tracking-normal leading-tight
        text-paragraph-text
        ${large ? largeClassNames : smallerClassNames}
        ${darker ? "" : "hover:bg-[#080808]"}

        ${classNames}
    `}
    >
      {children}
    </div>
  );
}
