import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import Pathbar from "../Pathbar";

const Header = () => {
  return (
    <header className='fixed top-0 flex flex-col gap-2 bg-secondary w-full py-4 px-4 sm:px-8 md:px-12 shadow-md'>
      <div className="flex justify-between items-center">
        <Image src='/logo.png' width='180' height='0' alt='' />
        <Navbar />  
      </div>
      <Pathbar />
    </header>
  );
};

export default Header;
