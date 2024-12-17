import React from "react";
import VertListItem from "./VertListItem";

interface VerttListItem {
  itemContent: React.ReactNode;
  noCursor?: boolean;
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
      {items.map(({ itemContent, noCursor }, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <VertListItem key={index} isFirst={isFirst} isLast={isLast} noCursor={noCursor}>
            {itemContent}
          </VertListItem>
        );
      })}
    </ul>
  );
}
