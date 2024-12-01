import React from 'react'

type Props = {
    message: string;
    className?: string;
}

export default function Error({ message, className }: Props) {
  return (
    <div className={`
        bg-red-700 text-white rounded-md py-1 px-2 text-xs lowercase font-bold
        ${className}
    `}>
        {message}!
    </div>
  )
}