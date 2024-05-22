'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface NextAuthProviderProps {
  children: ReactNode;
  session: Session | null | undefined;
}

export const NextAuthProvider = ({ children, session }: NextAuthProviderProps) => {
  return (
    <SessionProvider session={session}>{ children }</SessionProvider>
  )
}

export default NextAuthProvider