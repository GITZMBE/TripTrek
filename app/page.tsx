'use client';

import { Container } from "@/src/components/layout";
import { ListingCard, LoadingAnimation } from "@/src/components/ui";
import Categorybar from "@/src/components/ui/Categorybar";
import { useLoading } from "@/src/hooks";
import { Listing } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const {isLoading, setIsLoading} = useLoading();
  const getListings = async (category: string | null) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/listings${category === null || category === '' ? '' : `?category=${category}`}`, {
      method: "GET",
      cache: 'no-cache'
    }) || [];
    const listings: Listing[] = await res.json();
    setListings(listings);
    return listings;
  };

  useEffect(() => {
    setIsLoading(true);
    const category = searchParams.get('category');
    getListings(category);
    setIsLoading(false);
  }, [searchParams]);

  return (
    <Container className="min-h-screen">
      <Categorybar />
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
                  <button className="text-grey hover:text-light" onClick={() => router.push('/')}>Clear filters</button>
                </>
              )}
            </div>
          )
        }
      </div>
    </Container>
  );
}
