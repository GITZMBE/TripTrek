import { Container } from '@/src/components/layout';
import { ListingCard } from '@/src/components/ui';
import { Listing } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const UserListingsPage = async ({ params }: { params: { id: string } }) => {
  const getUsersListings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/users/${params.id}/listings`, { method: 'GET', cache: 'no-cache' });
    const listings: Listing[] = await res.json() || [];
    return listings;
  };

  const listings = await getUsersListings();
  return listings && (
    <Container extraPadding className={ listings.length === 0 ? 'justify-between' : '' }>
      <h1 className='text-4xl text-white font-bold'>My Listings</h1>
      <div className={`'w-full flex ${ listings.length === 0 && 'items-center' } flex-wrap gap-4 py-4'`}>
        { listings.length > 0 ? listings.map((listing: Listing) => (
          <ListingCard key={listing.id} listing={listing} />
        )) : (
          <div className='flex flex-col items-center gap-8'>
            <div className='w-24'>
              <FontAwesomeIcon icon={faBan} style={{ color: '#CC0000' }} />
            </div>
            <h1 className='text-light text-2xl'>You have no listings</h1>
            <Link href='/' className='text-grey hover:text-light'>Go back to main page</Link>
          </div>
        )}
      </div>
      <Link href={`/users/${params.id}/listings/upload`} className='px-4 py-2 rounded-lg bg-accent/75 hover:bg-accent text-light hover:text-white'>Upload new Listing</Link>
    </Container>
  )
}

export default UserListingsPage