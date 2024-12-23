"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ComponentPropsWithoutRef } from "react";
import { format } from "date-fns";
import { RxAvatar } from "react-icons/rx";
import { request } from "@/src/utils";

interface ReservationCardProps extends ComponentPropsWithoutRef<"button"> {
  reservation: Reservation & { listing: Listing; user: User };
}

export const BookedCard = ({ reservation, ...props }: ReservationCardProps) => {
  const router = useRouter();

  const host = window.location.origin;
  const uri = `/api/reservations/${reservation.id}`;

  const handleAccept = () => {
    const options: RequestInit = { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accept: true
      })
    };
    request<Reservation>(host, uri, options);
    router.refresh();
  };

  const handleDecline = () => {
    const options: RequestInit = { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accept: false
      })
    };
    request<Reservation>(host, uri, options);
    router.refresh();
  };

  return (
    <button
      onClick={() => router.push(`/reservations/${reservation.id}`)}
      {...props}
      className='group relative flex flex-col gap-4 w-64 aspect-square rounded-xl shadow-lg overflow-hidden'
    >
      <div
        className={`absolute top-0 bottom-[168px] sm:bottom-0 group-hover:bottom-[168px] w-full transition-all overflow-hidden rounded-xl z-10`}
      >
        <img
          src={reservation.listing.imageSrc}
          className='w-full h-full object-cover object-center'
          alt=''
        />
      </div>
      <div className='absolute bottom-0 flex flex-col w-full px-4 py-2 transition-all overflow-y-hidden'>
        <h1 className='w-full text-xl text-light font-bold text-center text-ellipsis text-capitalize'>
          {reservation.listing.title}
        </h1>
        <div className='flex justify-between items-center text-light'>
          <span>From</span>
          <span>To</span>
        </div>
        <div className='flex justify-between items-center text-grey mb-2'>
          <span>{format(reservation.startDate, "yy-MM-dd")}</span>
          <span>{format(reservation.endDate, "yy-MM-dd")}</span>
        </div>
        <p className='flex justify-between items-center gap-2 w-full text-left text-grey text-nowrap overflow-hidden'>
          Booked by: 
          <span className="flex items-center gap-2" onClick={e => {e.stopPropagation(); router.push(`${window.location.origin}/users/${reservation.user.id}`)}}>
            <span className="max-w-24 text-nowrap overflow-ellipsis overflow-hidden">
              {reservation.user.name}
            </span>
            { (reservation.user.avatar || reservation.user.image) ? (
              <img src={ reservation.user.avatar || reservation.user.image || '' } className="w-8 aspect-square rounded-full object-cover object-center" alt="" />
            ) : (
              <RxAvatar size={32} className='text-grey' />
            )}
          </span>
        </p>
        <div className={`flex ${ (reservation.isAccepted === true || reservation.isAccepted === false) ? 'justify-between items-center gap-2' : 'flex-col'} pt-2`}>
          { reservation.isPaid ? (
            <p className='text-light pb-2'>Paid</p>
          ) : (
            <p className='text-light pb-2'>Not Paid</p>
          )}
          { (reservation.isAccepted === undefined || reservation.isAccepted === null) ? (
            <div className="flex w-full justify-between items-center gap-2">
              <span className="bg-transparent border-2 border-accept hover:bg-accept text-light w-full rounded-lg transition" onClick={e => { e.stopPropagation(); handleAccept() }}>Accept</span>
              <span className="bg-transparent border-2 border-love hover:bg-love text-light w-full rounded-lg transition" onClick={e => { e.stopPropagation(); handleDecline() }}>Decline</span>            
            </div>
          ) : reservation.isAccepted ? (
            <p className="text-center text-light">Accepted</p>
          ) : (
            <p className="text-center text-light">Declined</p>
          )}
        </div>
      </div>
    </button>
  );
};

export default BookedCard;
