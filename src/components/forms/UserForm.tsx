"use client";

import React, { useEffect, useState } from "react";
import { FormInput } from "./ui";
import FormFileInput from "./ui/FormFileInput";
import { FormButton } from "./ui";
import { useErrorMessage, useFormUpdateable } from "@/src/hooks";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/src/recoil";

interface UserFormProps {
  id: string;
}

export const UserForm = ({ id }: UserFormProps) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    avatar: any;
  }>({ name: "", email: "", password: "", avatar: "" });
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const { updateable, setUpdateable } = useFormUpdateable(false);

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
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/update/${id}`,
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
    if (
      formData.avatar !== user_token?.user.avatar &&
      formData.avatar !== null &&
      formData.avatar !== "" &&
      formData.avatar !== undefined &&
      typeof formData.avatar !== "string"
    ) {
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
    let samePassword = false;

    if (
      (formData.name !== user_token?.user.name && formData.name !== "") ||
      (formData.email !== user_token?.user.email && formData.email !== "") ||
      (!samePassword && formData.password !== "") ||
      (formData.avatar !== user_token?.user.avatar &&
        formData.avatar !== null &&
        formData.avatar !== "")
    ) {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, [formData]);

  return (
    <form className='w-full h-full flex flex-col items-center gap-4'>
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
      <FormFileInput name='avatar' value={formData} setValue={setFormData} />
      <p className='text-error'>{errorMessage}</p>
      <FormButton
        label='Update'
        onClick={handleUpdate}
        outline={!updateable}
        disabled={!updateable}
      />
    </form>
  );
};

export default UserForm;
