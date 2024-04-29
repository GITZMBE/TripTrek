import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return null;

  return NextResponse.json(user);
};
