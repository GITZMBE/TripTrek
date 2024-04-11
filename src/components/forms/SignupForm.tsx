'use client';

import React, { useState } from 'react'
import { FormInput } from '../ui'
import { FormButton } from './ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { loggedInUserState } from '@/src/recoil';

export const SignupForm = () => {
  const router = useRouter();
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: ''
  });
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  const login = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const user_token = await res.json();
    return user_token;
  };

  const register = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const user = await res.json();
    return user;
  };

  const handleRegister = async () => {
    if (
      formData.email === '' ||
      formData.username === '' ||
      formData.password === ''
    ) {
      return;
    }

    const registeredUser = await register();

    if (registeredUser.message) {
      console.log(registeredUser.message);
      return;
    }
    
    const user_token= await login();
    setLoggedInUser(user_token);

    setFormData({
      email: '',
      username: '',
      password: ''
    });
    router.push("/");
  };

  return (
    <form className='w-full max-w-[350px] flex flex-col gap-4 items-center'>
      <div className='w-full flex flex-col gap-4'>
        <FormInput type='text' name='email' placeholder='Email' value={formData} setValue={setFormData} />
        <FormInput type='text' name='username' placeholder='Username' value={formData} setValue={setFormData} />
        <FormInput type='password' name='password' placeholder='Password' value={formData} setValue={setFormData} />
      </div>
      <FormButton label="Register" onClick={(e) => {
        e.preventDefault();
        handleRegister();
      }} />
      <Link className='text-light/50 hover:text-light' href='/login'>
        already have an account? sign in here.
      </Link>
    </form>
  )
};

export default SignupForm;