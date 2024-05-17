'use client';

import Link from "next/link";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useToggleMenu } from "@/src/hooks";
import DropDownMenu from "./ui/DropDownMenu";
import { User } from "@prisma/client";
import { Icon } from "../ui";

interface NavbarProps {
  currentUser: User | null;
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  const { isOpen, setIsOpen, navComponent } = useToggleMenu();

  return (
    <nav className='relative flex gap-4 items-center' ref={navComponent}>
      {currentUser && (
        <Link
          href={`/users/${currentUser?.id}`}
          className='hidden sm:flex gap-2 md:gap-4 items-center'
        >
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar || ""}
              className='w-8 aspect-square object-cover object-center rounded-full'
              alt=''
            />
          ) : (
            <Icon icon='avatar' size={32} className='w-8' />
          )}

          <p className="text-white">{currentUser.name || currentUser.email}</p>
        </Link>
      )}
      <DropDownMenu user={currentUser} isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navbar;
