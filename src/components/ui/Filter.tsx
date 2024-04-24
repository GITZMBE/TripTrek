import React, { ReactNode } from 'react';

interface FilterProps {
  center?: boolean;
  children?: ReactNode;
}

export const Filter = ({ center, children }: FilterProps) => {
  return (
    <div className={`${ center && 'flex justify-center items-center' } absolute w-full h-full backdrop-brightness-50`}>{ children }</div>
  )
}

export default Filter;