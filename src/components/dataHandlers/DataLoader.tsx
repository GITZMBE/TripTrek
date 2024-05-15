'use client';

import { useLoading } from '@/src/hooks';
import React, { ReactNode, useEffect, useState } from 'react';
import { LoadingAnimation } from '../ui';

interface DataLoaderProps {
  fetchData: () => Promise<any>; // Why not use a generic here
  renderData: (data: any) => JSX.Element | JSX.Element[];
  noDataContent: ReactNode;
}

/**
 * Pass in asynchronous state to this component and render appropriate components depending on the state (loading, error, success etc)
 * No any in the interface :D
 */
export const DataLoader = ({ fetchData, renderData, noDataContent }: DataLoaderProps) => {
  const [data, setData] = useState<any>();
  const { isLoading, setIsLoading } = useLoading(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [fetchData]);

  return (
    <div className='w-full flex flex-wrap justify-center md:justify-start gap-4 py-4'>
      {isLoading ? (
        <div className='flex justify-center w-full'>
          <LoadingAnimation className='w-28 aspect-square' />
        </div>
      ) : !data || data.length === 0 ? (
        noDataContent
      ) : (
        renderData(data)
      )}
    </div>
  )
}

export default DataLoader;
