import { Category, Chat, Listing, Message, User } from "@prisma/client";

/**
 * @extends Chat
 * @property {Listing & { category: Category }} listing - extended by Category
 * @property {User} owner - The one created the initiated the chat
 * @property {User[]} members - Users who can see and write in the chat
 * @property {Message[]} messages - messages written to the chat
 */
export interface ExtendedChat extends Chat { 
  listing: Listing & { category: Category };
  owner: User;
  members: User[];
  messages: Message[];
};

export default ExtendedChat;