import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ 
    where: {
      email
    }
  });

  if (!user) return null;

  return NextResponse.json(user);
};
