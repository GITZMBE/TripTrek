'use client';

import { Container } from '@/src/components/layout';
import { format } from 'date-fns';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaArrowDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { useCurrentUser, useLoading } from '@/src/hooks';
import { LoadingAnimation } from '@/src/components/ui';
import { toast } from 'react-toastify';
import { ProtectedRoute, request } from '@/src/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExtendedReservation } from '@/src/models';

const ReservationPage = ({ params }: { params: { reservationId: string } }) => {
  const { currentUser: user } = useCurrentUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [redirectStatus, setRedirectStatus] = useState<string | null>(null);
  const [reservation, setReservation] = useState<ExtendedReservation>();
  const {isLoading, setIsLoading} = useLoading();

  const host = window.location.origin;
  const uri = `/api/reservations/${params.reservationId}`;

  const getReservation = async () => {
    try {
      setIsLoading(true);
      const options: RequestInit = {
        method: 'GET'
      };
      const res = await request<ExtendedReservation>(host, uri, options);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (reservation?.isAccepted) {
      const doc = new jsPDF();

      // Add logo image
      const logoWidth = 60; // Set the width of the logo
      const logoHeight = 14; // Set the height of the logo
      const xPosition = 10; // Set the X position of the logo
      const yPosition = 10; // Set the Y position of the logo
      doc.addImage('/logo.png', 'PNG', xPosition, yPosition, logoWidth, logoHeight);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      const paddingTop = 35;
      let currentYPosition = paddingTop;

      doc.text('Reservation Details', 10, currentYPosition);
      currentYPosition += 10;

      const { id, startDate, endDate, totalPrice, listing } = reservation;
      doc.text(`Reservation ID: ${id}`, 10, currentYPosition);
      currentYPosition += 10;
      doc.text(`Start Date: ${ format(startDate, "MMMM d'th' yyyy") }`, 10, currentYPosition);
      currentYPosition += 10;
      doc.text(`End Date: ${ format(endDate, "MMMM d'th' yyyy")}`, 10, currentYPosition);
      currentYPosition += 10;
      doc.text(`Total Price: $${totalPrice}`, 10, currentYPosition);
      currentYPosition += 10;
      doc.text(`Listing Details:`, 10, currentYPosition);
      currentYPosition += 10;
      doc.text(`Title: ${listing.title}`, 15, currentYPosition);
      currentYPosition += 10;
      doc.text(`Description: ${listing.description}`, 15, currentYPosition);
      currentYPosition += 10;

      // Add a line separator
      doc.line(10, currentYPosition, 200, currentYPosition);

      doc.save(`reservation_${ reservation.id }.pdf`);
    } else {
      toast.info("You can't download the reservation before the owner has accepted you're reservation.");
    }
  };

  const handlePay = async () => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pay: true
      }),
    };
    const res = await request<ExtendedReservation>(host, uri, options);
    toast.success('Payment went through Successfully');
    return res;
  }

  useEffect(() => {
    const status = searchParams.get('redirect_status');
    setRedirectStatus(status);
  }, []);

  useEffect(() => {
    try {
      if (redirectStatus === 'succeeded') {
        handlePay().then(setReservation);
        router.push(window.location.pathname);
      }
      setIsLoading(true);
      getReservation().then(setReservation);
    } finally {
      setIsLoading(false);
    }
  }, [params, redirectStatus]);

  return (
    <ProtectedRoute>
      <Container center>
        <h1 className='text-4xl text-light'>Information about your reservation</h1>
        <div className='flex flex-col items-center gap-8 w-full max-w-[550px]'>
          { reservation ? (
            <>
              <div className='flex flex-col gap-2 w-full text-grey'>
                <p>ID: { reservation.id }</p>
                <span>Arrival Date: { format(reservation.startDate, "MMMM d'th' yyyy") }</span>
                <span>Last Date: { format(reservation.endDate, "MMMM d'th' yyyy") }</span>
                <span className='flex items-center gap-2'>Reserved by: <Link href={`/users/${ reservation.userId }`} className='flex items-center gap-2'><img src={reservation.user?.avatar || reservation.user?.image || '/male_default_avatar.png'} className='w-8 aspect-square object-center object-cover rounded-full' />{ reservation.user.name }</Link></span>
              </div>
              <div className='w-full flex justify-start'>
                <button className={`flex items-center gap-2 text-grey border-grey border-2 py-2 px-4 disabled:cursor-not-allowed ${ reservation.isAccepted && 'hover:text-light hover:border-light' }`} onClick={handleDownload} disabled={!reservation.isAccepted} >
                  <span>Download as PDF</span>
                  <FaArrowDown size={20} className='pl-2 border-grey border-l-[1px]' />
                </button>              
              </div>
              <div className='w-full space-y-2'>
                <p className='w-full text-left text-light'>
                  <span className='text-grey'>Status: </span>
                  { reservation.isAccepted === undefined || reservation.isAccepted === null ? (
                    <span>Pending...</span>
                  ) : reservation.isAccepted ? (
                    <span>Accepted</span>
                  ) : (
                    <span>Declined</span>
                  )}              
                </p>
                <p className='w-full text-left text-light'>
                  <span className='text-grey'>Payment: </span>
                  { reservation.isPaid ? (
                    <span className='text-light pb-2'>Paid</span>
                  ) : (
                    <span className='text-light pb-2'>Not Paid</span>
                  )}
                </p>
              </div>
              <div className={`w-full justify-center items-center ${ reservation.isAccepted ? 'flex' : 'hidden' }`}>
                <Link href={`/checkout/${reservation.id}`} className='flex gap-2 items-center py-2 px-4 rounded-lg bg-secondary text-center text-grey hover:text-light'>Checkout</Link>
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
          <div className='flex justify-between gap-4 w-full'>
            <Link href='/' className='flex gap-2 items-center py-2 px-4 rounded-lg bg-secondary text-grey hover:text-light'>
              <FaAngleDoubleLeft size={24} />
              <span className='w-full text-nowrap text-ellipsis'>Back Home</span>
            </Link>
            { reservation?.userId === user?.id ? (
              <Link href={`/trips`} className='flex gap-2 items-center py-2 px-4 rounded-lg bg-secondary text-right text-grey hover:text-light'>
                <span className='w-full text-nowrap text-ellipsis overflow-hidden'>Your trips</span>
                <FaAngleDoubleRight size={24} />
              </Link>
            ) : reservation?.listing.userId === user?.id ? (
              <Link href={`/reservations`} className='flex gap-2 items-center py-2 px-4 rounded-lg bg-secondary text-right text-grey hover:text-light'>
                <span className='w-full text-nowrap text-ellipsis overflow-hidden'>Your reservations</span>
                <FaAngleDoubleRight size={24} />
              </Link>
            ) : (<></>)}
          </div>        
        </div>      
      </Container>
    </ProtectedRoute>
  )
}

export default ReservationPage;