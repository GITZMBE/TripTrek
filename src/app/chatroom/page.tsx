'use client';

import { Container } from '@/src/components/layout'
import { ChatLogs, ChatRecord, LoadingAnimation } from '@/src/components/ui';
import { useCurrentUser, useLoading } from '@/src/hooks';
import { Chat, Listing, Message, User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Chatroompage = () => {
  const { currentUser: user } = useCurrentUser();
  const [userChats, setUserChats] = useState<Chat[] & { listing: Listing, members: User[], owner: User }[]>([]);
  const { isLoading, setIsLoading } = useLoading(true);

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
    let res;
    let chats: Chat[] & { listing: Listing, owner: User, members: User[], messages: Message[] }[] | { message: string } = [];

    if (chatWith && listingId) {
      res = await fetch(`${window.location.origin}/api/chats?userId=${user?.id}&chatToId=${chatWith}&listingId=${listingId}`, { method: 'GET' });
      chats = await res.json();
    } else if (chatWith) {
      res = await fetch(`${window.location.origin}/api/chats?userId=${user?.id}&chatToId=${chatWith}`, { method: 'GET' });
      chats = await res.json();
    }

    if ('message' in chats) return;

    if (chats.length === 0 && user?.id ) {
      let res: Response | undefined = undefined;
      let newChat: Chat & { listing: Listing, owner: User, members: User[], messages: Message[] };

      if (chatWith && listingId) {
        res = await fetch(`${window.location.origin}/api/chats`, { 
          method: 'POST', 
          headers: {'Contend-Type': 'application/json'}, 
          body: JSON.stringify({ 
            userId: user?.id, 
            chatToId: chatWith, 
            listingId: listingId
          })
        });
      } else if (chatWith) {
        res = await fetch(`${window.location.origin}/api/chats`, { 
          method: 'POST', 
          headers: {'Contend-Type': 'application/json'}, 
          body: JSON.stringify({ 
            userId: user?.id, 
            chatToId: chatWith
          })
        });
      }
      
      if (!res) return;
      newChat = await res.json();
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

    try {
      setIsLoading(true);
      setQueryParams();
      setUsersChats();
      if (chatWith || (chatWith && listingId)) {
        openChatWithUser();
      }
    } catch(error) {} finally {
      if (userChats) {
        setIsLoading(false);
      }
    }
  }, [searchParams, user, chatWith, listingId]);

  return (
    <Container extraPadding>
      <div className='w-full flex justify-end h-[80vh] lg:max-w-[1200px] bg-primary border-2 border-secondary shadow-secondary shadow-lg'>
        <div className={`${ currentChat ? 'w-0 md:w-1/3' : 'w-full' } flex-grow-1 flex flex-col items-center justify-start transition-size`}>
          { isLoading ? (
              <LoadingAnimation className='w-32 aspect-square' />
            ) : userChats.length > 0 ? (
              userChats.map((chat) => (
                <ChatRecord key={chat.id} currentChat={currentChat} chat={chat as Chat & { listing: Listing, members: User[], owner: User }} setCurrentChat={setCurrentChat} />
              ))
            ) : (
              <div className='flex flex-col items-center py-8 gap-2'>
                <p className='text-light text-xl text-center'>No chats found</p>
                <button className='py-2 px-4 font-bold text-center text-grey rounded-lg border-2 border-grey hover:bg-grey hover:text-light transition' onClick={() => {}}>Create new chat</button>
              </div>
            )
          }
        </div>
        <div className={`${ currentChat ? 'hidden md:block' : 'hidden' } flex-grow-1 w-[2px] bg-secondary`} />
        <ChatLogs currentChat={currentChat} setCurrentChat={setCurrentChat} />
      </div>
    </Container>
  )
}

export default Chatroompage