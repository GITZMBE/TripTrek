'use client';

import { useCurrentUser } from '@/src/hooks';
import { Chat, Listing, User } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import { MdVerified } from 'react-icons/md';

interface IProps {
  chat: Chat;
  setCurrentChat: Dispatch<SetStateAction<any>>;
}

export const ChatRecord = ({ chat, setCurrentChat }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return (
    <button className='w-full flex justify-between py-2 px-4 border-b-1 border-secondary' onClick={() => setCurrentChat(chat)}>
      {/* <p>{ chat.title ? chat.title : `${chat.ownerId}'s chat${ chat.listingId && ` for ${ chat.listing.title }` }` }</p> */}
      <p>{ chat.title ? chat.title : `${chat.ownerId}'s chat` }</p>
      { user?.id === chat.ownerId && (
        <MdVerified size={24} className='text-verified' />
      )}
    </button>
  )
}

export default ChatRecord;