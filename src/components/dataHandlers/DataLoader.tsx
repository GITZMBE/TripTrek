'use client';

import React, { ReactNode } from 'react';

interface DataLoaderProps {
  children: ReactNode;
}

export const DataLoader = ({ children }: DataLoaderProps) => {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-start gap-4 py-4'>
      {children}
    </div>
  );
}

export default DataLoader;