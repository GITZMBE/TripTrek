import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  const usersListings = await prisma.listing.findMany({
    where: { 
      userId: id 
    }
  });
  return NextResponse.json(usersListings);
};