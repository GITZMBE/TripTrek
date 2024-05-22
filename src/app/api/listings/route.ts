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
        },
        include: {
          category: true
        }
      });
    } else {
      listings = await prisma.listing.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          category: true
        }
      });
    }
  } else {
    const findCategory = await prisma.category.findFirst({
      where: {
        type: category
      },
      include: {
        listings: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    listings = findCategory?.listings || [];
  }
  
  return NextResponse.json(listings);
};