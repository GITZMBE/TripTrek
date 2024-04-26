import prisma from "@/prisma";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  const currentUser = useMemo(async () => {
    if (!session || !session.user || !session.user.email) return null;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user) return null;

    return user;
  }, [session]);

  return { currentUser };
};

export default useCurrentUser;