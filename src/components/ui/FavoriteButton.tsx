'use client';

import { useCurrentUser } from '@/src/hooks';
import { request } from '@/src/utils';
import { Listing, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'
import Icon from './Icon';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/src/recoil';

interface FavoriteButtonProps {
  listing: Listing;
};

const FavoriteButton = ({ listing }: FavoriteButtonProps) => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const isFavorite = () => {
    const favorites = user?.favoriteIds || [];
    const includeUser = favorites.some((listingId: string) => listingId === listing.id);
    return includeUser;
  };

  const isOwner = () => {
    return listing.userId === user?.id;
  }

  const host = window.location.origin;

  const handleLikeListing = async () => {
    const uri = `/api/users/${user?.id}/favorites`;
    const options: RequestInit = { 
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    };
    const data = await request<User>(host, uri, options);
    setCurrentUser(data);
  };

  const handleRemoveFavorite = async () => {
    const uri = `/api/users/${user?.id}/favorites`;
    const options: RequestInit = {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listingId: listing.id })
    };
    const data = await request<User>(host, uri, options);
    setCurrentUser(data);
  };

  return (
    <>
      { isOwner() ? (
        <span className='absolute top-4 right-4 text-light'>Owner</span>
      ) : isFavorite() ? (
        <div className='absolute top-4 right-4' onClick={e => {e.stopPropagation(); handleRemoveFavorite()}}>
          <Icon icon='heart' className='w-4 text-love cursor-pointer' size={16} />
        </div>
      ) : (
        <div className='absolute top-4 right-4' onClick={e => {e.stopPropagation(); handleLikeListing()}}>
          <Icon icon='emptyheart' className='w-4 text-light cursor-pointer' size={16} />
        </div>
      ) }    
    </>
  )
}

export default FavoriteButton