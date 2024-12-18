import React from "react";
import ContainerTitle from "./Title";

type Props = {
  title?: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  spacing?: {
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
  };

  children: React.ReactNode;
};

export default function Container({ title, titleLevel = "h1", children, spacing }: Props) {
  const { marginTop, marginBottom, marginLeft, marginRight } = spacing || {};
  return (
    <div
      className={`
        bg-bg-card
        rounded-md
        p-4
        shadow-md
        w-full
        
        ${marginTop ? `mt-${marginTop}` : ""}
        ${marginBottom ? `mb-${marginBottom}` : ""}
        ${marginLeft ? `ml-${marginLeft}` : ""}
        ${marginRight ? `mr-${marginRight}` : ""}
    `}
    >
      {title && <ContainerTitle value={title} level={titleLevel} />}
      <div className="text-sm leading-tight tracking-normal text-[#eee]">{children}</div>
    </div>
  );
}
