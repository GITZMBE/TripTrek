import { User } from "@prisma/client";

export const login = (user: User) => {
  if (!user) return;
  const json = JSON.stringify(user);
  sessionStorage.setItem('loggedInUser', json);
  return user;
};

export default login;