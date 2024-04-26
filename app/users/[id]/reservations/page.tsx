"use client";

import { DataLoader } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import { ReservationCard } from "@/src/components/ui";
import { Reservation } from "@prisma/client";
import Link from "next/link";
import React from "react";

const ReservationsPage = ({ params }: { params: { id: string } }) => {
  const getUserReservations = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + `/api/users/${params.id}/reservations`,
      { method: "GET" }
    );
    const userRes: Reservation[] = (await res.json()) || [];
    return userRes;
  };

  const renderReservations = (data: Reservation[]) => {
    return data.map((reservation: Reservation) => (
      <ReservationCard key={reservation.id} reservation={reservation} />
    ));
  };

  const noDataContent = (
    <div className='w-full flex flex-col items-center gap-8'>
      <img src='/data_not_found.png' className='w-48 opacity-50' alt='' />
      <h1 className='text-light text-2xl'>No Reservations found</h1>
      <Link href='/' className='text-grey hover:text-light'>
        Go back to main page
      </Link>
    </div>
  );

  return (
    <Container extraPadding>
      <h1 className='text-4xl text-light leading-[60px]'>Reservations</h1>
      <DataLoader fetchData={getUserReservations} renderData={renderReservations} noDataContent={noDataContent} />
    </Container>
  );
};

export default ReservationsPage;
