"use client";

import { loggedInUserState } from "@/src/recoil";
import React from "react";
import { useRecoilState } from "recoil";
import { UserForm } from "@/src/components/forms";
import { Container } from "@/src/components/layout";

const UserPage = ({ params }: { params: { id: string } }) => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);

  return (
    <Container center extraPadding>
      <div className='flex justify-center items-center flex-col sm:flex-row gap-8 w-full md:w-3/4 xl:w-1/2'>
        {user_token !== null && user_token.user.avatar !== null ? (
          <img
            src={user_token.user.avatar}
            width='256'
            height='256'
            alt='Profile Picture'
          />
        ) : (
          <img
            src='/male_default_avatar.png'
            width='256'
            height='256'
            alt='Default avatar'
          />
        )}
        <UserForm id={params.id} />
      </div>
    </Container>
  );
};

export default UserPage;
