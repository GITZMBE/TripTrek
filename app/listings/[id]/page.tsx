'use client';

import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { Container } from '@/src/components/layout'
import { Calendar, Filter, Icontype, LoadingAnimation } from '@/src/components/ui';
import FavoriteButton from '@/src/components/ui/FavoriteButton';
import { Listing, Reservation, User } from '@prisma/client';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useCountries, useLoading } from '@/src/hooks';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/src/recoil';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { IconType } from 'react-icons';
import { getLocalTimeZone, today } from '@internationalized/date';
import { DateValue, RangeValue } from '@nextui-org/react';
import CategoryReactIconModel from '@/src/models/CategoryReactIconModel';
const Map = dynamic(() => import('../../../src/components/listingSteps/ui/Map'), {
  ssr: false,
});

const iconComponents: CategoryReactIconModel[] = [
  new CategoryReactIconModel("beach", <TbBeach className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("windmills", <GiWindmill className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("modern", <MdOutlineVilla className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("countryside", <TbMountain className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("pools", <TbPool className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("islands", <GiIsland className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("lake", <GiBoatFishing className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("skiing", <FaSkiing className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("castles", <GiCastle className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("camping", <GiForestCamp className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("artic", <BsSnow className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("cave", <GiCaveEntrance className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("desert", <GiCactus className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("barns", <GiBarn className='text-grey w-12 h-12' />),
  new CategoryReactIconModel("lux", <IoDiamond className='text-grey w-12 h-12' />),
];

const initialDateRange = { 
  start: today(getLocalTimeZone()), 
  end: today(getLocalTimeZone()).add({days: 1})
};

type Country = {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
};

const ListingPage = ({ params }: { params: { id: string} }) => {
  const user_token = useRecoilValue(loggedInUserState);
  const [listing, setListing] = useState<Listing | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const [totalPrice, setTotalPrice] = useState<number>(listing?.price || 0);
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(initialDateRange);
  const { getByValue } = useCountries();
  const [location, setLocation] = useState<Country | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [categoryIcon, setCategoryIcon] = useState<ReactElement<IconType> | null>(null);

  const getListing = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/listings/${ params.id }`, { method: "GET", cache: 'no-cache' });
    const list: Listing = await res.json();
    setListing(list);
    return list;
  };

  const getReservations = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/listings/${params.id}/reservations`);
    const data: Reservation[] = await res.json();
    setReservations(data);
    return data;
  };

  const getLocation = (value: string) => {
    const country = getByValue(value) || null;
    setLocation(country);
  };

  const getUser = async (userId: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${userId}`, {
      method: 'GET'
    });
    const u = await res.json();
    setUser(u);
    return u;
  };

  const getCategoryIcon = (cat: string) => {
    const icons = iconComponents.filter(({ category }) => category === cat);
    if (icons.length === 0) {
      return;
    };
    const icon = icons[0].icon;
    setCategoryIcon(icon);
    return icon;
  }

  const getData = async () => {
    const list = await getListing();
    const user = await getUser(list.userId);
    getLocation(list.locationValue);
    getCategoryIcon(list.category);
    const resvs = await getReservations();
  };

  useEffect(() => {
    getData();
  }, []);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const dateValueToDate = (dateVal: DateValue) => {
    return new Date(`${dateVal.year}-${dateVal.month}-${dateVal.day}`);
  };

  const makeReservation = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user_token?.user.id}/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user_token?.user.id,
        listingId: listing?.id,
        startDate: dateValueToDate(dateRange.start),
        endDate: dateValueToDate(dateRange.end),
        totalPrice: totalPrice
      })
    });
    const reservation = await res.json();
    setDateRange(initialDateRange);
    router.push(`/users/${user_token?.user.id}/reservations`);
    setIsLoading(false);
    return reservation;
  };

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      const dayCount = differenceInCalendarDays(
        dateValueToDate(dateRange.end),
        dateValueToDate(dateRange.start)
      );

      if (listing?.price !== undefined) {
        if (dayCount) {
          setTotalPrice(listing?.price * dayCount);
        } else {
          setTotalPrice(listing?.price);
        }
      }
    }
  }, [dateRange, listing?.price]);

  return (
    <Container banner>
      { listing && (
        <div className='w-full min-h-screen'>
          <div className={`relative w-full h-[50vh] bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url('${listing.imageSrc}')` }}>
            <Filter center>
              <h1 className='text-6xl text-light font-bold text-nowrap'>{ listing.title }</h1>
              <FavoriteButton listing={listing} /> 
            </Filter>
          </div>
          <div className='flex flex-col items-center py-4 px-4 sm:px-8 md:px-12'>
            <div className='w-full max-w-[900px]'>
              { location && (
                <>
                  <div className='text-2xl text-light'>
                    <span>{ listing.title }</span>
                    <span className='capitalize'>, { listing.category }</span>
                  </div>
                  <div className='w-full text-grey text-base'>
                    <span>{ location.region }, { location.label }</span>
                  </div>
                </>
              )}
              <hr className='w-full border-secondary my-4' />
              { user && (
                <div className='w-full flex items-center gap-2'>
                  <span className='text-light'>{ user.name }</span>
                  <img src={ user.avatar || '' } className='w-8 aspect-square rounded-full' alt="" />
                </div>
              )}
              <div className='w-full flex gap-4 text-grey text-base'>
                <span>{ listing.guestCount } guests</span>
                <span>{ listing.roomCount } rooms</span>
                <span>{ listing.bathroomCount } bathrooms</span>
              </div>
              <hr className='w-full border-secondary my-4' />
              <div className='flex gap-2 items-end'>
                <Icontype icon={categoryIcon} />
                <span className='text-light capitalize leading-7'>{ listing.category }</span>
              </div>
              <hr className='w-full border-secondary my-4' />
              <p className='text-secondary font-bold'>{ listing.description }</p>
              <hr className='w-full border-secondary my-4' />
              <div className='w-full flex gap-4'>
                { location && (
                  <div>
                    <Map center={location.latlng} />
                  </div>
                )}
                <Calendar 
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={setDateRange}
                  dateRange={dateRange}
                />
              </div>              
            </div>
          </div>
          <div className='w-full flex justify-center items-center mt-8'>
            <button className='flex gap-4 text-grey hover:text-light py-2 px-4 rounded-lg transition bg-secondary hover:bg-grey' disabled={isLoading} onClick={makeReservation}>
              <span>Rent listing</span>
              { isLoading && <LoadingAnimation className='w-12 aspect-square' /> }
            </button>
          </div>
        </div>
      )}
    </Container>
  )
}

export default ListingPage;