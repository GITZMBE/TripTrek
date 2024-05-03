import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { text, userId, chatId } = await req.json();

  const addedMessage = await prisma.message.create({
    data: {
      userId,
      chatId,
      text
    },
  });

  return NextResponse.json(addedMessage);
}