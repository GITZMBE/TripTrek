import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({ 
    where: { 
      id 
    } 
  });

  if (!user) {
    return NextResponse.json({ message: "User with that id doesn't exist" });
  }

  return NextResponse.json(user);
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await prisma.user.delete({ 
    where: { 
      id 
    } 
  });

  return NextResponse.json(user);
};
