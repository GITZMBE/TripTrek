// 'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "./ui";
import { useCurrentUser, useToggleMenu } from "@/src/hooks";
import { getLoggedInUser, logout } from "@/src/storage";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/src/recoil";
import { getCurrentUser } from "@/src/actions";
import DropDownMenu from "./ui/DropDownMenu";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

interface NavbarProps {
  currentUser: User | null;
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  // const currentUser = await getCurrentUser();

  // const { data: session } = useSession();
  // const currentUser = session?.user as User;
  // const { currentUser } = useCurrentUser();

  return (
    <nav className='relative flex gap-4 items-center'>
      {currentUser && (
        <Link
          href={`${currentUser?.id}`}
          className='hidden sm:flex gap-4 items-center'
        >
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar || ""}
              className='w-8 aspect-square object-cover object-center rounded-full'
              alt=''
            />
          ) : (
            <RxAvatar size={32} className='text-grey' />
          )}

          <p className="text-white">{currentUser.name || currentUser.email}</p>
        </Link>
      )}
      <DropDownMenu user={currentUser} />
      {/* make as separate component (DropDownMenu) */}
      {/* <GiHamburgerMenu
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
              onClick={(_) => {logout(); setUser(undefined); setLoggedInUser(undefined); setIsOpen(false)}}
              className='text-left px-4 py-2 bg-secondary hover:bg-primary text-light transition'
            >
              Log out
            </button>
          </>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
