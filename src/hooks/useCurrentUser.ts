import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email) return null;

      const res = await fetch(`${window.location.origin}/api/users?email=${session.user.email}`, { 
        method: 'GET'
      });
      const user = await res.json() || null;

      setCurrentUser(user);
      return user;
    };

    getUser();
  }, [session]);

  return { currentUser };
};

export default useCurrentUser;