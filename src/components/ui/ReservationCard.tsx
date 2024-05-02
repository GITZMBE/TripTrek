'use client';

import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useCurrentUser } from '@/src/hooks';

interface ReservationCardProps extends ComponentPropsWithoutRef<"button"> {
  reservation: Reservation;
};

export const ReservationCard = ({ reservation, ...props }: ReservationCardProps) => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const [listing, setListing] = useState<Listing>();

  useEffect(() => {
    const getListing = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/listings/${reservation.listingId}`);
      const list: Listing = await res.json();
      setListing(list);
      return list;
    };

    getListing();
  }, []);

  const cancelReservation = async () => {
    const res = await fetch(`${window.location.origin}/api/reservations/${reservation.id}`, { method: 'DELETE' });
    const deletedReservation = await res.json();
    return deletedReservation;
  };

  const handleCancelReservation = async () => {
    const deletedReservation = await cancelReservation();
    router.refresh();
  };

  return (
    <button onClick={() => router.push(`/reservations/${reservation.id}`)} { ...props } className='group relative flex flex-col gap-4 w-64 aspect-square rounded-xl shadow-lg overflow-hidden'>
      { listing && (
        <>
          <div className={`absolute top-0 bottom-0 group-hover:bottom-[140px] w-full transition-all overflow-hidden rounded-xl z-10`}>
            <img src={ listing.imageSrc } className='w-full h-full object-cover object-center' alt="" />
          </div>
          <div className='absolute bottom-0 flex flex-col w-full px-4 py-2 transition-all overflow-y-hidden'>
            <h1 className='w-full text-xl text-light font-bold text-center text-ellipsis text-capitalize'>{ listing.title }</h1>
            <div className='flex justify-between items-center text-light'>
              <span>From</span>
              <span>To</span>
            </div>
            <div className='flex justify-between items-center text-grey mb-2'>
              <span>{ format(reservation.startDate, 'yy-MM-dd') }</span>
              <span>{ format(reservation.endDate, 'yy-MM-dd') }</span>
            </div>
            <button className='w-full py-2 px-4 text-white opacity-50 hover:opacity-100 rounded-lg bg-cancel' onClick={e => {e.stopPropagation(); handleCancelReservation()}}>Cancel Reservation</button>
          </div>
        </>
      )}
    </button>
  )
}

export default ReservationCard;