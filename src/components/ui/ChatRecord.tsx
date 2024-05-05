'use client';

import { useCurrentUser } from '@/src/hooks';
import { Chat, Listing, Message, User } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import { MdVerified } from 'react-icons/md';

interface IProps {
  chat: Chat & { listing: Listing, members: User[], owner: User };
  currentChat: Chat & { listing: Listing, owner: User, members: User[], messages: Message[] } | null;
  setCurrentChat: Dispatch<SetStateAction<any>>;
}

export const ChatRecord = ({ chat, currentChat, setCurrentChat }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return (
    <button className={`w-full flex justify-between gap-2 py-2 px-4 border-b-2 border-b-secondary ${ chat?.id === currentChat?.id ? 'bg-secondary opacity-100': 'bg-transparent opacity-50' } hover:bg-secondary hover:opacity-100 transition`} onClick={() => setCurrentChat(chat)}>
      <p className='text-grey overflow-hidden text-ellipsis text-nowrap'>{ chat.title ? chat.title : chat.owner ? `${chat.owner.name}'s chat` : '' }</p>
      { user?.id === chat.ownerId && (
        <MdVerified size={24} className='text-verified' />
      )}
    </button>
  )
}

export default ChatRecord;