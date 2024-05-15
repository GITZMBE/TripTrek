"use client";

import { DataLoader, NoDataContent } from "@/src/components/dataHandlers";
import { Container } from "@/src/components/layout";
import SlideShowBanner from "@/src/components/layout/SlideShowBanner";
import { ListingCard, LoadingAnimation } from "@/src/components/ui";
import Categorybar from "@/src/components/ui/Categorybar";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { request } from "../utils";

interface NewDataLoaderProps {
  children: React.ReactNode;
}

const NewDataLoader = ({ children }: NewDataLoaderProps) => {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-start gap-4 py-4'>
      {children}
    </div>
  );
};

export default function Home() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getListings = async () => {
    const url = `${window.location.origin}/api/listings${category === null || category === "" ? "" : `?category=${category}`}`;
    const options: RequestInit = {
      method: "GET",
      cache: "no-cache",
    };
    const data = await request<Listing[]>(url, options);
    return data;
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

  useEffect(() => {
    getListings().then((res) => {setListings(res); setIsLoading(false)});
  }, [category]);

  return (
    <Container className='min-h-screen'>
      <SlideShowBanner />
      <Categorybar />
      {/* <DataLoader
        fetchData={getListings}
        renderData={renderListings}
        noDataContent={noDataContent}
      /> */}
      <NewDataLoader>
        { isLoading ? (
          <LoadingAnimation />
        ) : listings.length !== 0 ? (
          listings.map((listing, i) => (
            <ListingCard key={i} listing={listing} />
          ))
        ) : (
          <NoDataContent label='No Listings found' icon='' />
        )}
      </NewDataLoader>
    </Container>
  );
}
