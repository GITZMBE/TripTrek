"use client";

import React, { useEffect, useState } from "react";
import { FormInput } from "./ui";
import FormFileInput from "./ui/FormFileInput";
import { FormButton } from "./ui";
import { useErrorMessage, useFormUpdateable, useLoading } from "@/src/hooks";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/src/recoil";
import { useForm } from "react-hook-form";

interface UserFormProps {
  id: string;
}

type FormFields = {
  name: string;
  email: string;
  password: string;
  avatar: File | string;
};

export const UserForm = ({ id }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormFields>();
  const currentFormData = watch();
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);
  const { updateable, setUpdateable } = useFormUpdateable(false);
  const { isLoading, setIsLoading } = useLoading();

  const uploadImage = async (data: FormFields) => {
    const imageData = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/api/upload/image",
      {
        method: "POST",
        headers: {
          "Content-Type": data.avatar?.type || "image/*",
          "accept": "image/*"
        },
        body: data.avatar,
      }
    );
    const savedImage = await imageData.json();
    if (savedImage.message) {
      return savedImage;
    }
    setValue("avatar", savedImage.url);
  };

  const updateUserInfo = async (data: FormFields) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const updatedUser = await res.json();
    return updatedUser;
  };

  const onSubmit = async (data: FormFields) => {
    setIsLoading(true);
    
    try {
      console.log(data)
      if (
        data.avatar !== user_token?.user.avatar &&
        data.avatar !== null &&
        data.avatar !== "" &&
        data.avatar !== undefined &&
        typeof data.avatar !== "string"
      ) {
        console.log("upload")
        const uploadedImage = await uploadImage(data);
        if (uploadedImage && uploadedImage.message) {
          return;
        }
      }

      const newUser = await updateUserInfo(data);
      if (newUser && newUser.message) {
        return;
      }      
    } catch(error: any) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setUserToken(null);
  };

  useEffect(() => {
    let samePassword = false;

    if (
      (currentFormData.name !== user_token?.user.name &&
        currentFormData.name !== "") ||
      (currentFormData.email !== user_token?.user.email &&
        currentFormData.email !== "") ||
      (!samePassword && currentFormData.password !== "") ||
      (currentFormData.avatar !== user_token?.user.avatar &&
        currentFormData.avatar !== null &&
        currentFormData.avatar !== "")
    ) {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, []);

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
