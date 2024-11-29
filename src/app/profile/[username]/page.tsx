import React from 'react'

type Props = {
    params: {
        username: string
    }
}

export default function ProfilePage({ params }: Props) {

  return (
    <div>{params.username}</div>
  )
}