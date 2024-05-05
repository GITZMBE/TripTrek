'use client';

import { useCurrentUser } from '@/src/hooks';
import { Message } from '@prisma/client'
import React from 'react'

interface IProps {
  message: Message;
}

const TextMessage = ({ message }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return user && (
    <div className={`w-full flex ${ message.userId === user?.id ? 'justify-end' : 'justify-start' }`}>
      <p className='max-w-[60%] text-grey text-wrap text-left bg-secondary p-2 rounded-lg'>{ message.text }</p>
    </div>
  )
}

export default TextMessage;