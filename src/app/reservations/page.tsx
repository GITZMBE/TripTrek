"use client";

import { DataLoader, NoDataContent } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import { BookedCard, LoadingAnimation } from "@/src/components/ui";
import { useCurrentUser } from "@/src/hooks";
import { ExtendedReservation } from "@/src/models";
import { ProtectedRoute, request } from "@/src/utils";
import { Listing, Reservation, User } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ReservationsPage = () => {
  const { currentUser: user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<ExtendedReservation[]>([]);

  const getUserReservations = async () => {
    const host = window.location.origin;
    const uri = `/api/reservations?authorId=${user?.id}`;
    const options: RequestInit = {
      method: "GET",
      cache: 'no-cache'
    };
    const userRes = await request<ExtendedReservation[]>(host, uri, options) || [];
    return userRes;
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
    <ProtectedRoute>
      <Container extraPadding>
        <h1 className='text-4xl text-light leading-[60px]'>Reservations of your listings</h1>
        <div className="w-full flex flex-col gap-2">
          <h2 className="w-full text-2xl text-grey">Unhandled Reservations</h2>
          <DataLoader >
            { isLoading ? (
              <LoadingAnimation className="w-full" />
            ) : reservations.length > 0 ? (
              reservations.map((reservation) => (reservation.isAccepted === undefined || reservation.isAccepted === null) && (
                <BookedCard key={reservation.id} reservation={reservation as Reservation & { listing: Listing; user: User }} />
              ))
            ) : (
              <NoDataContent label='No Unhandled Reservations' icon="task" iconClasses="w-32" size={128} />
            )}
          </DataLoader>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="w-full text-2xl text-grey">Accepted Reservations</h2>
          <DataLoader>
            { isLoading ? (
              <LoadingAnimation className="w-full" />
            ) : reservations.length > 0 ? (
              reservations.map((reservation) => reservation.isAccepted && (
                <BookedCard key={reservation.id} reservation={reservation as Reservation & { listing: Listing; user: User }} />
              ))
            ) : (
              <NoDataContent label='You have no handled reservations' icon="checkmark" iconClasses="w-32" size={128} />
            )}
          </DataLoader>
        </div>      
      </Container>
    </ProtectedRoute>
  );
};

export default ReservationsPage;
