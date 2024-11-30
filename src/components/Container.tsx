import React from 'react'

type Props = {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="
        bg-bg-secondary
        rounded-md
        p-4
    ">
      {children}
    </div>
  )
}