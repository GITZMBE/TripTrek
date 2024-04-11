'use client';

import { loggedInUserState } from '@/src/recoil';
import Link from 'next/link'
import React from 'react'
import { RxAvatar } from 'react-icons/rx';
import { useRecoilState } from 'recoil';

const Navbar = () => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);

  return (
    <nav className="flex gap-4 items-center">
      {
        !user_token ? (
          <>
            <Link href='/login'>Login</Link>
            <Link href='/signup'>Sign up</Link>
          </>
        ) : (
          <>
            <div className='flex gap-4 items-center'>
              {user_token.user.avatar ? (
                <img src={user_token.user.avatar || ""} className='w-8 aspect-square rounded-full' alt="" />
              ) : (
                <RxAvatar size={32} className='text-grey' />
              )}
              
              <p>{ user_token.user.name || user_token.user.email }</p>
            </div>
            <button onClick={_ => setUserToken(null)}>Log out</button>
          </>
        )
      }

    </nav>
  )
};

export default Navbar;