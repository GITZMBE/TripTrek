"use client";

import { loggedInUserState } from "@/src/recoil";
import { useRouter } from "next/navigation";
import React from "react";
import { useSetRecoilState } from "recoil";
import { FormInput } from "./ui";
import { FormButton } from "./ui";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoading } from "@/src/hooks";

type FormFields = {
  email: string,
  password: string
};

export const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const { isLoading, setIsLoading } = useLoading();

  const login = async (formData: FormFields) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const user_token = await res.json();
    return user_token;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    const user_token = await login(data);

    setLoggedInUser(user_token);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    router.push("/");
  };

  return (
    <form className='w-full max-w-[350px] flex flex-col gap-4 items-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex flex-col gap-4'>
        <FormInput
          placeholder='Email'
          register={register("email", { required: "Email is required" })}
          propName="email"
          errors={errors}
        />
        <FormInput
          type='password'
          placeholder='Password'
          register={register("password", { required: "Password is required" })}
          propName="password"
          errors={errors}
        />
      </div>
      { errors.root && (
        <p className="text-error">{ errors.root.message }</p>
      )}
      <FormButton
        type="submit"
        label='Login'
        isLoading={isLoading}
      />
      <hr className="w-full border-secondary" />
      <FormButton label="Login with Google" outline icon={FcGoogle} onClick={() => signIn('google')} />
      <FormButton label="Login with Github" outline icon={FaGithub} onClick={() => signIn('github')} />
      <Link className='text-light/50 hover:text-light' href='/signup'>
        Do not have an accout? Sign up here
      </Link>
    </form>
  );
};

export default LoginForm;
