import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const reservations = await prisma.reservation.findMany({
    where: {
      listingId: id
    }
  }) || [];

  return NextResponse.json(reservations);
};