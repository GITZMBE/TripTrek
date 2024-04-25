import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params } : { params: { id: string } }) => {
  const { id } = params;
  const reservations = await prisma.reservation.findMany({
    where: {
      userId: id
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