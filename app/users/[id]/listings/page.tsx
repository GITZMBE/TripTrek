"use client";

import React from "react";
import { Container } from "@/src/components/layout";
import { ListingCard } from "@/src/components/ui";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { DataLoader } from "@/src/components/dataHandlers";

const UserListingsPage = ({ params }: { params: { id: string } }) => {
  const getUsersListings = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + `/api/users/${params.id}/listings`,
      { method: "GET", cache: "no-cache" }
    );
    const list: Listing[] = (await res.json()) || [];
    return list;
  };

  const renderUsersListings = (data: Listing[]) => {
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
      <h1 className='text-4xl text-white font-bold'>My Listings</h1>
      <DataLoader fetchData={getUsersListings} renderData={renderUsersListings} noDataContent={noDataContent} />
      <Link
        href={`/users/${params.id}/listings/upload`}
        className='px-4 py-2 rounded-lg bg-accent/75 hover:bg-accent text-light hover:text-white'
      >
        Upload new Listing
      </Link>
    </Container>
  );
};

export default UserListingsPage;
