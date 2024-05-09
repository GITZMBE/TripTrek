import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const category = searchParams.get('category');
  const amount = searchParams.get('amount') || undefined;
  const take = (amount !== undefined && !isNaN(parseInt(amount))) && parseInt(amount);

  let listings;
  if (category === null || category === '') {
    if (take) {
      listings = await prisma.listing.findMany({
        take,
        orderBy: {
          createdAt: 'desc'
        }
      });
    } else {
      listings = await prisma.listing.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  } else {
    listings = await prisma.listing.findMany({ 
      where: { 
        category: {
          equals: category,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
  
  return NextResponse.json(listings);
};