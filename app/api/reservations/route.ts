import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const userId = searchParams.get('userId');
  const authorId = searchParams.get('authorId');

  let query: any = {};
  if (userId) {
    query.userId = userId;
  }
  if (authorId) {
    query.listing = { userId: authorId };
  }

  const reservations = await prisma.reservation.findMany({
    where: query,
    include: {
      listing: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) || [];

  return NextResponse.json(reservations);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const reservation = await prisma.reservation.create({
    data: body
  });

  return NextResponse.json(reservation);
};
