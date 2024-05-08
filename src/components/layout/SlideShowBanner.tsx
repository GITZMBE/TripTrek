'use client';

import { Listing } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import { Filter } from '../ui';
import { useRouter } from 'next/navigation';
import { user } from '@nextui-org/react';
import { useCurrentUser } from '@/src/hooks';

const SlideShowBanner = () => {
  const router = useRouter();
  const { currentUser: user } = useCurrentUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListingIndex, setCurrentListingIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isOwner = () => {
    return currentListing?.userId === user?.id;
  }

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left
      const newIndex = (currentListingIndex + 1) % listings.length;
      setCurrentListingIndex(newIndex);
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swiped right
      const newIndex = currentListingIndex === 0 ? listings.length - 1 : currentListingIndex - 1;
      setCurrentListingIndex(newIndex);
    }
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
            onClick={() => { isOwner() ? router.push(`${window.location.origin}/users/${user?.id}/listings/${currentListing.id}`) : router.push(`${window.location.origin}/listings/${currentListing?.id}`)}}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={e => {e.stopPropagation(); handleTouchEnd()}}
          >
            <div></div>
            <h1 className={`text-6xl font-bold text-center text-light tracking-wider ${ currentListing ? 'animate-fadeIn' : '' }`}>{ currentListing.title }</h1>
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