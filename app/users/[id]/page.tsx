"use client";

import React from "react";
import { UserForm } from "@/src/components/forms";
import { Container } from "@/src/components/layout";
import { useCurrentUser } from "@/src/hooks";

const UserPage = ({ params }: { params: { id: string } }) => {
  const { currentUser: user } = useCurrentUser();

  return (
    <Container center extraPadding>
      <div className='flex justify-center items-center flex-col sm:flex-row gap-8 w-full md:w-3/4 xl:w-1/2'>
        {user !== null && user.avatar !== null ? (
          <img
            src={user.avatar}
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
