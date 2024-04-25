'use client';

import { Container } from '@/src/components/layout';
import { LoadingAnimation, ReservationCard } from '@/src/components/ui';
import { useLoading } from '@/src/hooks';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Reservation } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ReservationsPage = ({ params }: { params: { id: string } }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const {isLoading, setIsLoading} = useLoading();

  const getUserReservations = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${params.id}/reservations`, { method: 'GET' });
    const userRes: Reservation[] = await res.json() || [];
    setReservations(userRes);
    setIsLoading(false);
    return userRes;
  };

  useEffect(() => {
    getUserReservations();
    
  }, [params]);

  return (
    <Container>
      <h1 className='text-4xl text-light leading-[60px]'>Reservations</h1>
      <div className='w-full flex flex-wrap justify-start gap-4 py-4'>
        {reservations.length > 0 ? reservations.map((reservation: Reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        )) : isLoading ? (
          <div className='flex justify-center w-full'>
            <LoadingAnimation className='w-28 aspect-square' />
          </div>
        ) : (
          <div className='w-full flex flex-col items-center gap-8'>
            <img src="/data_not_found.png" className='w-48 opacity-50' alt="" />
            <h1 className='text-light text-2xl'>No Listings found</h1>
            <Link href='/' className='text-grey hover:text-light'>Go back to main page</Link>
          </div>
        )}
      </div>
    </Container>
  )
}

export default ReservationsPage;