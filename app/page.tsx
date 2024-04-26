"use client";

import { DataLoader } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import { ListingCard } from "@/src/components/ui";
import Categorybar from "@/src/components/ui/Categorybar";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const getListings = async () => {
    const res =
      (await fetch(
        process.env.NEXT_PUBLIC_BASEURL +
          `/api/listings${
            category === null || category === "" ? "" : `?category=${category}`
          }`,
        {
          method: "GET",
          cache: "no-cache",
        }
      )) || [];
    const listings: Listing[] = await res.json();
    return listings;
  };

  const renderListings = (data: Listing[]) => {
    return data.map((listing: Listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ));
  };

  const noDataContent = (
    <div className='w-full flex flex-col items-center gap-4'>
      <span className='text-2xl text-grey'>No Listings found</span>
      <Link href='/' className='text-secondary hover:text-light'>
        Clear filters
      </Link>
    </div>
  );

  useEffect(() => {
    const category = searchParams.get("category");
    setCategory(category);
  }, [searchParams]);

  return (
    <Container className='min-h-screen'>
      <Categorybar />
      <DataLoader fetchData={getListings} renderData={renderListings} noDataContent={noDataContent} />
    </Container>
  );
}
