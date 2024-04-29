import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const {
      category, 
      location, 
      guestCount, 
      roomCount, 
      bathroomCount, 
      image, 
      title, 
      description, 
      price, 
    } = await req.json();

    const formData = {
      category: category.category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc: image,
      title,
      description,
      price: parseInt(price)
    };

    const dataToUpdate: any = {};
    if (formData.category && formData.category.trim() !== '') {
      dataToUpdate.category = category;
    }
    if (formData.locationValue && formData.locationValue.trim() !== '') {
      dataToUpdate.locationValue = formData.locationValue;
    }
    if (formData.guestCount && formData.guestCount.trim() > 0) {
      dataToUpdate.guestCount = formData.guestCount;
    }
    if (formData.roomCount && formData.roomCount.trim() > 0) {
      dataToUpdate.roomCount = formData.roomCount;
    }
    if (formData.bathroomCount && formData.bathroomCount.trim() > 0) {
      dataToUpdate.bathroomCount = formData.bathroomCount;
    }
    if (formData.imageSrc && formData.imageSrc.trim() !== '') {
      dataToUpdate.imageSrc = formData.imageSrc;
    }
    if (formData.title && formData.title.trim() !== '') {
      dataToUpdate.title = formData.title;
    }
    if (formData.description && formData.description.trim() !== '') {
      dataToUpdate.description = formData.description;
    }
    if (formData.price && formData.price > 0) {
      dataToUpdate.price = formData.price;
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