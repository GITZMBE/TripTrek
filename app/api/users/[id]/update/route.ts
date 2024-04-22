import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, context: any) => {
  const { params } = context;
  const { id } = params;

  try {
    const { name, email, password, avatar, avatarUrl } = await req.json();

    const dataToUpdate: any = {};
    if (name && name.trim() !== '') {
      dataToUpdate.name = name;
    }
    if (email && email.trim() !== '') {
      dataToUpdate.email = email;
    }
    if (password && password.trim() !== '') {
      const hashedPassword = bcrypt.hashSync(password, 10);
      dataToUpdate.hashedPassword = hashedPassword;
    }
    if (avatarUrl && avatarUrl.trim() !== '') {
      dataToUpdate.avatar = avatarUrl
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: dataToUpdate
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
