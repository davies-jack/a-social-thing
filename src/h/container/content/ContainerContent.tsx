import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function ContainerContent({ children }: Props) {
  return (
    <div className="flex flex-col gap-2 text-sm text-paragraph-text">
        {children}
    </div>
  )
}