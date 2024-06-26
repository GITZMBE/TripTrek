"use client";

import React from "react";
import { FormInput } from "./ui";
import { FormButton } from "./ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoading } from "@/src/hooks";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "@/src/utils";
import { User } from "@prisma/client";

type FormFields = {
  email: string;
  username: string;
  password: string;
};

export const SignupForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormFields>();
  const { isLoading, setIsLoading } = useLoading();

  const host = window.location.origin;

  const findUser = async (formData: FormFields) => {
    const uri = '/api/login';
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const user_token = await request<{ user: User, token: string } | { message: string }>(host, uri, options);
    return user_token;
  };

  const signup = async (formData: FormFields) => {
    const uri = '/api/signup';
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const user = await request<User | { message: string }>(host, uri, options);
    return user;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    const registeredUser = await signup(data);

    if ('message' in registeredUser) {
      setError('root', {
        type: 'manual',
        message: registeredUser.message
      })
      toast.error(registeredUser.message);
      setIsLoading(false);
      return;
    }
    toast.success('Registration Successful');

    const user_token = await findUser(data);

    if ('message' in user_token) {
      setError("root", {
        type: "manual",
        message: user_token.message
      })
      setIsLoading(false);
      return;
    }

    signIn('credentials', data);
    router.push("/");
    setIsLoading(false);
  };

  return (
    <form className='w-full max-w-[350px] flex flex-col gap-4 items-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex flex-col gap-4'>
        <FormInput
          type='text'
          placeholder='Email'
          register={register('email', { required: "Email is required" })}
          propName="email"
          errors={errors}
        />
        <FormInput
          type='text'
          placeholder='Username'
          register={register('username', { required: "Username is required" })}
          propName="username"
          errors={errors}
        />
        <FormInput
          type='password'
          placeholder='Password'
          register={register('password', { required: "Password is required" })}
          propName="password"
          errors={errors}
        />
      </div>
      { errors.root && (
        <p className='text-error'>{ errors.root.message }</p>
      )}
      <FormButton
        type="submit"
        label='Register'
        isLoading={isLoading}
      />
      <hr className="w-full border-secondary" />
      <FormButton
        label='Sign in with Google'
        outline
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <FormButton
        label='Sign in with Github'
        outline
        icon={FaGithub}
        onClick={() => signIn("github")}
      />
      <Link className='text-light/50 hover:text-light' href='/login'>
        already have an account? sign in here.
      </Link>
    </form>
  );
};

export default SignupForm;
