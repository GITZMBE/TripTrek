"use client";

import React, { useEffect, useMemo } from "react";
import { FormInput } from "./ui";
import { FormButton } from "./ui";
import { useCurrentUser, useLoading } from "@/src/hooks";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { UploadImage } from "../listingSteps/ui";
import { useRouter } from  "next/navigation";
import { TfiReload } from "react-icons/tfi";

interface UserFormProps {
  
}

type FormFields = {
  name: string;
  email: string;
  password: string;
  image: string | null | undefined;
};

export const UserForm = ({}: UserFormProps) => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const defaultValues = useMemo(() => { return {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    image: user?.avatar || null
  }}, [user]);
  const {
    unregister,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
    reset
  } = useForm<FormFields>({ defaultValues: defaultValues });
  const currentFormData = watch();
  const updateable = (
    (currentFormData.name !== user?.name && currentFormData.name !== "") ||
    (currentFormData.email !== user?.email && currentFormData.email !== "") ||
    (currentFormData.password !== "") ||
    (currentFormData.image !== undefined && currentFormData !== null && currentFormData.image !== '' && currentFormData.image !== user?.avatar)
  );
  const { isLoading, setIsLoading } = useLoading();

  const updateUserInfo = async (data: FormFields) => {
    const res = await fetch(
      `${window.location.origin}/api/users/${user?.id}/update`,
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
    try {
      setIsLoading(true);

      const newUser = await updateUserInfo(data);
      if ('message' in newUser) {
        setError('root', { message: newUser.message });
        return;
      }

      router.refresh();
    } catch(error: any) {
      setError('root', { message: error.message })
    } finally {
      setIsLoading(false);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    reset(defaultValues);
    setTimeout(() => {setIsLoading(false)}, 1000);
  };

  return (
    <form
      className='flex justify-center items-center flex-col sm:flex-row gap-8 w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='w-full'>
        <h2 className='text-xl text-grey mb-2'>Avatar</h2>
        <UploadImage unregister={unregister} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} errors={errors} />
      </div>
      <div className='w-full h-full flex flex-col items-center gap-4'>
        <div className="w-full flex justify-end">
          <TfiReload onClick={handleReload} size={24} className={`text-grey cursor-pointer ${ isLoading && 'animate-spin' }`} />
        </div>
        <div className='w-full space-y-2'>
          <label className='w-full text-grey'>Name</label>
          <FormInput 
            placeholder='Name'
            register={register("name")}
            propName="name"
            errors={errors}
          />          
        </div>
        <div className='w-full space-y-2'>
          <label className='w-full text-grey mb-2'>Email</label>
          <FormInput
            placeholder='Email'
            register={register("email")}
            propName="email"
            errors={errors}
          />          
        </div>
        <div className='w-full space-y-2'>
          <label className='w-full text-grey mb-2'>Password</label>
          <FormInput
            placeholder='Password'
            register={register("password")}
            propName="password"
            errors={errors}
          />          
        </div>
        <FormButton
          type='submit'
          label='Update'
          outline={!updateable}
          disabled={!updateable}
          isLoading={isLoading}
        />
      </div>

      {/* <FormFileInput register={register("avatar")} propName='avatar' errors={errors} /> */}
      
      {errors.root && <p className='text-error'>{errors.root.message}</p>}
      
    </form>
  );
};

export default UserForm;
