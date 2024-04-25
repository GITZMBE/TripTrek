'use client';

import { Container } from '@/src/components/layout';
import { Reservation } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaArrowDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { useLoading } from '@/src/hooks';
import { LoadingAnimation } from '@/src/components/ui';

const ReservationPage = ({ params }: { params: { id: string, reservationId: string } }) => {
  const [reservation, setReservation] = useState<Reservation>();
  const {isLoading, setIsLoading} = useLoading();
  const getReservation = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/reservations/${params.reservationId}`);
    const reserv: Reservation = await res.json();
    setReservation(reserv);
    setIsLoading(false);
    return reserv;
  };

  const handleDownload = () => {
    if (reservation) {
      const doc = new jsPDF();
      
      const reservationJSON = JSON.stringify(reservation, null, 2);
      doc.text(reservationJSON, 10, 10);
      doc.save(`reservation_${ reservation.id }.pdf`);      
    }
  };

  useEffect(() => {
    getReservation();
  }, [params]);

  return (
    <Container center>
      <h1 className='text-4xl text-light'>Information about your reservation</h1>
      <div className='flex flex-col items-center gap-8 w-full max-w-[550px]'>
        { reservation ? (
          <>
            <div className='flex flex-col gap-2 w-full text-grey'>
              <span>ID: { reservation.id }</span>
              <span>Arrival Date: { format(reservation.startDate, 'yy-MM-dd') }</span>
              <span>Last Date: { format(reservation.endDate, 'yy-MM-dd') }</span>
              <span>Reserved by: { reservation.userId }</span>
            </div>
            <div className='w-full flex justify-start'>
              <button className='flex items-center gap-2 text-grey border-grey border-2 py-2 px-4 hover:text-light hover:border-light' onClick={handleDownload}>
                <span>Download as PDF</span>
                <FaArrowDown size={20} className='pl-2 border-grey border-l-[1px]' />
              </button>              
            </div>
          </>
        ) : isLoading ? (
            <LoadingAnimation className='w-28 aspect-square' />
        ) : (
          <div className='flex flex-col gap-4 items-center text-secondary py-12'>
            <img src="/data_not_found.png" className='w-48 opacity-50' alt="" />
            <p className='text-2xl'>No reservation found</p>
          </div>
        )}
        <div className='flex justify-between w-full'>
          <Link href='/' className='flex gap-2 items-center py-2 px-4 rounded-lg bg-secondary text-grey hover:text-light'>
            <FaAngleDoubleLeft size={24} />
            <span>Back Home</span>
            </Link>
          <Link href={`/users/${params.id}/reservations`} className='flex gap-2 items-center py-2 px-4 rounded-lg bg-secondary text-grey hover:text-light'>
            <span>Your reservations</span>
            <FaAngleDoubleRight size={24} />
          </Link>
        </div>        
      </div>      
    </Container>
  )
}

export default ReservationPage;