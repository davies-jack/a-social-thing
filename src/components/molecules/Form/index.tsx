import React from 'react'

type Props = {
  children: React.ReactNode;
};

export default function Form({ children }: Props) {
  return <form className='flex flex-col gap-4'>
    {children}
    </form>;
}