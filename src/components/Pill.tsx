import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function Pill({ children }: Props) {
  return (
    <div className="hover:text-headline-text cursor-pointer
        rounded-md bg-bg-card border-2 border-bg-primary px-2 py-1
        transition-colors duration-75
        hover:bg-bg-primary hover:border-2 hover:border-transparent hover:shadow-md
        text-xs">
        {children}
    </div>
  )
}