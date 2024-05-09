'use client';

import { DataLoader } from '@/src/components/dataHandlers';
import { Container } from '@/src/components/layout';
import { ListingCard } from '@/src/components/ui';
import { Listing } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

const FavoritesPage = ({ params }: { params: { id: string} }) => {
  const getListings = async () => {
    const res = await fetch(`${window.location.origin}/api/users/${params.id}/favorites`, {
      method: "GET",
      cache: 'no-cache'
    });
    const listings: Listing[] = await res.json();
    return listings;
  };
  
  const renderFavoriteListings = (data: Listing[]) => {
    return data.map((listing: Listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ));
  }

  const noDataContent = (
    <div className='w-full flex flex-col items-center gap-8'>
      <img src='/data_not_found.png' className='w-48 opacity-50' alt='' />
      <h1 className='text-light text-2xl'>No Favorite Listings found</h1>
      <Link href='/' className='text-grey hover:text-light'>
        Go back to find some listings
      </Link>
    </div>
  );

  return (
    <Container>
      <h1 className='text-4xl text-light pt-4'>Favorite Listings</h1>
      <DataLoader fetchData={getListings} renderData={renderFavoriteListings} noDataContent={noDataContent} />
    </Container>
  )
}

export default FavoritesPage;