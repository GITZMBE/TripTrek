'use client';

import { Chat, Listing, Message, User } from '@prisma/client';
import React, { useState } from 'react'
import TextMessage from './TextMessage';
import { useCurrentUser } from '@/src/hooks';
import { useRouter } from 'next/navigation';

interface IProps {
  currentChat: Chat & { listing: Listing, owner: User, members: User[], messages: Message[] } | null;
}

export const ChatLogs = ({ currentChat }: IProps) => {
  const { currentUser: user } = useCurrentUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    const res = await fetch(`${window.location.origin}/api/chats/message`, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: inputValue,
        userId: user?.id,
        chatId: currentChat?.id
      })
    });
    const newChat = await res.json();
    router.refresh();
  }

  return (
    <div className={`${ currentChat ? 'w-2/3' : 'w-0' } flex flex-col flex-grow-1 overflow-x-hidden transition border-l-2 border-secondary`}>
      <div className='w-full flex flex-col flex-grow-1 h-full'>
        { currentChat && (
          <>
            <div className='w-full py-2 px-4 border-b-2 border-b-secondary'>
              <p className='overflow-hidden text-nowrap text-ellipsis text-light'>{ currentChat.title ? currentChat.title : `${ currentChat.owner.name }'s chat${ currentChat.listingId && ` for '${ currentChat.listing.title }'` }` }</p>
            </div>
            <div className='flex flex-col flex-grow-1 justify-end gap-2 min-h-max py-4 px-2 overflow-y-auto'>
              {
                currentChat.messages.map(message => (
                  <TextMessage message={message} />
                ))
              }              
            </div>
          </>
        )}
      </div>
      <div className='flex flex-col w-full'>
        { currentChat?.members.length === 2 && (
          <div className='flex justify-between items-center'>
            <span className='flex gap-2 items-center'>
              <img src={ currentChat.members.filter(u => u.id !== user?.id)[0].avatar || '' } className='w-24 aspect-square rounded-full object-center object-cover' alt="" />
              <span>{ currentChat.members.filter(u => u.id !== user?.id)[0].name }</span>
            </span>
            <span className='flex gap-2 items-center'>
              <img src={ currentChat.members.filter(u => u.id === currentChat.ownerId)[0].avatar || '' } className='w-24 aspect-square rounded-full object-center object-cover' alt="" />
              <span>{ currentChat.members.filter(u => u.id === currentChat.ownerId)[0].name }</span>
            </span>
          </div>
        )}
        <hr className='border-secondary' />
        <div className='bg-primary p-4'>
          <input type="text" className='w-full text-grey py-1 px-2 bg-secondary rounded-full outline-none' placeholder='type...' value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} />
        </div>        
      </div>
    </div>
  )
}

export default ChatLogs;