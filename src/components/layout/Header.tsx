import React from "react";
import Navbar from "./Navbar";
import Pathbar from "../ui/Pathbar";
import Link from "next/link";

const Header = () => {
  return (
    <header className='fixed top-0 flex flex-col gap-2 bg-secondary w-full py-4 px-4 sm:px-8 md:px-12 shadow-md z-50'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <img src='/logo.png' width='180' alt='' />
        </Link>
        <Navbar />
      </div>
      <Pathbar />
    </header>
  );
};

export default Header;
