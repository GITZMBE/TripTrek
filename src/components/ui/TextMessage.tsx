'use client';

import { useCurrentUser } from '@/src/hooks';
import { Message } from '@prisma/client'
import React from 'react'

interface IProps {
  message: Message;
}

const TextMessage = ({ message }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return (
    <div className={`w-full text-grey text-wrap ${ message.userId === user?.id ? 'text-end' : 'text-start' }`}>{ message.text }</div>
  )
}

export default TextMessage