import { loggedInUserState } from '@/src/recoil';
import { Listing } from '@prisma/client';
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

interface FavoriteButtonProps {
  listing: Listing;
};

const FavoriteButton = ({ listing }: FavoriteButtonProps) => {
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
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user_token?.user.id}/favorites`, { 
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
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user_token?.user.id}/favorites`, {
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