'use client';

import { Container } from '@/src/components/layout'
import { ChatLogs, ChatRecord, ChatSearcher, LoadingAnimation } from '@/src/components/ui';
import { useCurrentUser, useLoading } from '@/src/hooks';
import { ExtendedChat } from '@/src/models';
import { ProtectedRoute, request } from '@/src/utils';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Chatroompage = () => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const [userChats, setUserChats] = useState<ExtendedChat[]>([]);
  const { isLoading, setIsLoading } = useLoading(true);
  const [createFormOpen, setCreateFormOpen] = useState(false);

  // query params
  const [listingId, setListingId] = useState<string | null>(null);
  const [chatWith, setChatWith] = useState<string | null>(null);

  const [currentChat, setCurrentChat] = useState<ExtendedChat | null>(null);
  const searchParams = useSearchParams();

  const host = window.location.origin;

  const getUsersChats = async () => {
    const uri = `/api/chats`;
    const options: RequestInit = { 
      method: 'GET', 
      cache: 'no-cache' 
    };
    const chats = await request<ExtendedChat[]>(host, uri, options) || [];
    return chats;
  };

  const openChatWithUser = async () => {
    let chats: ExtendedChat[] | { message: string } = [];

    if (chatWith && listingId) {
      const uri = `/api/chats?userId=${user?.id}&chatToId=${chatWith}&listingId=${listingId}`;
      const options: RequestInit = { 
        method: 'GET' 
      };
      chats = await request<ExtendedChat[] | { message: string }>(host, uri, options);
    } else if (chatWith) {
      const uri = `/api/chats?userId=${user?.id}&chatToId=${chatWith}`;
      const options: RequestInit = { 
        method: 'GET' 
      };
      chats = await request<ExtendedChat[] | { message: string }>(host, uri, options);
    }

    if ('message' in chats) {
      toast.info('No chat found');
      router.push('/chatroom');
      return;
    };

    if (chats.length === 0 && user?.id ) {
      let newChat: ExtendedChat | { message: string } | null = null;

      const uri = '/api/chats';
      
      let body: any = {};
      if (user?.id) {
        body.userId = user.id;
      }
      if (chatWith) {
        body.chatToId = chatWith;
      }
      if (listingId) {
        body.listingId = listingId;
      }
      const options: RequestInit = { 
        method: 'POST', 
        headers: {'Contend-Type': 'application/json'}, 
        body: JSON.stringify(body)
      };
      newChat = await request<ExtendedChat | { message: string }>(host, uri, options);

      if (newChat === null || 'message' in newChat) {
        toast.error('Something went wrong, while trying to create a new chat');
        router.push('/chatroom');
        return;
      };

      setCurrentChat(newChat);
      toast.success(`Chat with user ${ newChat.members.filter(m => m.memberId === chatWith)[0].member.name } created`);
      router.push('/chatroom');
      return;
    }

    setCurrentChat(chats[0]);
    toast.success(`Chat${ chats.length > 1 ? 's' : '' } with user ${ chats[0].members.filter(m => m.memberId === chatWith)[0].member.name } found and opened ${ chats.length > 1 ? 'first chat ' : '' }successfully`)
    router.push('/chatroom');
  }

  const getQueryParams = () => {
    const chatToId = searchParams.get('chatToId');
    setChatWith(chatToId);

    const listId = searchParams.get('listingId');
    setListingId(listId);
  };

  useEffect(() => {
    if (!user) return;

    try {
      setIsLoading(true);
      getQueryParams();
      getUsersChats().then(setUserChats);
      if (chatWith || (chatWith && listingId)) {
        openChatWithUser();
      }
    } catch(error) {} finally {
      if (userChats) {
        setIsLoading(false);
      }
    }
  }, [searchParams, user, chatWith, listingId, currentChat]);

  return (
    <ProtectedRoute>
      <Container extraPadding>
        <div className='w-full flex justify-end h-[75vh] lg:max-w-[1200px] bg-primary border-2 border-secondary shadow-secondary shadow-lg'>
          <div className={`${ currentChat ? 'w-0 md:w-1/3' : 'w-full' } flex-grow-1 flex flex-col items-center justify-start transition-size overflow-hidden`}>
            <div className='flex w-full p-4 bg-secondary shadow-lg'>
              <h2 className='text-xl text-light'>Your Chats</h2>
            </div>
            { isLoading ? (
                <LoadingAnimation className='w-32 aspect-square' />
              ) : createFormOpen ? (
                <div className='w-full flex flex-col items-center'>
                  <div className='w-full flex items-center gap-4 p-4'>
                    <FaAngleDoubleLeft 
                      size={24} 
                      className='text-grey hover:text-light transition cursor-pointer'
                      onClick={() => setCreateFormOpen(false)}
                    />
                    <h2 className='w-full text-xl text-light'>Choose a User to chat with</h2>
                  </div>
                  <ChatSearcher setChatWith={setChatWith} />
                  <button 
                    className='py-2 px-4 my-4 font-bold text-center text-grey rounded-lg border-2 border-grey hover:bg-grey hover:text-light transition' 
                    onClick={() => {
                      setCreateFormOpen(false);
                    }}
                  >Create Chat</button>
                </div>
              ) : userChats.length > 0 ? (
                <>
                  { userChats.map((chat) => (
                    <ChatRecord key={chat.id} currentChat={currentChat} chat={chat} setCurrentChat={setCurrentChat} />
                  ))}
                  <button className='py-2 px-4 my-4 font-bold text-center text-grey rounded-lg border-2 border-grey hover:bg-grey hover:text-light transition' onClick={() => setCreateFormOpen(true)}>Create new chat</button>
                </>
              ) : (
                <div className='flex flex-col items-center py-8 gap-4'>
                  <p className='text-light text-2xl text-center'>No chats found</p>
                  <button className='py-2 px-4 font-bold text-center text-grey rounded-lg border-2 border-grey hover:bg-grey hover:text-light transition' onClick={() => setCreateFormOpen(true)}>Create new chat</button>
                </div>
              )
            }
          </div>
          <div className={`${ currentChat ? 'hidden md:block' : 'hidden' } flex-grow-1 w-[2px] bg-secondary`} />
          <ChatLogs currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </div>
      </Container>
    </ProtectedRoute>
  )
}

export default Chatroompage