import { Container } from '@/src/components/layout';
import Link from 'next/link';
import React from 'react'

const ListingsPage = () => {
  return (
    <Container center>
      <h1 className='text-6xl text-light'>ListingsPage</h1>
      <Link href='/listings/upload' className='px-4 py-2 rounded-lg bg-accent/75 hover:bg-accent text-light hover:text-white'>Upload new Listing</Link>
    </Container>
  )
}

export default ListingsPage;