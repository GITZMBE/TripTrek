import prisma from '@/prisma';
import bcrypt from 'bcrypt';

export const PUT = async (req: Request, context: any) => {
  const { params } = context;
  const { id } = params;

  try {
    const { name, email, password, avatar } = await req.json();
    console.log(name, email, password, avatar)

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
    if (avatar && avatar.trim() !== '') {
      dataToUpdate.avatar = avatar;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: dataToUpdate
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Could not update user information" }), { status: 500 });
  }
}
