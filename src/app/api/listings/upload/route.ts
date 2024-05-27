import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const {
    categoryId,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    image,
    title,
    description,
    price,
    userId
  } = body;

  try {
    if (!userId) throw new Error("You need to be logged in");

    const formData = {
      categoryId,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc: image,
      title,
      description,
      price: parseFloat(price),
      userId
    };
  
    const createdListing = await prisma.listing.create({ data: formData });

    return NextResponse.json(createdListing, { status: 201 });
  } catch(error: any) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
};