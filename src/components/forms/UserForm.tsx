"use client";

import React, { useEffect, useState } from "react";
import { FormInput } from "./ui";
import FormFileInput from "./ui/FormFileInput";
import { FormButton } from "./ui";
import { useFormUpdateable, useLoading } from "@/src/hooks";
import { useForm } from "react-hook-form";
import { getLoggedInUser, login } from "@/src/storage";
import { User } from "@prisma/client";
import { useSetRecoilState } from "recoil";
import { loggedInUserState } from "@/src/recoil";

interface UserFormProps {
  id: string;
}

type FormFields = {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
  avatarUrl: string
};

export const UserForm = ({ id }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<FormFields>();
  const currentFormData = watch();
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const [user, setUser] = useState(getLoggedInUser());
  const { updateable, setUpdateable } = useFormUpdateable(false);
  const { isLoading, setIsLoading } = useLoading();

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    const imageData = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/api/images/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": file.type || "image/*",
          "accept": "image/*"
        },
        body: file,
      }
    );
    const savedImage = await imageData.json();
    if (savedImage.message) {
      return savedImage;
    }
    setValue("avatarUrl", savedImage.url);
    setIsLoading(false);
  };

  const updateUserInfo = async (data: FormFields) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/${id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const updatedUser: User | { message: string } = await res.json();
    return updatedUser;
  };

  const onSubmit = async (data: FormFields) => {
    setIsLoading(true);
    
    try {
      if (data.avatar.length > 0 && typeof data.avatar !== 'string') {
        const uploadedImage = await uploadImage(data.avatar[0]);
        if (uploadedImage && uploadedImage.message) {
          return;
        }
      }

      const newUser = await updateUserInfo(data);
      if ('message' in newUser) {
        setError('root', { message: newUser.message });
        return;
      }

      login(newUser);
      setLoggedInUser(newUser);
      setUser(newUser);
    } catch(error: any) {
      return;      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let samePassword = false;
    
    if (currentFormData.avatar && currentFormData.avatar.length > 0 && currentFormData.avatarUrl === undefined) {
      uploadImage(currentFormData.avatar[0])
    }

    if (
      (currentFormData.name !== user?.name &&
        currentFormData.name !== "") ||
      (currentFormData.email !== user?.email &&
        currentFormData.email !== "") ||
      (!samePassword && currentFormData.password !== "") ||
      (currentFormData.avatarUrl !== undefined && currentFormData.avatarUrl !== user?.avatar)
    ) {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, [currentFormData]);

  return (
    <form
      className='w-full h-full flex flex-col items-center gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        placeholder='Name'
        register={register("name")}
        propName="name"
        errors={errors}
      />
      <FormInput
        placeholder='Email'
        register={register("email")}
        propName="email"
        errors={errors}
      />
      <FormInput
        placeholder='Password'
        register={register("password")}
        propName="password"
        errors={errors}
      />
      <FormFileInput register={register("avatar")} propName='avatar' errors={errors} />
      {errors.root && <p className='text-error'>{errors.root.message}</p>}
      <FormButton
        type='submit'
        label='Update'
        outline={!updateable}
        disabled={!updateable}
        isLoading={isLoading}
      />
    </form>
  );
};

export default UserForm;
