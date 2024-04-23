'use client';

import { Container } from '@/src/components/layout';
import { ListingCard, LoadingAnimation } from '@/src/components/ui';
import { useLoading } from '@/src/hooks';
import { loggedInUserState } from '@/src/recoil';
import { Listing } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';

const FavoritesPage = () => {
  const user_token = useRecoilValue(loggedInUserState);
  const [listings, setListings] = useState<Listing[]>([]);
  const {isLoading, setIsLoading} = useLoading();
  const getListings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${user_token?.user.id}/favorites`, {
      method: "GET",
      cache: 'no-cache'
    }) || [];
    const listings: Listing[] = await res.json();
    setListings(listings);
    return listings;
  };

  useEffect(() => {
    setIsLoading(true);
    getListings();
    setIsLoading(false);
  }, [user_token]);

  return (
    <Container>
      <h1 className='text-4xl text-light pt-4'>Favorite Listings</h1>
      <div className="w-full flex flex-wrap justify-start gap-4 py-4">        
        {listings.length > 0 ? listings.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} />
          )) : (
            <div className="w-full flex flex-col items-center gap-2">
              { isLoading ? (
                <LoadingAnimation />
              ): (
                <>
                  <span className="text-2xl text-grey">No Listings found</span>
                </>
              )}
            </div>
          )
        }
      </div>
    </Container>
  )
}

export default FavoritesPage;