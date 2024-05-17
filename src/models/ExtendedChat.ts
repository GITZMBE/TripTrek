import { Category, Chat, Listing, Message, User } from "@prisma/client";

export interface ExtendedChat extends Chat { 
  listing: Listing & { category: Category };
  owner: User;
  members: User[];
  messages: Message[];
};

export default ExtendedChat;