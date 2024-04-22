import { Container } from '@/src/components/layout'
import { Filter } from '@/src/components/ui';
import { Listing } from '@prisma/client';
import React from 'react'

const ListingPage = async ({ params }: { params: { id: string} }) => {
  const getListing = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + `/api/listings/${ params.id }`, { method: "GET", cache: 'no-cache' });
    const listing: Listing = await res.json();
    return listing;
  };

  const listing = await getListing();
  return (
    <Container banner>
      { listing && (
        <div className='w-full min-h-screen'>
          <div className={`relative w-full h-[50vh] bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url('${listing.imageSrc}')` }}>
            <Filter center>
              <h1 className='text-6xl text-light font-bold text-nowrap'>{ listing.title }</h1>
            </Filter>
          </div>
          <div className='py-4 px-4 sm:px-8 md:px-12'>
            <p className='text-light'>{ listing.description }</p>
          </div>
        </div>
      )}
    </Container>
  )
}

export default ListingPage;