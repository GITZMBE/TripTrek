import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const queryData: any = {};
  let memberIds: string[] = [];
  const userId = searchParams.get("userId");
  if (userId) {
    memberIds.push(userId);
  }
  const chatToId = searchParams.get("chatToId");
  if (chatToId) {
    memberIds.push(chatToId);
  }

  // if (userId || chatToId) {
  //   queryData.memberIds = {
  //     hasEvery: memberIds,
  //   };
  // }
  if (memberIds.length > 0) {
    queryData.members = {
      some: {
        memberId: {
          in: memberIds,
        },
      },
    };
  }

  const listingId = searchParams.get("listingId");
  if (listingId) {
    queryData.listingId = listingId;
  }

  const chats = await prisma.chat.findMany({
    where: queryData,
    include: {
      owner: true,
      members: {
        include: {
          member: true,
        }
      },
      listing: {
        include: {
          category: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: true
        }
      },
    },
  });

  return NextResponse.json(chats);
};

export const POST = async (req: Request) => {
  const { title, userId, chatToId, listingId } = await req.json();

  if (!userId && !chatToId) {
    return NextResponse.json({
      message: "Required properties weren't provided",
    });
  }

  let newChat;
  let dataQuery: any = {
    members: { 
      create: []
    },
  };

  if (userId) {
    dataQuery.ownerId = userId;
    dataQuery.members = { 
      create: [
        ...dataQuery.members.create, 
        { 
          member: { 
            connect: { 
              id: userId
            } 
          } 
        }
      ]
    };
  }
  if (title && title.trim() !== "") {
    dataQuery.title = title.trim();
  }
  if (chatToId) {
    dataQuery.members = { 
      create: [
        ...dataQuery.members.create, 
        { 
          member: { 
            connect: { 
              id: chatToId
            } 
          } 
        }
      ]
    };
  }
  if (listingId) {
    dataQuery.listingId = listingId;
  }

  newChat = await prisma.chat.create({
    data: dataQuery,
    include: {
      owner: true,
      members: {
        include: {
          member: true
        }
      },
      listing: {
        include: {
          category: true,
        },
      },
      messages: {
        include: {
          user: true,
        }
      },
    },
  });

  return NextResponse.json(newChat);
};
