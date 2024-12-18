import React from "react";

type Props = {
  value: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function ContainerTitle({ value, level }: Props) {
  const Title = level;
  return (
    <Title
      className="
      text-xs text-paragraph-text font-medium
      break-words
      leading-tight tracking-normal
      mb-2
    "
    >
      {value}
    </Title>
  );
}
