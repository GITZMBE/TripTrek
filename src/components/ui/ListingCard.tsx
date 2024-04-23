'use client';

import { Listing } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React from 'react'
import FavoriteButton from './FavoriteButton';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing, ...props }: ListingCardProps) => {
  const router = useRouter();

  return (
    <button onClick={() => router.push(`/listings/${listing.id}`)} { ...props } className='group relative w-64 aspect-square rounded-xl shadow-lg overflow-hidden'>
      <img src={ listing.imageSrc } className='absolute top-0 w-full h-full object-cover object-center transition group-hover:scale-110' alt="" />
      <div className='absolute top-0 flex justify-center items-center w-full h-full transition group-hover:backdrop-brightness-50 z-10'>
        <h1 className='w-full px-4 text-xl text-light font-bold text-center text-ellipsis text-capitalize'>{ listing.title }</h1>
        <FavoriteButton listing={listing} />
      </div>
    </button>
  )
}

export default ListingCard;