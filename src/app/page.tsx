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
import { VideoPlayer } from "../components/videoplayers";

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
      <div className="w-full space-y-8">
        <h2 className="w-full text-center text-4xl text-light">Example Listing</h2>
        <div className="w-full flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2 h-1/2">
            <Scene path="/farm_house.glb" className="my-12" full={window.innerWidth < 1024} half={window.innerWidth >= 1024} />
          </div>
          <div className="w-full flex justify-center items-center">
            <VideoPlayer className="relative w-full max-w-[600px] aspect-video" src="/commercials/livingroom.mp4" type="video/mp4" autoPlay loop muted />
          </div>
        </div>        
      </div>
    </Container>
  );
}
