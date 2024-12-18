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
        ${large ? "text-sm" : "text-xs"} text-paragraph-text
        ${large ? "border-l-4 border-transparent" : ""}
        ${large ? "px-4 py-2" : "px-3 py-1"}
        ${large ? "hover:border-l-4 hover:border-bg-button" : ""}
        ${darker ? "" : "hover:bg-[#080808]"}

        ${classNames}
    `}
    >
      {children}
    </div>
  );
}
