'use client';

import { loggedInUserState } from '@/src/recoil';
import { getLoggedInUser, login } from '@/src/storage';
import { Listing } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

interface FavoriteButtonProps {
  listing: Listing;
};

const FavoriteButton = ({ listing }: FavoriteButtonProps) => {
  const [user, setUser] = useState(getLoggedInUser());

  const isFavorite = () => {
    const favorites = user?.favoriteIds || [];
    const includeUser = favorites.some((listingId: string) => listingId === listing.id);
    return includeUser;
  };

  const isOwner = () => {
    return listing.userId === user?.id;
  }

  const handleLikeListing = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user?.id}/favorites`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    });
    const updatedUser = await res.json();
    login(updatedUser);
  };

  const handleRemoveFavorite = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user?.id}/favorites`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    });
    const updatedUser = await res.json();
    login(updatedUser);
  };

  useEffect(() => {
    setUser(getLoggedInUser());
  }, []);

  return (
    <>
      { isOwner() ? (
        <span className='absolute top-4 right-4 text-light'>Owner</span>
      ) : isFavorite() ? (
        <div className='absolute top-4 right-4' onClick={e => {e.stopPropagation(); handleRemoveFavorite()}}>
          <FaHeart className='text-love cursor-pointer' />
        </div>
        
      ) : (
        <div className='absolute top-4 right-4' onClick={e => {e.stopPropagation(); handleLikeListing()}}>
          <FaRegHeart className=' text-light cursor-pointer' />
        </div>
      ) }    
    </>
  )
}

export default FavoriteButton