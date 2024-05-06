'use client';

import { Listing } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { Filter } from '../ui';

const SlideShowBanner = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListingIndex, setCurrentListingIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`${window.location.origin}/api/listings?amount=3`, { method: 'GET' });
      const data: Listing[] = await res.json() || [];
      setListings(data);
    };

    getListings();
  }, []);

  useEffect(() => {
    if (listings.length === 0) return;

    setCurrentListing(listings[0]);
    setTimeout(() => {
      setSlideCount(slideCount + 1)
      setCurrentListingIndex((currentListingIndex + 1) % listings.length);
    }, 5000);
  }, [listings, slideCount]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentListing(null);
    }, 500);
    setTimeout(() => {
      setCurrentListing(listings[currentListingIndex]);
    }, 550);
  }, [currentListingIndex]);

  return (
    <div className='relative w-full h-[50vh] overflow-x-hidden'>
      { listings.length > 0 && 
        <div style={{ width: 100 * listings.length + '%', transform: `translateX(-${ currentListingIndex * 100 / listings.length }%)` }} className='relative flex w-full h-full transition duration-1000 ease-in-out'>
          { listings.map(listing => (
            <img key={listing.id} src={listing?.imageSrc} style={{ width: 100/listings.length + '%' }} className={`h-full object-cover object-center`} />
          ))}
        </div>
      }
      <Filter center>
        <div className='h-full flex flex-col justify-between items-center py-4'>
          <div></div>
          { currentListing && (
            <h1 className={`text-6xl font-bold text-center text-light tracking-wider ${ currentListing ? 'animate-fadeIn' : '' }`}>{ currentListing.title }</h1>
          )}
          <div className='flex gap-4'>{ listings.length > 0 && 
            listings.map((_, i) => (
              i === currentListingIndex ? <span key={i} className='w-3 h-3 rounded-full border-2 border-accent bg-accent'></span> : <span key={i} className='w-3 h-3 rounded-full border-2 border-accent cursor-pointer' onClick={() => setCurrentListingIndex(i)}></span>
            ))
          }</div>
        </div>
      </Filter>
    </div>
  )
}

export default SlideShowBanner;