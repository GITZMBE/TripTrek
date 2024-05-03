'use client';

import { Container } from '@/src/components/layout'
import { ChatLogs, ChatRecord } from '@/src/components/ui';
import { useCurrentUser } from '@/src/hooks';
import { Chat, Listing, Message, User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Chatroompage = () => {
  const { currentUser: user } = useCurrentUser();
  const [userChats, setUserChats] = useState<Chat[] & { listing: Listing, members: User[] }[]>([]);

  // query params
  const [listingId, setListingId] = useState<string | null>(null);
  const [chatWith, setChatWith] = useState<string | null>(null);

  const [currentChat, setCurrentChat] = useState<Chat & { listing: Listing, owner: User, members: User[], messages: Message[] } | null>(null);
  const searchParams = useSearchParams();

  const setUsersChats = async () => {
    const res = await fetch(`${window.location.origin}/api/chats?userId=${user?.id}`, { method: 'GET' });
    const chats: Chat[] & { listing: Listing, members: User[] }[] = await res.json() || [];
    console.log(chats)
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
    const chatWithUserId = searchParams.get('chatWithUserId');
    setChatWith(chatWithUserId);

    const listId = searchParams.get('listingId');
    setListingId(listId);
  };

  useEffect(() => {
    if (!user) return;

    setQueryParams();
    openChatWithUser();
  }, [searchParams, user, chatWith, listingId]);

  return (
    <Container extraPadding>
      <div className='w-full flex min-h-[80vh] max-w-[1200px] bg-primary border-2 border-secondary shadow-secondary shadow-lg'>
        <div className='w-full flex-grow-1 flex flex-col justify-start'>
          { userChats.length > 0 && (
            userChats.map((chat) => (
              <ChatRecord chat={chat} setCurrentChat={setCurrentChat} />
            ))
          )}
        </div>
        <ChatLogs currentChat={currentChat} />
      </div>
    </Container>
  )
}

export default Chatroompage