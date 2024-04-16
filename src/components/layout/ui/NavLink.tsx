import { useToggleMenu } from '@/src/hooks';
import Link from 'next/link';
import React from 'react'

interface NavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
};

export const NavLink = ({ href, label, onClick }: NavLinkProps) => {
  return (
    <Link href={ href } className='px-4 py-2 bg-secondary hover:bg-primary transition' onClick={ onClick }>{ label }</Link>
  )
}

export default NavLink;