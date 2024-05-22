'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'
import { Container } from '../components/layout';
import { LoadingAnimation } from '../components/ui';
import { toast } from 'react-toastify';

interface IProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      toast.error("That's a protected route. Authenticated your self before proceding");
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return (
      <Container extraPadding>
        <div className='flex gap-4 items-center'>
          <p className='text-light'>Loading...</p>
          <LoadingAnimation className='w-24' />
        </div>
      </Container>
    );
  }

  return (
    <>{ children }</>
  )
}

export default ProtectedRoute;