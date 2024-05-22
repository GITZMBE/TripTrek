import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

interface IProps {
  children: ReactNode;
  session: Session | null;
}

export const ProtectedRoute = async ({ session, children }: IProps) => {
  if (!session || !session?.user) redirect('/login');

  return (
    <div>{ children }</div>
  )
}

export default ProtectedRoute;