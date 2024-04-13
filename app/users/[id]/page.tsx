'use client';

import { FormButton } from '@/src/components/forms/ui';
import { FormInput } from '@/src/components/ui';
import { loggedInUserState } from '@/src/recoil';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import bcrypt from 'bcrypt';
import Image from 'next/image';
import FormFileInput from '@/src/components/forms/ui/FormFileInput';
import { put } from '@vercel/blob';

const UserPage = ({ params }: { params: { id: string } }) => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);
  const [ updateable, setUpdateable ] = useState(false);
  const [ formData, setFormData ] = useState<{ name: string, email: string, password: string, avatar: any }>({ name: '', email: '', password: '', avatar: '' });

  const update = async () => {
    const { url } = await fetch(process.env.NEXT_PUBLIC_BASEURL + '/api/upload/image', { 
      method: 'POST', 
      headers: { 'content-types': formData.avatar.type || 'application/octet-stream' }, 
      body: JSON.stringify(formData.avatar)
    });
    console.log(url)
    setFormData({ ...formData, avatar: url });
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/users/update/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Types': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const updatedUser = await res.json();
    return updatedUser;
  };

  const handleUpdate = async () => {
    const newUser = await update();
    if (newUser.message) {
      console.log(newUser.message);
      return;
    }

    setUserToken(null);
  };

  useEffect(() => {
    let samePassword = false;
    
    if ((formData.name !== user_token?.user.name && formData.name !== '') || (formData.email !== user_token?.user.email && formData.email !== '') || (!samePassword && formData.password !== '') || (formData.avatar !== user_token?.user.avatar && formData.avatar !== null)) {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, [formData]);

  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-primary'>
      <div className='flex gap-8 w-1/2'>
        {user_token !== null && user_token.user.avatar !== null ? (
          <Image src={user_token.user.avatar} width='256' height='256' alt="Profile Picture" />
        ) : (
          <Image src='/male_default_avatar.png' width='256' height='256' alt='' />
        )}
        <div className='w-full h-full flex flex-col items-center gap-4'>
          <FormInput name='name' placeholder='Name' value={formData} setValue={setFormData} />
          <FormInput name='email' placeholder='Email' value={formData} setValue={setFormData} />
          <FormInput name='password' placeholder='Password' value={formData} setValue={setFormData} />
          <FormFileInput name='avatar' value={formData} setValue={setFormData} />
          <FormButton label='Update' onClick={handleUpdate} outline={!updateable} disabled={!updateable} />
        </div>
      </div>
    </main>
  )
}

export default UserPage