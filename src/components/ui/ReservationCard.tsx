"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ComponentPropsWithoutRef } from "react";
import { format } from "date-fns";
import { request } from "@/src/utils";

interface ReservationCardProps extends ComponentPropsWithoutRef<"button"> {
  reservation: Reservation & { listing: Listing; user: User };
}

export const ReservationCard = ({
  reservation,
  ...props
}: ReservationCardProps) => {
  const router = useRouter();

  const cancelReservation = async () => {
    const host = window.location.origin;
    const uri = `/api/reservations/${reservation.id}`;
    const options: RequestInit = { 
      method: "DELETE" 
    };
    const deletedReservation = await request<Reservation>(host, uri, options);
    return deletedReservation;
  };

  const handleCancelReservation = async () => {
    const deletedReservation = await cancelReservation();
    router.refresh();
  };
  
  return (
    <button onClick={() => reservation.isAccepted && router.push(`/reservations/${reservation.id}`)} {...props}
      className={`group relative flex flex-col gap-4 w-64 aspect-square rounded-xl shadow-lg overflow-hidden ${ !reservation.isAccepted && "opacity-50" }`}
    >
      <div
        className={`absolute top-0 bottom-[164px] sm:bottom-0 group-hover:bottom-[164px] w-full transition-all overflow-hidden rounded-xl z-10 ${
          reservation.isAccepted === false && "bg-cancel"
        }`}
      >
        <img
          src={reservation.listing.imageSrc}
          className={`w-full h-full object-cover object-center ${
            reservation.isAccepted === false && "opacity-50"
          }`}
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
        <div className="w-full flex justify-between items-center">
          { reservation.isAccepted === undefined || reservation.isAccepted === null ? (
            <p className='text-light pb-2'>Pending...</p>
          ) : reservation.isAccepted ? (
            <p className='text-light pb-2'>Accepted</p>
          ) : (
            <p className='text-light pb-2'>Declined</p>
          )}
          { reservation.isPaid ? (
            <p className='text-light pb-2'>Paid</p>
          ) : (
            <p className='text-light pb-2'>Not Paid</p>
          )}
        </div>
        <span
          className='w-full py-1 px-2 text-white opacity-50 hover:opacity-100 rounded-lg bg-cancel'
          onClick={(e) => {
            e.stopPropagation();
            handleCancelReservation();
          }}
        >
          Cancel Reservation
        </span>
      </div>
    </button>
  );
};

export default ReservationCard;
