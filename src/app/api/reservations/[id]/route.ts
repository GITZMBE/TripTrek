import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const reservation = await prisma.reservation.findUnique({ 
    where: { 
      id 
    },
    include: {
      listing: true,
      user: true
    }
  });

  return NextResponse.json(reservation);
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { accept, pay } = await req.json();

  const queryData: any = {};
  if (accept) {
    queryData.isAccepted = accept;
  }
  if (pay) {
    queryData.isPaid = pay;
  }

  const handledAcception = await prisma.reservation.update({
    where: { 
      id 
    },
    data: queryData,
    include: {
      user: true,
      listing: true
    }
  });

  return NextResponse.json(handledAcception);
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const reservation = await prisma.reservation.delete({ 
    where: { 
      id 
    } 
  });

  return NextResponse.json(reservation);
};