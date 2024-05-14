import prisma from "@/prisma";
import { Chat } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const queryData: any = {};
  let memberIds: string[] = [];
  const userId = searchParams.get('userId');
  if (userId) {
    memberIds.push(userId);
  }
  const chatToId = searchParams.get('chatToId');
  if (chatToId) {
    memberIds.push(chatToId);
  }

  if (userId || chatToId) {
    queryData.memberIds = {
      hasEvery: memberIds,
    };
  }

  const listingId = searchParams.get('listingId');
  if (listingId) {
    queryData.listingId = listingId;
  }

  const chats = await prisma.chat.findMany({
    where: queryData,
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

  return NextResponse.json(chats);
};

export const POST = async (req: Request) => {
  const { title, userId, chatToId, listingId } = await req.json();

  if (!userId && !chatToId && !listingId) {
    return NextResponse.json({ message: "Required properties weren't provided" });
  }

  let newChat;

  if (userId && chatToId && listingId) {
    newChat = await prisma.chat.create({
      data: {
        title: title,
        ownerId: userId,
        listingId: listingId,
        memberIds: [userId, chatToId],
      }
    });
  } else if (userId && chatToId) {
    newChat = await prisma.chat.create({
      data: {
        title: title,
        ownerId: userId,
        memberIds: [userId, chatToId]
      }
    });
  }

  return NextResponse.json(newChat);
};