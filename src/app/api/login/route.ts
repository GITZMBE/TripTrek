import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/prisma';

export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email: email } })
  if (!user) {
    return new Response(JSON.stringify({ message: "User with that email does not exist!" }), { status: 404 });
  };

  const correctPassword = bcrypt.compareSync(password, user?.hashedPassword);
  if (!correctPassword) {
    return new Response(JSON.stringify({ message: "Incorrect password!" }), { status:  401 });
  };

  const token = jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET!);

  return new Response(JSON.stringify({ user: user, token: token }), { status: 200 });
};