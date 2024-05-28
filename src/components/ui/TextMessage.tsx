'use client';

import { useCurrentUser } from '@/src/hooks';
import { ExtendedMessage } from '@/src/models/ExtendedMessage';
import { format, formatDistance } from 'date-fns';
import React from 'react'

interface IProps {
  message: ExtendedMessage;
}

const TextMessage = ({ message }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return user && (
    <div className={`group w-full flex flex-col gap-1 ${ message.userId === user?.id ? 'items-end' : 'items-start' }`}>
      <p className='sibling-hover max-w-[60%] text-light text-wrap text-left bg-secondary p-2 rounded-lg'>{ message.text }</p>
      <p className='sibling max-w-[60%] text-grey text-no-wrap text-right text-sm h-0 opacity-0 transition-size'>
        { formatDistance(message.createdAt, new Date(), { addSuffix: true }) }
      </p>
    </div>
  )
}

export default TextMessage;