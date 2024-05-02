"use client";

import React from "react";
import { UserForm } from "@/src/components/forms";
import { Container } from "@/src/components/layout";

const UserPage = () => {
  return (
    <Container center extraPadding>
      <div className='flex justify-center items-center flex-col sm:flex-row gap-8 w-full md:w-3/4 xl:w-1/2'>
        <UserForm />
      </div>
    </Container>
  );
};

export default UserPage;
