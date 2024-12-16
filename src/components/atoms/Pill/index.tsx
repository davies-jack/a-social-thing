import React from 'react'

type Props = {
    children: React.ReactNode;
    className?: string;
}

export default function Pill({ children, className }: Props) {
  return (
    <div className={`
        text-xs
        cursor-pointer
        bg-bg-card
        border-2 border-bg-primary rounded-md
        px-2 py-1
        transition-colors duration-75
        hover:bg-bg-primary hover:border-2 hover:border-transparent hover:shadow-md hover:text-headline-text
        ${className}
    `}>
        {children}
    </div>
  )
}