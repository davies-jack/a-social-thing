import React from "react";
import VertListItem from "./VertListItem";

interface VerttListItem {
  itemContent: React.ReactNode;
  noCursor?: boolean;
  href?: string;
  emphasized?: boolean;
}

type Props = {
  items: VerttListItem[];
};

export default function VertList({ items }: Props) {
  if (!items.length) throw new Error("VertList must have at least one item");

  return (
    <ul
      className="
        w-full
        flex flex-col
        rounded-lg
      "
    >
      {items.map(({ itemContent, noCursor, href, emphasized }: VerttListItem, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <VertListItem
            key={index}
            isFirst={isFirst}
            isLast={isLast}
            noCursor={noCursor}
            href={href}
            emphasized={emphasized}
          >
            {itemContent}
          </VertListItem>
        );
      })}
    </ul>
  );
}
