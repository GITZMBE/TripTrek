'use client';

import { Listing } from '@prisma/client';
import React, { TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Filter } from '../ui';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/src/hooks';
import { request } from '@/src/utils';

/**
 * SlideShowBanner component displays a slideshow of listings and allows users to swipe through them.
 * 
 * @component
 */
const SlideShowBanner = () => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListingIndex, setCurrentListingIndex] = useState(0);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideTimeout = useRef<NodeJS.Timeout | null>(null);
  
  /**
   * Fetches the listings to be displayed in the slideshow.
   * 
   * @async
   * @function
   * @returns {Promise<Listing[]>} The list of listings.
   */
  const getListings = async () => {
    const host = window.location.origin;
    const uri = '/api/listings?amount=3';
    const options: RequestInit = { 
      method: 'GET' 
    };
    const data = await request<Listing[]>(host, uri, options) || [];
    return data;
  };

  useEffect(() => {
    getListings().then(setListings);
  }, []);

  /**
   * Advances to the next slide in the slideshow.
   * 
   * @function
   */
  const handleNextSlide = useCallback(() => {
    setCurrentListingIndex((prevIndex) => (prevIndex + 1) % listings.length);
  }, [listings.length]);

  useEffect(() => {
    if (listings.length === 0) return;

    setCurrentListing(listings[currentListingIndex]);

    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
    }

    slideTimeout.current = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      if (slideTimeout.current) {
        clearTimeout(slideTimeout.current);
      }
    };
  }, [listings]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentListing(null);
    }, 500);
    setTimeout(() => {
      setCurrentListing(listings[currentListingIndex]);
    }, 550);
  }, [currentListingIndex]);

  /**
   * Handles the start of a touch event.
   * 
   * @param {React.TouchEvent<HTMLDivElement>} e - The touch event.
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  /**
   * Handles the movement during a touch event.
   * 
   * @param {React.TouchEvent<HTMLDivElement>} e - The touch event.
   */
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  /**
   * Handles the end of a touch event and determines if the user swiped left or right.
   * 
   * @param {TouchEvent<HTMLDivElement>} e - The touch event.
   */
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentListingIndex((prevIndex) => (prevIndex + 1) % listings.length);
    } else if (touchEndX.current - touchStartX.current > 50) {
      setCurrentListingIndex((prevIndex) => (prevIndex === 0 ? listings.length - 1 : prevIndex - 1));
    }
  };

  /**
   * Handles the click event on the current listing, navigating to the listing's page.
   * 
   * @function
   */
  const handleListingClick = () => {
    router.push(`/listings/${currentListing?.id}`);
  };

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
        { currentListing && (
          <div 
            className='w-full h-full flex flex-col justify-between items-center py-4'
            onClick={handleListingClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div></div>
            <h1 className={`text-3xl md:text-6xl font-bold text-center text-light tracking-wider ${ currentListing ? 'animate-fadeIn' : '' }`}>{ currentListing.title }</h1>
            <div className='flex gap-4'>{ listings.length > 0 && 
              listings.map((_, i) => (
                i === currentListingIndex ? <span key={i} className='w-3 h-3 rounded-full border-2 border-accent bg-accent'></span> : <span key={i} className='w-3 h-3 rounded-full border-2 border-accent cursor-pointer' onClick={e => {e.stopPropagation(); setCurrentListingIndex(i)}}></span>
              ))
            }</div>
          </div>
        )}
      </Filter>
    </div>
  )
}

export default SlideShowBanner;