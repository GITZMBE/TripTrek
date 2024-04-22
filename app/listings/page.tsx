import { Container } from "@/src/components/layout";
import { ListingCard } from "@/src/components/ui";
import { Listing } from "@prisma/client";
import React from "react";

const ListingsPage = async () => {
  const getAllListings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/listings", {
      method: "GET",
      cache: 'no-cache'
    });
    const listings: Listing[] = await res.json();
    return listings;
  };

  const listings = await getAllListings();
  return (
    <Container extraPadding>
      <h1 className='text-4xl text-light'>Listings</h1>
      <div className='w-full flex flex-wrap gap-4 py-4'>
        {listings &&
          listings.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
      </div>
    </Container>
  );
};

export default ListingsPage;
