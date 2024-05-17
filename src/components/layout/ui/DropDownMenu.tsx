'use client';

import React, { Dispatch } from 'react'
import NavLink from './NavLink';
import { User } from '@prisma/client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { signOut } from 'next-auth/react';
import { RxAvatar } from 'react-icons/rx';
import { Icon } from '../../ui';

interface DropDownMenu {
  user: User | null;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const DropDownMenu = ({ user, isOpen, setIsOpen }: DropDownMenu) => {
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={handleToggleMenu}>
        <Icon 
          icon='menu'
          size={24}
          className='text-light hover:text-white cursor-pointer'
        />
      </button>
      
      <div
        className={`absolute top-12 right-0 flex flex-col min-w-52 overflow-hidden rounded-lg shadow-lg shadow-primary bg-secondary z-50 ${
          !isOpen && "hidden"
        }`}
      >
        {!user ? (
          <>
            <NavLink
              href='/login'
              label='Login'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href='/signup'
              label='Signup'
              onClick={() => setIsOpen(false)}
            />
          </>
        ) : (
          <>
            <div className='flex sm:hidden gap-2 md:gap-4 items-center py-2 px-4'>
              <p className="w-full text-white text-ellipsis">{user.name || user.email}</p>
              {user.avatar ? (
                <img
                  src={user.avatar || ""}
                  className='w-8 aspect-square object-cover object-center rounded-full'
                  alt=''
                />
              ) : (
                <Icon icon='avatar' size={32} className='w-8' />
              )}
            </div>
            <hr className='block sm:hidden border-primary border-thin mx-4' />
            <NavLink
              href={`/users/${user.id}`}
              label='My Account'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/trips`}
              label='Trips'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user.id}/favorites`}
              label='Favorite listings'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/reservations`}
              label='Reservations'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user.id}/listings`}
              label='My listings'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href='/chatroom'
              label='Messages'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href='/'
              label='Home'
              onClick={() => setIsOpen(false)}
            />
            <hr className='border-primary border-thin mx-4' />
            <button
              onClick={() => {
                signOut({ callbackUrl: '/login' })
              }}
              className='text-left px-4 py-2 bg-secondary hover:bg-primary text-light transition'
            >
              Log out
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default DropDownMenu