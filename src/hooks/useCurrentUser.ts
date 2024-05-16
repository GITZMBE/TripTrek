import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../recoil";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  
  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email || session?.user?.email === currentUser?.email) return null;

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