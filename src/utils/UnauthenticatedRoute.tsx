'use client';

import { useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';
import { LoadingAnimation } from '../components/ui';
import { Container } from '../components/layout';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface IProps {
  children: ReactNode;
};

export const UnauthenticatedRoute = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user) {
      toast.error("This page is only for unauthenticated users");
      router.back();
    }
  }, [session, status, router]);

  if (status === 'loading' || session?.user) {
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

export default UnauthenticatedRoute