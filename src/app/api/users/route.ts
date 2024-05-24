import prisma from "@/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const email = searchParams.get('email');

  let user: User | null = null;
  let users: User[] = [];

  if (email) {
    user = await prisma.user.findUnique({ 
      where: {
        email
      }
    });
    return NextResponse.json(user);
  } else {
    users = await prisma.user.findMany();
    return NextResponse.json(users);
  };
};
