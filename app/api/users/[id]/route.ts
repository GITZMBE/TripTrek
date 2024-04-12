import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import imageToBase64, {} from 'image-to-base64';

export const PUT = async (req: Request, context: any) => {
  const { params } = context;
  const { id } = params;

  try {
    const { name, email, password, avatar } = await req.json();
    console.log({name, email, password, avatar})

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
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(avatar);
      // reader.onloadend = () => {
      //     var array = new Uint8Array(reader.result);
      //     for (var i = 0; i < array.length; i++) {
      //         fileByteArray.push(array[i]);
      //      }
      // }
      // console.log(avatar)
      // const avatarAsBase64 = await imageToBase64(avatar);
      // console.log(avatarAsBase64)
      dataToUpdate.avatar = avatar;
    }

    console.log(dataToUpdate)

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
