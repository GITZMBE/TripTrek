'use client';

import { useCurrentUser } from '@/src/hooks';
import { ExtendedChat, ExtendedChatNoMessages } from '@/src/models';
import React, { Dispatch, SetStateAction } from 'react'
import Icon from './Icon';

interface IProps {
  chat: ExtendedChatNoMessages;
  currentChat: ExtendedChat | null;
  setCurrentChat: Dispatch<SetStateAction<any>>;
}

export const ChatRecord = ({ chat, currentChat, setCurrentChat }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  return (
    <button className={`w-full flex justify-between gap-2 py-2 px-4 border-b-2 border-b-secondary ${ chat?.id === currentChat?.id ? 'bg-secondary opacity-100': 'bg-transparent opacity-50' } hover:bg-secondary hover:opacity-100 transition`} onClick={() => setCurrentChat(chat)}>
      <p className={`${ chat?.id === currentChat?.id ? 'text-light': 'text-grey' } overflow-hidden text-ellipsis text-nowrap`}>{ chat.title ? chat.title : chat.owner ? `${chat.owner.name}'s chat` : '' }</p>
      { user?.id === chat.ownerId && (
        <Icon icon='verified' size={24} className='w-6 text-verified' />
      )}
    </button>
  )
}

export default ChatRecord;