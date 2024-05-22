"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/src/components/layout";
import { ListingCard, LoadingAnimation } from "@/src/components/ui";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { DataLoader, NoDataContent } from "@/src/components/dataHandlers";
import { ProtectedRoute, request } from "@/src/utils";

const UserListingsPage = ({ params }: { params: { id: string } }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const getUsersListings = async () => {
    const host = window.location.origin;
    const uri = `/api/users/${params.id}/listings`;
    const options: RequestInit = { 
      method: "GET", 
      cache: "no-cache" 
    };
    const list = await request<Listing[]>(host, uri, options) || [];
    return list;
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      getUsersListings().then(setListings);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ProtectedRoute>
      <Container extraPadding>
        <h1 className='text-4xl text-white font-bold'>My Listings</h1>
        <DataLoader >
          { isLoading ? (
            <LoadingAnimation className="w-full" />
          ) : listings.length > 0 ? (
            listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <NoDataContent label='You haven&apos;t yet uploaded any listing' image="/data_not_found.png">
              
            </NoDataContent>
          )}
        </DataLoader>
        <Link
          href={`/users/${params.id}/listings/upload`}
          className='px-4 py-2 rounded-lg bg-accent/75 hover:bg-accent text-light hover:text-white'
        >
          Upload new listing here
        </Link>
      </Container>
    </ProtectedRoute>
  );
};

export default UserListingsPage;
