import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  const listings = await prisma.listing.findMany({
    where: {
      userId: id
    },
    include: {
      reservations: true
    }
  }) || [];

  const reservations = await prisma.reservation.findMany({
    where: {
      listing: {
        userId: id
      }
    },
    include: {
      listing: true,
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(reservations);
};