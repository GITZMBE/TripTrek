import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request) => {
  const { totalPrice } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "USD",
    automatic_payment_methods: {
      enabled: true,
    }
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
};