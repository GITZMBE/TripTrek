import prisma from "@/prisma";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
  const { email, username, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({ where: { email: email } })
  if (existingUser) {
    return new Response(JSON.stringify({ message: "That email is already connected to a user" }));
  };

  const data = {
    email: email,
    name: username,
    hashedPassword: hashedPassword
  };
  const user = await prisma.user.create({
    data: data
  });

  return new Response(JSON.stringify({ data: user }), { status: 200 });
};