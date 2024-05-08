import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: "No params provided" });
  };

  const user = await prisma.user.findUnique({ 
    where: {
      email
    }
  });

  return NextResponse.json(user);
};
