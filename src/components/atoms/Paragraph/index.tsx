import React from "react";

type Props = {
  children: React.ReactNode;
  light?: boolean;
  smaller?: boolean;
};

export default function Paragraph({ children, light, smaller }: Props) {
  return (
    <p
      className={`
        whitespace-pre-wrap break-words
        tracking-normal leading-tight
        ${!light ? "text-paragraph-text" : "text-headline-text"}
        ${smaller ? "text-xs" : "text-sm"}
    `}
    >
      {children}
    </p>
  );
}
