import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  noCursor?: boolean;
  href?: string;
  emphasized?: boolean;
};

export default function VertListItem({
  children,
  isFirst = false,
  isLast = false,
  noCursor = false,
  href,
  emphasized,
}: Props) {
  const HrefLink = href ? Link : "div";

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
        ${emphasized ? "bg-bg-button text-headline-text" : ""}
      `}
    >
      <HrefLink href={href as string}>{children}</HrefLink>
    </li>
  );
}
