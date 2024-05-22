import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const { name, email, password, image } = await req.json();
    const user = await prisma.user.findUnique({ where: { id }});
    if (!user) return;

    const dataToUpdate: any = {};
    if (name && name.trim() !== '' && name !== user.name) {
      dataToUpdate.name = name;
    }
    if (email && email.trim() !== '' && email !== user.email) {
      dataToUpdate.email = email;
    }
    if (password && password.trim() !== '') {
      const isSamePassword = await bcrypt.compare(password, user.hashedPassword || '');
      if (!isSamePassword) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        dataToUpdate.hashedPassword = hashedPassword;        
      };
    }
    if (image && image.trim() !== '' && image !== null && image !== undefined && image !== user.avatar) {
      dataToUpdate.avatar = image;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: dataToUpdate
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ message: error.message.toString() });
  }
}
