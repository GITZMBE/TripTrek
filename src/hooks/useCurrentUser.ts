import prisma from "@/prisma";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email) return null;

      const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          email: session.user.email 
        })
      });
      const user = await res.json();

      if (!user) return null;

      setCurrentUser(user);
      return user;
    };

    getUser();
  }, [session]);

  return { currentUser };
};

export default useCurrentUser;