import { authOptions } from "@/app/api/auth/[...nextauth]";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";


const getSesssion = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSesssion();

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