'use client';

import { Container } from "@/src/components/layout";
import { ListingCard } from "@/src/components/ui";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listing } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const getAllListings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/listings", {
      method: "GET",
      cache: 'no-cache'
    }) || [];
    const list: Listing[] = await res.json() || [];
    setListings(list);
    return list;
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <Container extraPadding>
      <h1 className='text-4xl text-light'>Listings</h1>
      <div className='w-full flex flex-wrap justify-start gap-4 py-4'>
        {listings.length > 0 ? listings.map((listing: Listing) => (
          <ListingCard key={listing.id} listing={listing} />
        )) : (
          <div className='w-full flex flex-col items-center gap-8'>
            <div className='w-24'>
              <FontAwesomeIcon icon={faBan} style={{ color: '#CC0000' }} />
            </div>
            <h1 className='text-light text-2xl'>No Listings found</h1>
            <Link href='/' className='text-grey hover:text-light'>Go back to main page</Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ListingsPage;
