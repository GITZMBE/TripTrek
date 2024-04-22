import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id } = await req.json();
  const usersListings = await prisma.listing.findMany({
    where: { 
      userId: id 
    },
  });
  return NextResponse.json(usersListings);
};