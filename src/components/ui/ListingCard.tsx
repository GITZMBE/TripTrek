'use client';

import { loggedInUserState } from '@/src/recoil';
import { Listing } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing, ...props }: ListingCardProps) => {
  const [user_token, setUserToken] = useRecoilState(loggedInUserState);

  const isFavorite = () => {
    const favorites = user_token?.user.favoriteIds || [];
    const includeUser = favorites.some((listingId: string) => listingId === listing.id);
    return includeUser;
  };

  const isOwner = () => {
    return listing.userId === user_token?.user.id;
  }

  const handleLikeListing = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user_token?.user.id}/favorite`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    });
    const updatedUser = await res.json();
    setUserToken({user: updatedUser, token: user_token?.token || ""});
  };

  const handleRemoveFavorite = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user_token?.user.id}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    });
    const updatedUser = await res.json();
    setUserToken({user: updatedUser, token: user_token?.token || ""});
  };

  return (
    <Link href={`/listings/${listing.id}`} { ...props } className='group relative w-64 aspect-square rounded-xl shadow-lg overflow-hidden'>
      <img src={ listing.imageSrc } className='absolute w-full h-full object-cover object-center transition group-hover:scale-110' alt="" />
      <div className='absolute flex justify-center items-center w-full h-full transition group-hover:backdrop-brightness-50 z-10'>
        <h1 className='w-full px-4 text-xl text-light font-bold text-center text-ellipsis text-capitalize'>{ listing.title }</h1>
        { isOwner() ? (
          <span className='absolute top-4 right-4 text-light'>Owner</span>
        ) : isFavorite() ? (
          <FaHeart className='absolute top-4 right-4 text-love' onClick={e => {e.stopPropagation(); handleRemoveFavorite()}} />
        ) : (
          <FaRegHeart className='absolute top-4 right-4 text-light' onClick={e => {e.stopPropagation(); handleLikeListing()}} />
        ) }
        
      </div>
    </Link>
  )
}

export default ListingCard