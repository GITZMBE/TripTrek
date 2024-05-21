"use client";

import { DataLoader, NoDataContent } from "@/src/components/dataHandlers";
import { Container, Scene, SplineScene } from "@/src/components/layout";
import SlideShowBanner from "@/src/components/layout/SlideShowBanner";
import { ListingCard, LoadingAnimation } from "@/src/components/ui";
import Categorybar from "@/src/components/ui/Categorybar";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { request } from "../utils";
import YouTubePlayer from "../components/YouTubePlayer";

export default function Home() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getListings = async () => {
    const host = window.location.origin;
    const uri = `/api/listings${category === null || category === "" ? "" : `?category=${category}`}`;
    const options: RequestInit = {
      method: "GET",
      cache: "no-cache",
    };
    const data = await request<Listing[]>(host, uri, options);
    return data;
  };

  useEffect(() => {
    const category = searchParams.get("category");
    setCategory(category);
  }, [searchParams]);

  useEffect(() => {
    try {
      setIsLoading(true);
      getListings().then(setListings);
    } finally {
      setIsLoading(false)
    }
  }, [category]);

  return (
    <Container className='min-h-screen'>
      <SlideShowBanner />
      <Categorybar />
      <DataLoader>
        { isLoading ? (
          <LoadingAnimation className="w-full" />
        ) : listings.length !== 0 ? (
          listings.map((listing, i) => (
            <ListingCard key={i} listing={listing} />
          ))
        ) : (
          <NoDataContent label='No Listings found' >
            <Link href='/' className='text-secondary hover:text-light'>
              Clear filters
            </Link>
          </NoDataContent>
        )}
      </DataLoader>
      <Scene path="/farm_house.glb" className="my-12" />
    </Container>
  );
}
