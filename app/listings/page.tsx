import Link from 'next/link';
import React from 'react'

const ListingsPage = () => {
  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-4'>
      <h1>ListingsPage</h1>
      <Link href='/listings/upload' className='px-4 py-2 rounded-lg bg-accent/75 hover:bg-accent text-light hover:text-white'>Upload new Listing</Link>
    </main>
  )
}

export default ListingsPage;