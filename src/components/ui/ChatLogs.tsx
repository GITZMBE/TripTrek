'use client';

import { Chat, Listing, Message, User } from '@prisma/client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TextMessage from './TextMessage';
import { useCurrentUser } from '@/src/hooks';
import { useRouter } from 'next/navigation';
import { MdEdit, MdKeyboardArrowRight } from 'react-icons/md';
import { FaAngleDoubleRight, FaUserCircle } from 'react-icons/fa';

interface IProps {
  currentChat: Chat & { listing: Listing, owner: User, members: User[], messages: Message[] } | null;
  setCurrentChat: Dispatch<SetStateAction<any>>;
}

export const ChatLogs = ({ currentChat, setCurrentChat }: IProps) => {
  const { currentUser: user } = useCurrentUser();
  const router = useRouter();
  const [textInputValue, setTextInputValue] = useState('');
  const [titleInputValue, setTitleInputValue] = useState( currentChat?.title ? currentChat?.title : (currentChat?.owner && currentChat.listing) ? `${ currentChat?.owner.name }'s chat${ currentChat?.listingId && ` for '${ currentChat?.listing.title }'` }` : '' );
  const [editTitle, setEditTitle] = useState(false);

  const getChat = async () => {
    if(!currentChat) return;
    const res = await fetch(`${window.location.origin}/api/chats/${currentChat?.id}`, {
      method: "GET",
    });
    const chat = await res.json();
    return chat;
  };

  const handleSendMessage = async () => {
    const res = await fetch(`${window.location.origin}/api/chats/message`, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: textInputValue,
        userId: user?.id,
        chatId: currentChat?.id
      })
    });
    const newMessage = await res.json();
    const chat = await getChat();
    setCurrentChat(chat);
    setTextInputValue('');
    router.refresh();
  }

  const updateChatTitle = async () => {
    if (!currentChat || !currentChat.id) return;
    const res = await fetch(`${window.location.origin}/api/chats/${currentChat.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: titleInputValue === '' ? null : titleInputValue
      })
    });
    const newChat = await res.json() || currentChat;

    if ('message' in newChat) return;
    
    setCurrentChat(newChat);
    setTitleInputValue(newChat.title);
    router.refresh();
  };

  const handleBlurEditTitleInput = () => {
    updateChatTitle();
    setEditTitle(false);
  };

  const handleOpenTitle = () => {
    setEditTitle(true);
    setTitleInputValue(currentChat?.title || '');
  };

  return (
    <div className={`${currentChat ? 'w-full md:w-2/3' : 'w-0'} h-full overflow-x-hidden transition-size`}>
      <div className={`w-full xl:w-[800px] h-full flex flex-col`}>
        {currentChat && (
          <>
            <div className='flex items-center w-full border-b-2 border-b-secondary'>
              <FaAngleDoubleRight size={40} className='text-secondary hover:text-grey p-2 cursor-pointer' onClick={() => setCurrentChat(null)} />
              <div className='group flex items-center gap-2 w-full'>
                {editTitle ? (
                  <div className='w-full h-full py-2'>
                    <input type="text" autoFocus className='w-full py-1 px-2 outline-none' value={titleInputValue} onChange={e => setTitleInputValue(e.target.value)} onBlur={handleBlurEditTitleInput} />
                  </div>
                ) : (
                  <p className='flex items-center gap-2 w-full overflow-hidden text-nowrap text-ellipsis text-light font-semibold py-2'>
                    {currentChat.title ? currentChat.title : currentChat?.owner ? `${currentChat.owner.name}'s chat${currentChat.listing && ` for '${currentChat.listing.title}'`}` : ''}
                    <span>
                      { currentChat.members && currentChat.members.map(member => member?.avatar ? (
                        <img src={member.avatar} className='w-10 aspect-square rounded-full object-center object-cover' alt="" />
                      ) : (
                        <FaUserCircle size={40} className='text-grey' />
                      ))}
                    </span>
                  </p>
                )}
                <div className='h-10 aspect-square'>
                  <MdEdit size={40} className='lg:hidden lg:group-hover:block h-full aspect-square text-secondary focus:text-grey lg:hover:text-grey p-2 cursor-pointer' onClick={handleOpenTitle} />
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-end gap-2 p-2 flex-grow overflow-y-auto scrollbar-hidden'>
              {currentChat.messages && currentChat.messages.map(message => (
                <TextMessage key={message.id} message={message} />
              ))}
            </div>
          </>
        )}
        <div className='flex flex-col'>
          {(currentChat?.members && currentChat?.members.length === 2) && (
            <div className='flex justify-between items-center'>
              <span className='flex gap-2 items-center'>
                <img src={currentChat.members.filter(u => u.id !== user?.id)[0].avatar || ''} className='w-24 aspect-square rounded-full object-center object-cover' alt="" />
                <span>{currentChat.members.filter(u => u.id !== user?.id)[0].name}</span>
              </span>
              <span className='flex gap-2 items-center'>
                <img src={currentChat.members.filter(u => u.id === currentChat.ownerId)[0].avatar || ''} className='w-24 aspect-square rounded-full object-center object-cover' alt="" />
                <span>{currentChat.members.filter(u => u.id === currentChat.ownerId)[0].name}</span>
              </span>
            </div>
          )}
          <hr className='border-secondary' />
          <div className='bg-primary p-4'>
            <input type="text" className='w-full text-light placeholder:text-grey py-1 px-2 bg-secondary rounded-full outline-none' placeholder='type...' value={textInputValue} onChange={e => setTextInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default ChatLogs;