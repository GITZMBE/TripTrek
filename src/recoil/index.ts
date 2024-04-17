import { atom } from "recoil";
import { User } from "@prisma/client";

type UserToken = { 
  user: User; 
  token: string;
};

export const loggedInUserState = atom<UserToken | null>({
  key: "userState",
  default: null,
});
