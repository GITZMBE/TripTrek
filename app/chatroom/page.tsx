'use client';

import { Container } from '@/src/components/layout'
import { ChatLogs, ChatRecord } from '@/src/components/ui';
import { useCurrentUser } from '@/src/hooks';
import { Chat, Listing, Message, User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Chatroompage = () => {
  const { currentUser: user } = useCurrentUser();
  const [userChats, setUserChats] = useState<Chat[] & { listing: Listing, members: User[], owner: User }[]>([]);

  // query params
  const [listingId, setListingId] = useState<string | null>(null);
  const [chatWith, setChatWith] = useState<string | null>(null);

  const [currentChat, setCurrentChat] = useState<Chat & { listing: Listing, owner: User, members: User[], messages: Message[] } | null>(null);
  const searchParams = useSearchParams();

  const setUsersChats = async () => {
    const res = await fetch(`${window.location.origin}/api/chats?userId=${user?.id}`, { method: 'GET', cache: 'no-cache' });
    const chats: Chat[] & { listing: Listing, members: User[], owner: User }[] = await res.json() || [];
    setUserChats(chats);
  };

  const openChatWithUser = async () => {
    const res = await fetch(`${window.location.origin}/api/chats?userId=${user?.id}&chatToId=${chatWith}&listingId=${listingId}`, { method: 'GET' });
    const chats: Chat[] & { listing: Listing, owner: User, members: User[], messages: Message[] }[] | { message: string } = await res.json();

    if ('message' in chats) {
      console.log(chats.message);
      return;
    }

    if (chats.length <= 0 && user?.id && chatWith && listingId ) {
      const res = await fetch(`${window.location.origin}/api/chats`, { 
        method: 'POST', 
        headers: {'Contend-Type': 'application/json'}, 
        body: JSON.stringify({ 
          userId: user?.id, 
          chatToId: chatWith, 
          listingId: listingId
        })
      });
      const newChat: Chat & { listing: Listing, owner: User, members: User[], messages: Message[] } = await res.json();
      setCurrentChat(newChat);
      return;
    }

    setCurrentChat(chats[0]);
  }

  const setQueryParams = () => {
    const chatToId = searchParams.get('chatToId');
    setChatWith(chatToId);

    const listId = searchParams.get('listingId');
    setListingId(listId);
  };

  useEffect(() => {
    if (!user) return;

    setQueryParams();
    setUsersChats();
    if (chatWith && listingId) {
      openChatWithUser();
    }
  }, [searchParams, user, chatWith, listingId]);

  return (
    <Container extraPadding>
      <div className='w-full flex justify-end min-h-[80vh] lg:max-w-[1200px] bg-primary border-2 border-secondary shadow-secondary shadow-lg'>
        <div className={`${ currentChat ? 'w-0 md:w-1/3' : 'w-full' } flex-grow-1 flex flex-col justify-start overflow-x-hidden transition-size`}>
          { 
            userChats.map((chat) => (
              <ChatRecord key={chat.id} currentChat={currentChat} chat={chat as Chat & { listing: Listing, members: User[], owner: User }} setCurrentChat={setCurrentChat} />
            ))
          }
        </div>
        <div className={`${ currentChat ? 'hidden md:block' : 'hidden' } flex-grow-1 w-[2px] bg-secondary`} />
        <div className={`${ currentChat ? 'w-full md:w-2/3' : 'w-0' } flex-grow-1 overflow-x-hidden transition-size`}>
          <ChatLogs currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </div>
      </div>
    </Container>
  )
}

export default Chatroompage