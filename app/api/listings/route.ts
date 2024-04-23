import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const category = searchParams.get('category');
  let listings;
  if (category === null || category === '') {
    listings = await prisma.listing.findMany();
  } else {
    listings = await prisma.listing.findMany({ 
      where: { 
        category: category 
      } 
    });
  }
  
  return NextResponse.json(listings);
};