import React from 'react'

type Props = {
    label: string;
    className?: string;
}

export default function Button({ label, className }: Props) {
  return (
    <button
        type="submit"
        className={`
            self-end
            px-4 py-1
            border-2 border-bg-button rounded-sm
            text-sm text-headline-text font-bold
            tracking-wide
            transition-colors duration-75
            hover:bg-bg-button hover:border-2 hover:border-transparent hover:shadow-md
            ${className}
        `}
    >
        {label}
    </button>
  )
}