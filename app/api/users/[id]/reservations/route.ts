import prisma from "@/prisma";
import { Reservation } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params } : { params: { id: string } }) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const userId = searchParams.get('userId');

  let reservations: Reservation[] = [];
  if (!userId) {
    const { id } = params;
    reservations = await prisma.reservation.findMany({
      where: {
        userId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) || [];
  } else {
    reservations = await prisma.reservation.findMany({
      where: {
        listing: {
          userId: userId
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  return NextResponse.json(reservations);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const reservation = await prisma.reservation.create({
    data: body
  });

  return NextResponse.json(reservation);
};