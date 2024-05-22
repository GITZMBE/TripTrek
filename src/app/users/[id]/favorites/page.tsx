'use client';

import { DataLoader, NoDataContent } from '@/src/components/dataHandlers';
import { Container } from '@/src/components/layout';
import { ListingCard, LoadingAnimation } from '@/src/components/ui';
import { ProtectedRoute, request } from '@/src/utils';
import { Listing } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const FavoritesPage = ({ params }: { params: { id: string} }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getListings = async () => {
    const host = window.location.origin;
    const uri = `/api/users/${params.id}/favorites`;
    const options: RequestInit = {
      method: "GET",
      cache: 'no-cache'
    };
    const listings = await request<Listing[]>(host, uri, options);
    return listings;
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      getListings().then(setListings);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  return (
    <ProtectedRoute>
      <Container>
        <h1 className='text-4xl text-light pt-4'>Favorite Listings</h1>
        <DataLoader >
          { isLoading ? (
            <LoadingAnimation className="w-full" />
          ) : listings.length > 0 ? (
            listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <NoDataContent label='You Have No Favorite Listings' image='/data_not_found.png'>
              <Link href='/' className='text-grey hover:text-light'>
                Go back to find some listings
              </Link>
            </NoDataContent>
          )}
        </DataLoader>
      </Container>
    </ProtectedRoute>
  )
}

export default FavoritesPage;