'use client';

import { DataLoader, NoDataContent } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import { LoadingAnimation, ReservationCard } from "@/src/components/ui";
import { useCurrentUser } from "@/src/hooks";
import { request } from "@/src/utils";
import { Listing, Reservation, User } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TripsPage = () => {
  const { currentUser: user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[] & { listing: Listing, user: User }[]>([]);

  const getUserReservations = async () => {
    const host = window.location.origin;
    const uri = `/api/reservations?userId=${user?.id}`;
    const options: RequestInit = {
      method: 'GET',
    };
    const userReservations = await request<Reservation[] & { listing: Listing, user: User }[]>(host, uri, options) || [];
    return userReservations;
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      getUserReservations().then(setReservations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Container extraPadding>
      <h1 className='text-4xl text-light leading-[60px]'>My Trips</h1>
      <DataLoader>
        { isLoading ? (
          <LoadingAnimation className="w-full" />
        ) : reservations.length !== 0 ? (
          reservations.map((reservation, i) => (
            <ReservationCard key={i} reservation={reservation as Reservation & { listing: Listing, user: User }} />
          ))
        ) : (
          <NoDataContent label='No Reservations found' image="/data_not_found.png" >
            <Link href='/' className='text-grey hover:text-light'>
              Go back to main page
            </Link>
          </NoDataContent>
        )}
      </DataLoader>
    </Container>
  );
};

export default TripsPage;
