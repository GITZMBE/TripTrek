import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const reservation = await prisma.reservation.findUnique({ 
    where: { 
      id 
    } 
  });

  return NextResponse.json(reservation);
};