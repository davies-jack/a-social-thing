import React from 'react'

type Props = {
    label: string;
    className?: string;
    disabled?: boolean;
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

export default function Button({ label, className, disabled, onClick }: Props) {
  return (
    <button
        type="submit"
        className={`
            self-end
            px-4 py-2
            border-2 border-bg-button rounded-sm
            text-sm text-headline-text font-bold
            tracking-wide
            transition-colors duration-75
            hover:bg-bg-button hover:border-2 hover:border-transparent hover:shadow-md
            ${className}
            disabled:opacity-50 disabled:cursor-not-allowed
        `}
        disabled={disabled}
        onClick={onClick}
    >
        {disabled ? "loading..." : label}
    </button>
  )
}