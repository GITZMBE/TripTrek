import { atom } from "recoil";
import { PrismaClient } from "@prisma/client";

export const loggedInUserState = atom<PrismaClient['user'] | null>({
  key: 'userState',
  default: null
});