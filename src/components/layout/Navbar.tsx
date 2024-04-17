"use client";

import { loggedInUserState } from "@/src/recoil";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { NavLink } from "./ui";
import { useToggleMenu } from "@/src/hooks";

const Navbar = () => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);
  const { isOpen, setIsOpen, navComponent } = useToggleMenu();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='relative flex gap-4 items-center' ref={navComponent}>
      {user_token && (
        <Link
          href={`/users/${user_token.user.id}`}
          className='flex gap-4 items-center'
        >
          {user_token.user.avatar ? (
            <img
              src={user_token.user.avatar || ""}
              className='w-8 aspect-square rounded-full'
              alt=''
            />
          ) : (
            <RxAvatar size={32} className='text-grey' />
          )}

          <p className="text-white">{user_token.user.name || user_token.user.email}</p>
        </Link>
      )}
      <GiHamburgerMenu
        size={24}
        className='text-light hover:text-white cursor-pointer'
        onClick={handleToggleMenu}
      />
      <div
        className={`absolute top-12 right-0 flex flex-col min-w-52 overflow-hidden rounded-lg shadow-lg shadow-primary bg-secondary ${
          !isOpen && "hidden"
        }`}
      >
        {!user_token ? (
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
              href={`/users/${user_token.user.id}`}
              label='My Account'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/listings`}
              label='Trips'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user_token.user.id}/favorites`}
              label='Favorite landings'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user_token.user.id}/reservations`}
              label='Reservations'
              onClick={() => setIsOpen(false)}
            />
            <NavLink
              href={`/users/${user_token.user.id}/listings`}
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
              onClick={(_) => {setUserToken(null); setIsOpen(false)}}
              className='text-left px-4 py-2 bg-secondary hover:bg-primary text-light transition'
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
