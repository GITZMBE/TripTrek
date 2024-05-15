import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

/**
* Small detail, but personally I wouldn't return { currentUser }. If I were to use this hook..
*
* const currentUser = useCurrentUser();
* 
* And if I then wanted to access the current user..
*
* currentUser.currentUser.id etc..
*
* Just returning the current user is fine. Maybe if you had some other related data such as isLoading or something you could return an object like this (just a random example):
*
* {
*   profile: User | null
*   isLoading: boolean
* }
*
* Then accessing the fields would be a little bit more intuitive, like currentUser.profile.id
*/
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
