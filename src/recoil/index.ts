import { atom } from "recoil";
import { User } from "@prisma/client";

type UserToken = { 
  user: User; 
  token: string;
};

export const loggedInUserState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});
