import { authOptions } from "@/src/utils/authOptions";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

/**
* Now I'm just picky but why create a function that only returns the call from getServerSession? You can just call it directly
*/
const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
