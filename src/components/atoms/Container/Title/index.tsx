import React from 'react'

type Props = {
  value: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function ContainerTitle({ value, level = "h2" }: Props) {
  const Title = level;
  return (
    <Title className="
      text-base text-headline-text font-bold
      break-words
      leading-4
      mb-2
    ">
      {value}
    </Title>
  );
}