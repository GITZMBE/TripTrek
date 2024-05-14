'use client';

import { useCurrentUser } from '@/src/hooks';
import { Listing } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface FavoriteButtonProps {
  listing: Listing;
};

const FavoriteButton = ({ listing }: FavoriteButtonProps) => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();

  const isFavorite = () => {
    const favorites = user?.favoriteIds || [];
    const includeUser = favorites.some((listingId: string) => listingId === listing.id);
    return includeUser;
  };

  const isOwner = () => {
    return listing.userId === user?.id;
  }

  const handleLikeListing = async () => {
    const res = await fetch(`${window.location.origin}/api/users/${user?.id}/favorites`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    });
    router.refresh();
  };

  const handleRemoveFavorite = async () => {
    const res = await fetch(`${window.location.origin}/api/users/${user?.id}/favorites`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    });
    router.refresh();
  };

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