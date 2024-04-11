'use client';

import { FormButton } from '@/src/components/forms/ui';
import { FormInput } from '@/src/components/ui';
import { loggedInUserState } from '@/src/recoil';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import bcrypt from 'bcrypt';

const UserPage = ({ params }: { params: { id: string } }) => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);
  const [ updateable, setUpdateable ] = useState(false);
  const [ formData, setFormData ] = useState({ name: '', email: '', password: '', avatar: '' });

  const update = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/users/${params.id}`, {
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
    let samePassword;
    const getIsSamePassword = async () => {
      samePassword = await bcrypt.compare(formData.password, user_token?.user.hashedPassword!);
    };
    getIsSamePassword();
    
    if (formData.name !== user_token?.user.name && formData.name !== '' && formData.email !== user_token?.user.email && formData.email !== '' && samePassword && formData.password !== '' && formData.avatar !== user_token?.user.avatar && formData.avatar !== '') {
      setUpdateable(true);
      return;
    }
    setUpdateable(false);
  }, [formData]);

  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-primary'>
      <div className='flex gap-8 w-1/2'>
        <img src="/male_default_avatar.png" className='w-56' alt="" />
        <div className='flex flex-col items-center gap-4'>
          <FormInput name='name' placeholder='Name' value={formData} setValue={setFormData} />
          <FormInput name='email' placeholder='Email' value={formData} setValue={setFormData} />
          <FormInput name='password' placeholder='Password' value={formData} setValue={setFormData} />
          <FormInput type='file' name='avatar' placeholder='Avatar' value={formData} setValue={setFormData} />
          <FormButton label='Update' onClick={handleUpdate} outline={!updateable} disabled={!updateable} />
        </div>
      </div>
    </main>
  )
}

export default UserPage