import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  const chat = await prisma.chat.findUnique({
    where: {
      id
    },
    include: {
      owner: true,
      members: true,
      listing: true,
      messages: {
        orderBy: {
          createdAt: 'asc',
        }
      },
    }
  });

  return NextResponse.json(chat);
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { title } = await req.json();

  const currentChat = await prisma.chat.findUnique({
    where: {
      id
    }
  });

  if (title === currentChat?.title) {
    return NextResponse.json({ message: "Not a valid title value" });
  }

  if (title === undefined) {
    return NextResponse.json({ message: "Required properties weren't provided" });
  }

  const newChat = await prisma.chat.update({
    where: {
      id
    },
    data: {
      title
    },
    include: {
      owner: true,
      members: true,
      listing: true,
      messages: {
        orderBy: {
          createdAt: 'asc',
        }
      },
    }
  });

  return NextResponse.json(newChat);
};