import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const categories = await prisma.category.findMany({});

  return NextResponse.json(categories);
};