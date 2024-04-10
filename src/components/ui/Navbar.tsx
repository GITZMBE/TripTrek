import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex gap-4 items-center">
      <Link href='/login'>Login</Link>
      <Link href='/signup'>Sign up</Link>
    </nav>
  )
}

export default Navbar