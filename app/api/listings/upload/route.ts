import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
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
    userId
  } = body;

  try {
    if (!userId) throw new Error("You need to be logged in");

    const formData = {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc: image,
      title,
      description,
      price: parseInt(price),
      userId
    };
  
    const createdListing = await prisma.listing.create({ data: formData });

    return NextResponse.json(createdListing);
  } catch(error: any) {
    console.log(error)
    return NextResponse.json(error);
  }
};