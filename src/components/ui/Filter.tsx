import React, { ReactNode } from 'react';

interface FilterProps {
  center?: boolean;
  children?: ReactNode;
}

export const Filter = ({ center, children }: FilterProps) => {
  return (
    <div className={`${ center && 'flex justify-center items-center' } absolute top-0 bottom-0 left-0 right-0 w-full h-full px-4 sm:px-8 md:px-12 backdrop-brightness-50`}>{ children }</div>
  )
}

export default Filter;