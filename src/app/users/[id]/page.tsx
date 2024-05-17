"use client";

import React, { useEffect, useState } from "react";
import { UserForm } from "@/src/components/forms";
import { Container } from "@/src/components/layout";
import { useCurrentUser, useLoading } from "@/src/hooks";
import { User } from "@prisma/client";
import { TfiReload } from "react-icons/tfi";
import { MdOutlineChatBubble } from "react-icons/md";
import { useRouter } from "next/navigation";
import { LoadingAnimation } from "@/src/components/ui";
import { request } from "@/src/utils";
import Image3D from "@/src/components/ui/Image3D";

const UserPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const [paramUser, setParamUser] = useState<User | null>(null);
  const {isLoading, setIsLoading} = useLoading(true);

  const getParamUser = async () => {
    const host = window.location.origin;
    const uri = `/api/users/${params.id}`;
    const options: RequestInit = { method: 'GET' };
    const u = await request<User | { message: string }>(host, uri, options);

    if ('message' in u) return;

    return u;
  };

  const handleReload = () => {
    try {
      setIsLoading(true);
      getParamUser();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id === params.id) return;

    try {
      setIsLoading(true);
      getParamUser().then(u => u && setParamUser(u));
    } finally {
      setIsLoading(false);
    }
  }, [params])

  return (
    <Container center extraPadding>
      <div className='flex justify-center items-center flex-col sm:flex-row gap-8 w-full md:w-3/4 xl:w-1/2'>
        { user?.id === params.id ? (
          <UserForm />
        ) : ( isLoading ? (
          <LoadingAnimation className="w-64 aspect-square" />
        ) : paramUser ? (
          <div className="w-full flex gap-8">
            <Image3D src={paramUser?.avatar || '/male_default_avatar.png'} />
            <div className='w-full h-full flex flex-col items-center gap-4'>
              <div className="w-full flex justify-end">
                <TfiReload onClick={handleReload} size={24} className={`text-grey cursor-pointer ${ isLoading && 'animate-spin' }`} />
              </div>
              <p className='w-full text-grey'>Name: {paramUser?.name}</p>
              <p className='w-full text-grey mb-2'>Email: {paramUser?.email}</p>
              <button className="group flex items-center gap-2 text-grey hover:text-light hover:bg-grey py-2 px-4 rounded-lg border-2 border-grey" onClick={() => router.push(`/chatroom?chatToId=${paramUser?.id}`)}>Create / Open chat<MdOutlineChatBubble size={24} className='text-grey group-hover:text-light cursor-pointer' /></button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <h2 className="leading-[80px] text-center font-bold text-grey text-6xl">User with id '{ params.id }' doesn't exist</h2>
            <button onClick={() => router.back()} className="text-xl text-grey hover:text-light">Go back</button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserPage;
