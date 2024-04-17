"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../recoil";

const Pathbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  let paths = pathName.split("/");
  paths.shift();
  const currentPath = paths.findLast((_) => true);
  const user_token = useRecoilValue(loggedInUserState);

  useEffect(() => {
    const isLoggedIn = user_token !== null;

    if (!isLoggedIn && pathName !== "/login" && pathName !== "/signup") {
      router.push("/login");
    }

    if (isLoggedIn && (pathName === "/login" || pathName === "/signup")) {
      router.back();
    }
  }, [pathName, user_token]);

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
