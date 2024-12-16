import React from 'react'

type Props = {
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: React.ReactNode;
}

export default function ContainerHeader({ level = 'h1', children }: Props) {
    const Tag = level;
  return (
    <Tag className="text-headline-text text-xs font-bold flex flex-row gap-2 uppercase tracking-wider">
        {children}
    </Tag>
  )
}