"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "./ui";
import { useToggleMenu } from "@/src/hooks";
import { getLoggedInUser, logout } from "@/src/storage";

const Navbar = () => {
  const [user, setUser] = useState(getLoggedInUser());
  const { isOpen, setIsOpen, navComponent } = useToggleMenu();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setUser(getLoggedInUser());
  }, []);

  return (
    <nav className='relative flex gap-4 items-center' ref={navComponent}>
      {user && (
        <Link
          href={`${user.id}`}
          className='hidden sm:flex gap-4 items-center'
        >
          {user.avatar ? (
            <img
              src={user.avatar || ""}
              className='w-8 aspect-square object-cover object-center rounded-full'
              alt=''
            />
          ) : (
            <RxAvatar size={32} className='text-grey' />
          )}

          <p className="text-white">{user.name || user.email}</p>
        </Link>
      )}
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
              onClick={(_) => {logout(); setIsOpen(false)}}
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
