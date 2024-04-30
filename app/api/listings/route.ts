import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const category = searchParams.get('category');
  let listings;
  if (category === null || category === '') {
    listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  } else {
    listings = await prisma.listing.findMany({ 
      where: { 
        category: category 
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
  
  return NextResponse.json(listings);
};