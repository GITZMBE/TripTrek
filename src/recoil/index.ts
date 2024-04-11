import { atom } from "recoil";
import { User } from "@prisma/client";

export const loggedInUserState = atom<{ user: User, token: string } | null>({
  key: 'userState',
  default: null
});