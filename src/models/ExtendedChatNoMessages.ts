import { Category, Chat, Listing, User } from "@prisma/client";

/**
 * @extends Chat
 * @property {User} owner - The one created the initiated the chat
 * @property {User[]} members - Users who can see and write in the chat
 * @property {Listing & { category: Category }} listing - extended by Category
 */
export interface ExtendedChatNoMessages extends Chat {
  owner: User;
  members: User[];
  listing: Listing & { category: Category };
};

export default ExtendedChatNoMessages;