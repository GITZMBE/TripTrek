import { Listing } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing, ...props }: ListingCardProps) => {
  return (
    <Link href={`/listings/${listing.id}`} { ...props } className='group relative w-64 aspect-square rounded-xl shadow-lg overflow-hidden'>
      <img src={ listing.imageSrc } className='absolute w-full h-full object-cover object-center transition group-hover:scale-110' alt="" />
      <div className='absolute flex justify-center items-center w-full h-full transition group-hover:backdrop-brightness-50 z-10'>
        <h1 className='w-full px-4 text-xl text-light font-bold text-center text-ellipsis'>{ listing.title}</h1>
      </div>
    </Link>
  )
}

export default ListingCard