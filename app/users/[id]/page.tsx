"use client";

import { FormButton } from "@/src/components/forms/ui";
import { FormInput } from "@/src/components/ui";
import { loggedInUserState } from "@/src/recoil";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import bcrypt from "bcrypt";
import Image from "next/image";
import FormFileInput from "@/src/components/forms/ui/FormFileInput";
import { useErrorMessage } from "@/src/hooks";

const UserPage = ({ params }: { params: { id: string } }) => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [updateable, setUpdateable] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    avatar: any;
  }>({ name: "", email: "", password: "", avatar: "" });

  const uploadImage = async () => {
    const imageData = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/api/upload/image",
      {
        method: "POST",
        headers: {
          "Content-Type": formData.avatar.type,
        },
        body: formData.avatar,
      }
    );
    const savedImage = await imageData.json();
    if (savedImage.message) {
      return savedImage;
    }
    setFormData({ ...formData, avatar: savedImage.url });
  };

  const updateUserInfo = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/update/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const updatedUser = await res.json();
    return updatedUser;
  };

  const handleUpdate = async () => {
    if (formData.avatar !== "" || formData.avatar !== null) {
      const uploadedImage = await uploadImage();
      if (uploadedImage && uploadedImage.message) {
        setErrorMessage(uploadedImage.message);
        return;
      }
    }

    const newUser = await updateUserInfo();
    if (newUser && newUser.message) {
      setErrorMessage(newUser.message);
      return;
    }

    setUserToken(null);
  };

  useEffect(() => {
    console.log(typeof formData.avatar)
    if (formData.avatar !== user_token?.user.avatar && formData.avatar !== null && formData.avatar !== "" && typeof formData.avatar !== 'string') {
      uploadImage();
    }

    let samePassword = false;

    if (
      (formData.name !== user_token?.user.name && formData.name !== "") ||
      (formData.email !== user_token?.user.email && formData.email !== "") ||
      (!samePassword && formData.password !== "") ||
      (formData.avatar !== user_token?.user.avatar && formData.avatar !== null && formData.avatar !== "")
    ) {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, [formData]);

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
        <div className='w-full h-full flex flex-col items-center gap-4'>
          <FormInput
            name='name'
            placeholder='Name'
            value={formData}
            setValue={setFormData}
          />
          <FormInput
            name='email'
            placeholder='Email'
            value={formData}
            setValue={setFormData}
          />
          <FormInput
            name='password'
            placeholder='Password'
            value={formData}
            setValue={setFormData}
          />
          <FormFileInput
            name='avatar'
            value={formData}
            setValue={setFormData}
          />
          <p className='text-error'>{errorMessage}</p>
          <FormButton
            label='Update'
            onClick={handleUpdate}
            outline={!updateable}
            disabled={!updateable}
          />
        </div>
      </div>
    </main>
  );
};

export default UserPage;
