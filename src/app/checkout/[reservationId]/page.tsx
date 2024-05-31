'use client';

import React, { useEffect, useState } from "react";
import { Appearance, StripeElementsOptions, StripeElementsOptionsClientSecret, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/src/components/forms/CheckoutForm";
import { ProtectedRoute, getOrdinal, request } from "@/src/utils";
import { Container } from "@/src/components/layout";
import { ExtendedReservation } from "@/src/models";
import { format } from 'date-fns';
import { Icon } from "@/src/components/ui";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutPage = ({ params }: { params: { reservationId: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [reservation, setReservation] = useState<ExtendedReservation | null>(null);

  const host  = window.location.origin;

  useEffect(() => {
    const getReservation = async () => {
      const uri = `/api/reservations/${ params.reservationId }`;
      const options: RequestInit = {
        method: 'GET'
      };
      const res = await request<ExtendedReservation>(host, uri, options);
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
      <Container extraPadding center>
        <div className="flex w-full max-w-[1200px] flex-grow rounded-lg overflow-hidden shadow-lg">
          <div style={{ backgroundImage: `url('${reservation?.listing.imageSrc}')`, backgroundPosition: 'center', backgroundSize: 'cover' }} className="w-full flex-grow transition-size">
            <div className="w-full h-full flex flex-col justify-end gap-2 py-8 px-4 bg-gradient-to-b from-transparent to-black">
              <h2 className="text-xl text-grey">{ reservation?.listing.title }</h2>
              <p className="text-3xl text-light">USD { reservation?.totalPrice.toFixed(2)}</p>
              <div className="flex justify-between items-center w-full pt-6 text-light">
                <span>{ `${format(reservation?.startDate || new Date(), 'MMMM')} ${ getOrdinal(+format(reservation?.startDate || new Date(), 'd')) }` }</span>
                <Icon icon="longarrowright" size={32} className="text-light" />
                <span>{ `${format(reservation?.endDate || new Date(), 'MMMM')} ${ getOrdinal(+format(reservation?.endDate || new Date(), 'd')) }` }</span>
              </div>
            </div>
          </div>
          { clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </Container>
    </ProtectedRoute>
  )
}

export default CheckoutPage;