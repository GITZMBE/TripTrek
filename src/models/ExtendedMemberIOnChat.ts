import { Chat, MemberOnChat, User } from "@prisma/client";

export interface ExtendedMemberOnChat extends MemberOnChat {
  member: User;
  chat: Chat;
};