import { User } from "@prisma/client";

export const getLoggedInUser = () => {
  const res = sessionStorage.getItem('loggedInUser');
  if (!res) return undefined;
  const user: User = JSON.parse(res);
  return user;
};

export default getLoggedInUser;