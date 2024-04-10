'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Pathbar = () => {
  const pathName = usePathname();
  let paths = pathName.split("/");
  paths.shift();
  const currentPath = paths.findLast((_) => true);

  return (
    <div className='flex gap-2'>
      {pathName !== "/" && (
        <Link href='/' className='text-grey hover:text-light'>
          Start
        </Link>
      )}
      {(() => {
        let subpath = "";
        return paths.map((path, i) => {
          subpath += `/${path}`;
          return path === currentPath ? (
            <p key={i} className='cursor-default text-accent'>
              /{path}
            </p>
          ) : (
            <Link
              key={i}
              href={subpath}
              className='text-secondary hover:text-light'
            >
              /{path}
            </Link>
          );
        });
      })()}
    </div>
  );
};

export default Pathbar;
