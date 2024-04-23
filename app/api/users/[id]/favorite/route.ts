import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { listingId } = await req.json();
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  const favoriteIds = user?.favoriteIds || [];

  const updatedUser = await prisma.user.update({ 
    where: { 
      id: id 
    },
    data: {
      favoriteIds: [...favoriteIds, listingId]
    }
  });
  return NextResponse.json(updatedUser);
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { listingId } = await req.json();
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  const favoriteIds = user?.favoriteIds || [];
  const updatedFavoriteIds = favoriteIds.filter(favoriteId => favoriteId !== listingId);

  const updatedUser = await prisma.user.update({ 
    where: { 
      id: id 
    },
    data: {
      favoriteIds: updatedFavoriteIds
    }
  });
  return NextResponse.json(updatedUser);
};