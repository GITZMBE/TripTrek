import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email: email } })
  if (!user) {
    return NextResponse.json({ message: "User with that email does not exist!" });
  };
  if (user?.hashedPassword === null) {
    return NextResponse.json({ message: "User doesn't have any password" });
  };

  const correctPassword = bcrypt.compareSync(password, user.hashedPassword);
  if (!correctPassword) {
    return NextResponse.json({ message: "Incorrect password!" });
  };

  const token = jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET!);

  return NextResponse.json({ user: user, token: token });
};