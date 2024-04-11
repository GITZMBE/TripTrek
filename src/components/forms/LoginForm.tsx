"use client";

import { loggedInUserState } from "@/src/recoil";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { FormInput } from "../ui";
import { FormButton } from "./ui";
import Link from "next/link";
import { useErrorMessage } from "@/src/hooks";

export const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const { errorMessage, setErrorMessage } = useErrorMessage();

  const login = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const user_token = await res.json();
    return user_token;
  };

  const handleLogin = async () => {
    if (formData.email === "" || formData.password === "") {
      setErrorMessage("All fields needs to be filled");
      return;
    }

    const user_token = await login();
    if (user_token.message) {
      setErrorMessage(user_token.message);
      return;
    }

    setErrorMessage(null);
    setLoggedInUser(user_token);
    setFormData({
      email: "",
      password: "",
    });
    router.push("/");
  };

  return (
    <form className='w-full max-w-[350px] flex flex-col gap-4 items-center'>
      <div className='w-full flex flex-col gap-4'>
        <FormInput
          type='text'
          name='email'
          placeholder='Email'
          value={formData}
          setValue={setFormData}
        />
        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          value={formData}
          setValue={setFormData}
        />
      </div>
      <p className="text-error">{ errorMessage }</p>
      <FormButton
        label='Login'
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      />
      <Link className='text-light/50 hover:text-light' href='/signup'>
        Do not have an accout? Sign up here
      </Link>
    </form>
  );
};

export default LoginForm;
