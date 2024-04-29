'use client';

import { getCurrentUser } from '@/src/actions';
import { useCurrentUser } from '@/src/hooks';
import { Listing, User } from '@prisma/client';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface FavoriteButtonProps {
  listing: Listing;
};

const FavoriteButton = ({ listing }: FavoriteButtonProps) => {
  // const { data: session } = useSession();
  // const [user, setUser] = useState<User | null>(null);
  const { currentUser: user } = useCurrentUser();

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     // why can't I use this function (because it calls prisma directly?)
  //     const user = await getCurrentUser();

  //     setUser(user);
  //   };

  //   fetchCurrentUser();
  // }, []);

  // let user: User;

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
    signIn('credentials', updatedUser);
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
    signIn('credentials', updatedUser);
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