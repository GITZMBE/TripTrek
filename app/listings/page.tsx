'use client';

import { DataLoader } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import { ListingCard } from "@/src/components/ui";
import { Listing } from "@prisma/client";
import Link from "next/link";
import React from "react";

const ListingsPage = () => {
  const getListings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/listings", {
      method: "GET",
      cache: 'no-cache'
    });
    const list: Listing[] = await res.json() || [];
    return list;
  };

  const renderListings = (data: Listing[]) => {
    return data.map((listing: Listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ));
  };

  const noDataContent = (
    <div className='w-full flex flex-col items-center gap-8'>
      <img src='/data_not_found.png' className='w-48 opacity-50' alt='' />
      <h1 className='text-light text-2xl'>No Listings found</h1>
      <Link href='/' className='text-grey hover:text-light'>
        Go back to main page
      </Link>
    </div>
  );

  return (
    <Container extraPadding>
      <h1 className='text-4xl text-light'>Trips</h1>
      <DataLoader fetchData={getListings} renderData={renderListings} noDataContent={noDataContent} />
    </Container>
  );
};

export default ListingsPage;
