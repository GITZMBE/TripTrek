'use client';

import { useLoading } from '@/src/hooks';
import React, { ReactNode, useEffect, useState } from 'react';
import { LoadingAnimation } from '../ui';

interface DataLoaderProps {
  fetchData: () => Promise<any[]>;
  renderData: (data: any) => JSX.Element[];
  noDataContent: ReactNode;
}

export const DataLoader = ({ fetchData, renderData, noDataContent }: DataLoaderProps) => {
  const [data, setData] = useState<any[]>([]);
  const {isLoading, setIsLoading} = useLoading(true);

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
    <div className='w-full flex flex-wrap justify-start gap-4 py-4'>
      {isLoading ? (
        <div className='flex justify-center w-full'>
          <LoadingAnimation className='w-28 aspect-square' />
        </div>
      ) : data.length > 0 ? (
        renderData(data)
      ) : (
        noDataContent
      )}
    </div>
  )
}

export default DataLoader;