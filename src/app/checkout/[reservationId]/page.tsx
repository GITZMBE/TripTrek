'use client';

import React, { useEffect, useState } from "react";
import { Appearance, StripeElementsOptions, StripeElementsOptionsClientSecret, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/src/components/forms/CheckoutForm";
import { Reservation } from "@prisma/client";
import { ProtectedRoute, request } from "@/src/utils";
import { Container } from "@/src/components/layout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutPage = ({ params }: { params: { reservationId: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const host  = window.location.origin;

  useEffect(() => {
    const getReservation = async () => {
      const uri = `/api/reservations/${ params.reservationId }`;
      const options: RequestInit = {
        method: 'GET'
      };
      const res = await request<Reservation>(host, uri, options);
      return res;
    };
    getReservation().then(setReservation);
  }, []);

  useEffect(() => {
    if (!reservation) return;
    
    const createPaymentIntent = async () => {
      const uri = '/api/create-payment-intent';
      const options: RequestInit = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          totalPrice: reservation.totalPrice
        })
      };
      const payment = await request<StripeElementsOptionsClientSecret>(host, uri, options);
      return payment;
    };

    createPaymentIntent().then(data => setClientSecret(data.clientSecret || ''));
  }, [reservation]);

  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#222831',
      colorBackground: '#222831',
      colorText: '#ffffff',
    },
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <ProtectedRoute>
      <Container extraPadding>
        { clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </Container>
    </ProtectedRoute>
  )
}

export default CheckoutPage;