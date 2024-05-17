import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { type } = await req.json();

  if (!type) return;

  const category = await prisma.category.findFirst({
    where: { 
      type 
    }
  });

  return NextResponse.json(category);
};