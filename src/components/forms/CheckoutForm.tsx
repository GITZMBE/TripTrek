'use client';

import React, { FormEvent, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { LoadingAnimation } from "../ui";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { request } from "@/src/utils";
import { Reservation } from "@prisma/client";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { reservationId } = useParams();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!stripe || !elements) return;

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/reservations' + `/${reservationId}`,
        },
      });

      if (error === undefined) {
        const host = window.location.origin || process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const uri = `/api/reservations/${reservationId}`;
        const options: RequestInit = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pay: true
          }),
        };
        request<Reservation>(host, uri, options).then(r => console.log(r));
        toast.success('Payment went through Successfully');
      } else if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || null);
        return;
      } else {
        setMessage("An unexpected error occurred.");
        return;
      }
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    if (message === 'Payment succeeded!') {
      toast.success(message);
      return;
    }
    toast.error(message);
  }, [message])

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full max-w-[900px] space-y-4 p-4 transition-size">
      <h1 className="text-4xl text-light">Payment Information</h1>
      <PaymentElement id="payment-element" options={paymentElementOptions as StripePaymentElementOptions} />
      <div className="w-full flex justify-center items-center">
        <button className={`py-2 px-4 border-grey disabled:text-secondary disabled:border-secondary text-grey border-2 rounded-lg ${!(isLoading || !stripe || !elements) && 'hover:border-light hover:text-light'}`} disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {!isLoading && "Pay now"}
          </span>
          {isLoading && <LoadingAnimation className="w-24" />}
        </button>        
      </div>
      {message && <div id="payment-message" className={ message === 'Payment succeeded!' ? 'text-success' : 'text-error' }>{message}</div>}
    </form>
  );
}

export default CheckoutForm;