import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const reservation = await prisma.reservation.findUnique({ 
    where: { 
      id 
    },
    include: {
      listing: true
    }
  });

  return NextResponse.json(reservation);
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { accept } = await req.json();

  const handledAcception = await prisma.reservation.update({
    where: { 
      id 
    },
    data: {
      isAccepted: accept 
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