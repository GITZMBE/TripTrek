import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const email = searchParams.get('email');

  if (!email) return null;

  const user = await prisma.user.findUnique({ 
    where: {
      email
    }
  });

  if (!user) return null;

  return NextResponse.json(user);
};
