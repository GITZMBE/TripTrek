'use client';

import { Container } from '@/src/components/layout'
import { Calendar, Filter, Icon, LoadingAnimation } from '@/src/components/ui';
import FavoriteButton from '@/src/components/ui/FavoriteButton';
import { Category, Listing, Reservation, User } from '@prisma/client';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useCountries, useCurrentUser, useErrorMessage, useLoading } from '@/src/hooks';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { DateValue, RangeValue } from '@nextui-org/react';
import { dateValueToDate, request } from '@/src/utils';
import { CountryModel } from '@/src/models';
import { toast } from 'react-toastify';
import ListingForm from '@/src/components/forms/ListingForm';
import 'leaflet/dist/leaflet.css';
const Map = dynamic(() => import('@/src/components/listingSteps/ui/Map'), {
  ssr: false,
});

const ListingPage = ({ params }: { params: { id: string} }) => {
  const { currentUser: user } = useCurrentUser();
  const [listing, setListing] = useState<(Listing & { reservations: Reservation[], user: User, category: Category }) | null>(null);
  const [location, setLocation] = useState<CountryModel | null>(null);
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const {errorMessage, setErrorMessage} = useErrorMessage(null);
  const [nightCount, setNightCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(listing?.price || 0);
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>();
  const { getByValue } = useCountries();

  const getListing = async () => {
    const host = window.location.origin;
    const uri = `/api/listings/${params.id}`;
    const options: RequestInit = {
      method: 'GET',
      cache: 'no-cache'
    };
    const list = await request<Listing & { reservations: Reservation[], user: User, category: Category }>(host, uri, options);
    setListing(list);
    return list;
  };

  const getLocation = (value: string) => {
    const country = getByValue(value) || null;
    return country;
  };

  useEffect(() => {
    getListing().then(setListing);
  }, []);

  useEffect(() => {
    if (!listing) return;

    const loc = getLocation(listing.locationValue);
    setLocation(loc);
  }, [listing]);

  const isValidReservation = dateRange !== undefined && dateRange.start !== undefined && dateRange.end !== undefined && listing?.id && totalPrice > 0;

  const makeReservation = async () => {
    if (!user) {
      toast.error('Sign in before renting a property');
      return;
    }

    try {
      if (isValidReservation) {
        setIsLoading(true);
        const host = window.location.origin;
        const uri = '/api/reservations';
        const options: RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user?.id,
            listingId: listing?.id,
            startDate: dateValueToDate(dateRange.start!),
            endDate: dateValueToDate(dateRange.end!),
            totalPrice: totalPrice
          })
        };
        const reservation = await request<Reservation & { listing: Listing }>(host, uri, options);
        toast.success(`Reservation made for '${reservation.listing.title}'`);
        router.push(`/reservations/${reservation.id}`);
        return reservation;
      }
    } catch (err: any) {
      setErrorMessage(err);
    } finally {
      setDateRange(undefined);
      setIsLoading(false);
    }
  };

  const handleClickChatButton = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();

    if (!user) {
      toast.error('Sign in before chatting');
      return;
    }

    router.push(`${window.location.origin}/chatroom?chatToId=${listing?.user.id}&listingId=${listing?.id}`);
  };

  return (
    <Container banner={user?.id !== listing?.userId} extraPadding={user?.id === listing?.userId}>
      { (listing && location) && (
        user?.id === listing?.userId ? (
          <ListingForm listing={listing} location={location} category={listing.category} />
        ) : (
          <div className='w-full min-h-screen'>
            <div className={`relative w-full h-[80vh] md:h-[50vh] bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url('${listing.imageSrc}')` }}>
              <Filter center>
                <h1 className='text-4xl sm:text-6xl text-light text-center font-bold text-wrap leading-[80px]'>{ listing.title }</h1>
                <FavoriteButton listing={listing} /> 
              </Filter>
            </div>
            <div className='flex flex-col items-center py-4 px-4 sm:px-8 md:px-12'>
              <div className='w-full max-w-[900px]'>
                { location && (
                  <>
                    <div className='text-2xl text-light'>
                      <span>{ listing.title }</span>
                      <span className='capitalize'>, { listing.category.type }</span>
                    </div>
                    <div className='w-full text-grey text-base'>
                      <span>{ location.region }, { location.label }</span>
                    </div>
                  </>
                )}
                <hr className='w-full border-secondary my-4' />
                <div className='w-full flex justify-between items-center'>
                  <button className='w-fit flex items-center gap-2 cursor-pointer' onClick={e => { router.push(`/users/${ listing.user.id }`)}}>
                    <span className='text-light'>{ listing.user.name }</span>
                    <img src={ listing.user.avatar || listing.user.image || '' } className='w-8 aspect-square rounded-full object-center object-cover' alt="" />
                  </button>
                  <button onClick={handleClickChatButton}>
                    <Icon icon='chatbubble' size={24} className='text-secondary hover:text-grey cursor-pointer' />
                  </button>
                </div>
                <div className='w-full flex gap-4 text-grey text-base'>
                  <span>{ listing.guestCount } guests</span>
                  <span>{ listing.roomCount } rooms</span>
                  <span>{ listing.bathroomCount } bathrooms</span>
                </div>
                <hr className='w-full border-secondary my-4' />
                <div className='flex gap-2 items-center sm:items-end'>
                  <Icon icon={ listing.category.type } size={40} className='w-10' />
                  <span className='text-light capitalize leading-7 cursor-default'>{ listing.category?.type }</span>
                </div>
                <hr className='w-full border-secondary my-4' />
                <p className='text-grey font-bold'>{ listing.description }</p>
                <hr className='w-full border-secondary my-4' />
                <div className='w-full flex flex-col md:flex-row flex-nowrap gap-4'>
                  { location && (
                    <Map center={location.latlng} />
                  )}
                  <Calendar 
                    price={listing.price}
                    nightCount={nightCount}
                    setNightCount={setNightCount}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    onChangeDate={setDateRange}
                    dateRange={dateRange}
                    reservations={listing?.reservations}
                  />
                </div>              
              </div>
            </div>
            <p className='text-error'>{ errorMessage }</p>
            <div className='w-full flex justify-center items-center mt-8'>
              <button 
                className={`flex gap-4 text-grey py-2 px-4 rounded-lg transition bg-secondary ${ (isLoading || !isValidReservation) ? 'hover:text-grey hover:bg-secondary cursor-not-allowed' : 'hover:text-light hover:bg-grey' }`} 
                disabled={isLoading || !isValidReservation} 
                onClick={() => (isLoading || !isValidReservation) ? setErrorMessage('Choose date range before making reservation') : makeReservation()}
              >
                <span>Rent listing</span>
                { isLoading && <LoadingAnimation className='w-12 aspect-square' /> }
              </button>
            </div>
          </div>
        )
      )}
    </Container>
  )
}

export default ListingPage;