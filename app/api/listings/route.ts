import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const listings = await prisma.listing.findMany();
  return NextResponse.json(listings);
};