'use client';

import React, { useState } from 'react'
import { FormInput } from '../ui'
import { FormButton } from './ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const router = useRouter();
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: ''
  });

  const login = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const user = await res.json();
    return user;
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
      formData.email === undefined ||
      formData.username === undefined ||
      formData.password === undefined
    ) {
      return;
    }

    const registeredUser = await register();

    if (!registeredUser.ok) {
      return;
    }
    
    const loggedInUser = await login();

    setFormData({
      email: '',
      username: '',
      password: ''
    });
    router.push("/");
    window.location.reload();
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
}

export default SignupForm