"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getLoggedInUser } from "@/src/storage";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/src/recoil";
import { useSession } from "next-auth/react";

const Pathbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  let paths = pathName.split("/");
  paths.shift();
  const currentPath = paths.findLast((_) => true);
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session)
    const user = session?.user;
    const isLoggedIn = user !== undefined && user !== null;

    if (!isLoggedIn && pathName !== "/login" && pathName !== "/signup") {
      router.push("/login");
    }

    if (isLoggedIn && (pathName === "/login" || pathName === "/signup")) {
      router.push('/');
    }
  }, [pathName]);

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
