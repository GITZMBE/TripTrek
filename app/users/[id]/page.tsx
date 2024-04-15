"use client";

import { loggedInUserState } from "@/src/recoil";
import React from "react";
import { useRecoilState } from "recoil";
import bcrypt from "bcrypt";
import Image from "next/image";
import { UserForm } from "@/src/components/forms";

const UserPage = ({ params }: { params: { id: string } }) => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);

  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-primary py-24 px-4 sm-px-8 md-px-12'>
      <div className='flex justify-center items-center flex-col sm:flex-row gap-8 w-full md:w-3/4 xl:w-1/2'>
        {user_token !== null && user_token.user.avatar !== null ? (
          <Image
            src={user_token.user.avatar}
            width='256'
            height='256'
            alt='Profile Picture'
          />
        ) : (
          <Image
            src='/male_default_avatar.png'
            width='256'
            height='256'
            alt='Default avatar'
          />
        )}
        <UserForm id={params.id} />
      </div>
    </main>
  );
};

export default UserPage;
