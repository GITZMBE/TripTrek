import { atom } from "recoil";
import { User } from "@prisma/client";
import { getLoggedInUser } from "../storage";

type UserToken = { 
  user: User; 
  token: string;
};

export const loggedInUserState = atom<User | undefined>({
  key: "userState",
  default: getLoggedInUser(),
});
