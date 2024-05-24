'use client';

import { useCurrentUser } from '@/src/hooks';
import { ExtendedMessage } from '@/src/models/ExtendedMessage';
import React from 'react'

interface IProps {
  message: ExtendedMessage;
}

const TextMessage = ({ message }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return user && (
    <div className={`group w-full flex flex-col gap-1 ${ message.userId === user?.id ? 'items-end' : 'items-start' }`}>
      <p className='max-w-[60%] text-light text-wrap text-left bg-secondary p-2 rounded-lg'>{ message.text }</p>
      <p className='max-w-[60%] text-grey text-no-wrap text-right text-sm opacity-0 group-hover:opacity-100 transition'>{ message.userId === user?.id ? 'You' : message.user.name }</p>
    </div>
  )
}

export default TextMessage;