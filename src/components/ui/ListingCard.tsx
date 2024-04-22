import { Listing } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing, ...props }: ListingCardProps) => {
  return (
    <Link href={`/listings/${listing.id}`} { ...props } className='relative flex justify-center items-center w-64 aspect-square rounded-xl shadow-lg overflow-hidden'>
      <img src={ listing.imageSrc } className='w-full h-full object-cover object-center' alt="" />
      <h1 className='absolute w-full px-4 text-xl text-light font-bold text-center text-ellipsis'>{ listing.title}</h1>
    </Link>
  )
}

export default ListingCard