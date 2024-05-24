'use client';

import { useCurrentUser } from '@/src/hooks';
import { ExtendedChat, ExtendedChatNoMessages } from '@/src/models';
import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import Icon from './Icon';
import { request } from '@/src/utils';
import { Chat } from '@prisma/client';
import { toast } from 'react-toastify';

interface IProps {
  chat: ExtendedChat;
  currentChat: ExtendedChat | null;
  setCurrentChat: Dispatch<SetStateAction<any>>;
}

export const ChatRecord = ({ chat, currentChat, setCurrentChat }: IProps) => {
  const { currentUser: user } = useCurrentUser();

  const deleteChat = async () => {
    const host = window.location.origin;
    const uri = `/api/chats/${chat.id}`;
    const options: RequestInit = {
      method: 'DELETE'
    };
    const res = await request<Chat | { message: string }>(host, uri, options);
    return res;
  }

  const handleDeleteChat = async (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (user?.id !== chat.ownerId) return;

    const deletedChat = await deleteChat();

    if ('message' in deletedChat) {
      toast.error(deletedChat.message);
      return;
    }

    if (deletedChat.id === currentChat?.id) {
      setCurrentChat(null);
    }

    if (Object.keys(deletedChat).length === 0) {
      toast.error('Something went wrong');
    } else {
      toast.success(`Chat ${(deletedChat && deletedChat.title) ? `${deletedChat.title} ` : ''}deleted successfully`);
    }
  };

  return (
    <button className={`w-full flex justify-between gap-2 py-2 px-4 border-b-2 border-b-secondary ${ chat?.id === currentChat?.id ? 'bg-secondary opacity-100': 'bg-transparent opacity-50' } hover:bg-secondary hover:opacity-100 transition`} onClick={() => setCurrentChat(chat)}>
      <p className={`${ chat?.id === currentChat?.id ? 'text-light': 'text-grey' } overflow-hidden text-ellipsis text-nowrap`}>{ chat.title ? chat.title : chat.owner ? `${chat.owner.name}'s chat` : '' }</p>
      { user?.id === chat.ownerId && (
        <span className='flex items-center gap-2'>
          <Icon icon='verified' size={24} className='w-6 text-verified' />
          <Icon icon='bin' size={24} className='w-6 text-cancel hover:text-delete transition' onClick={handleDeleteChat} />
        </span>
      )}
    </button>
  )
}

export default ChatRecord;