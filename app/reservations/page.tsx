"use client";

import { DataLoader } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import { BookedCard } from "@/src/components/ui";
import { useCurrentUser } from "@/src/hooks";
import { Listing, Reservation, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

const ReservationsPage = () => {
  const { currentUser: user } = useCurrentUser();

  const getUserReservations = async () => {
    const res = await fetch(`${window.location.origin}/api/reservations?authorId=${user?.id}`,{ 
      method: "GET",
    });
    const userRes: (Reservation & { listing: Listing, user: User })[] = await res.json() || [];
    return userRes;
  };

  const renderUnhandledReservations = (data: (Reservation & { listing: Listing, user: User })[]) => {
    return data.map((reservation) => reservation.isAccepted === undefined ? (
      <BookedCard key={reservation.id} reservation={reservation} />
    ) : <></>);
  };

  const renderAcceptedReservations = (data: (Reservation & { listing: Listing, user: User })[]) => {
    return data.map((reservation) => reservation.isAccepted ? (
      <BookedCard key={reservation.id} reservation={reservation} />
    ) : <></>);
  };

  const noUnhandledReservations = (
    <div className='w-full flex flex-col items-center gap-8'>
      <img src='/nothing_unhandled.png' className='w-32 opacity-50' alt='' />
      <h1 className='text-light text-2xl'>No Reservations of your listings are unhandled</h1>
    </div>
  );

  return (
    <Container extraPadding>
      <h1 className='text-4xl text-light leading-[60px]'>Reservations of your listings</h1>
      <div className="w-full flex flex-col gap-2">
        <h2 className="w-full text-2xl text-grey">Unhandled Reservations</h2>
        <DataLoader fetchData={getUserReservations} renderData={renderUnhandledReservations} noDataContent={noUnhandledReservations} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <h2 className="w-full text-2xl text-grey">Accepted Reservations</h2>
        <DataLoader fetchData={getUserReservations} renderData={renderAcceptedReservations} noDataContent={<></>} />
      </div>      
    </Container>
  );
};

export default ReservationsPage;
