import { Message, User } from "@prisma/client";

export interface ExtendedMessage extends Message {
  user: User;
};