"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/src/hooks";

const Pathbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  let paths = pathName.split("/");
  paths.shift();
  const currentPath = paths.findLast((_) => true);
  const { currentUser: user } = useCurrentUser();

  useEffect(() => {
    const isLoggedIn = user !== undefined && user !== null;

    if (!isLoggedIn && pathName !== "/login" && pathName !== "/signup") {
      router.push("/login");
    }

    if (isLoggedIn && (pathName === "/login" || pathName === "/signup")) {
      router.push('/');
    }
  }, [pathName, user]);

  return (
    <div className='flex gap-2 overflow-x-auto scrollbar-hidden'>
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
            <Link key={i} href={subpath} className='text-grey hover:text-light'>
              /{path}
            </Link>
          );
        });
      })()}
    </div>
  );
};

export default Pathbar;
