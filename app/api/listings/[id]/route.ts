import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const listing = await prisma.listing.findUnique({ 
    where: { 
      id: id 
    } 
  });
  return NextResponse.json(listing);
};
