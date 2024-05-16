import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../recoil";
import { request } from "../utils";
import { User } from "@prisma/client";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  
  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email || session?.user?.email === currentUser?.email) return null;

      const host = window.location.origin;
      const uri = `/api/users?email=${session.user.email}`;
      const options: RequestInit = { 
        method: 'GET',
        cache: 'no-cache'
      }
      const user = await request<User>(host, uri, options) || null;

      setCurrentUser(user);
      return user;
    };

    getUser();
  }, [session]);

  return { currentUser };
};

export default useCurrentUser;