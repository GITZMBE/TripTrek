import { Category, Chat, Listing, MemberOnChat, Message, User } from "@prisma/client";
import { ExtendedMemberOnChat } from "./ExtendedMemberIOnChat";
import { ExtendedMessage } from "./ExtendedMessage";

/**
 * @extends Chat
 * @property {Listing & { category: Category }} listing - extended by Category
 * @property {User} owner - The one created the initiated the chat
 * @property {ExtendedMemberIOnChat[]} members - Users who can see and write in the chat
 * @property {ExtendedMessage[]} messages - messages written to the chat
 */
export interface ExtendedChat extends Chat { 
  listing: Listing & { category: Category };
  owner: User;
  members: ExtendedMemberOnChat[];
  messages: ExtendedMessage[];
};

export default ExtendedChat;