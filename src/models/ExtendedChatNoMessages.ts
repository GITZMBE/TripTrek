import { Category, Chat, Listing, User } from "@prisma/client";

export interface ExtendedChatNoMessages extends Chat {
  owner: User;
  members: User[];
  listing: Listing & { category: Category };
};

export default ExtendedChatNoMessages;