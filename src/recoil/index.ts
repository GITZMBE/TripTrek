import { atom } from "recoil";
import { User } from "@prisma/client";

export const currentUserState = atom<User | null>({
  key: "userState",
  default: null,
});
