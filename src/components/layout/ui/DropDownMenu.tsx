'use client';

import React from 'react'
import NavLink from './NavLink';
import { User } from '@prisma/client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useToggleMenu } from '@/src/hooks';
import { signOut } from 'next-auth/react';

interface DropDownMenu {
  user: User | null;
}

const DropDownMenu = ({ user }: DropDownMenu) => {
  const { isOpen, setIsOpen, navComponent } = useToggleMenu();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // try to use navComponent in a ref attribute

  return (
    <>
      <GiHamburgerMenu
        size={24}
        className='text-light hover:text-white cursor-pointer'
        onClick={handleToggleMenu}
      />
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
            <NavLink
              href={`/users/${user.id}`}
              label='My Account'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/listings`}
              label='Trips'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user.id}/favorites`}
              label='Favorite listings'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user.id}/reservations`}
              label='Reservations'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user.id}/listings`}
              label='My listings'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href='/'
              label='Home'
              onClick={() => setIsOpen(false)}
            />
            <hr className='border-primary border-thin mx-4' />
            <button
              onClick={(_) => signOut({ callbackUrl: '/login' })}
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