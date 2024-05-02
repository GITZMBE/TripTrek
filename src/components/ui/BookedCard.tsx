"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { useCurrentUser } from "@/src/hooks";

interface ReservationCardProps extends ComponentPropsWithoutRef<"button"> {
  reservation: Reservation & { listing: Listing; user: User };
}

export const BookedCard = ({ reservation, ...props }: ReservationCardProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/reservations/${reservation.id}`)}
      {...props}
      className='group relative flex flex-col gap-4 w-64 aspect-square rounded-xl shadow-lg overflow-hidden'
    >
      <div
        className={`absolute top-0 bottom-0 group-hover:bottom-[132px] w-full transition-all overflow-hidden rounded-xl z-10`}
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
              <img src={ reservation.user.avatar || '' } className="w-8 aspect-square rounded-full object-cover object-center" alt="" />
            </span>
        </p>
      </div>
    </button>
  );
};

export default BookedCard;
