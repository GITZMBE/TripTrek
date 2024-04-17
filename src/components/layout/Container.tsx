import { propagateServerField } from 'next/dist/server/lib/render-server';
import React, { ComponentPropsWithoutRef } from 'react';

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  center: boolean;
  extraPadding: boolean;
  children: React.ReactNode;
};

const Container = ({ center, extraPadding, children, ...props }: ContainerProps) => {
  return (
    <div className={`w-full min-h-screen flex flex-col gap-4 ${ center && 'items-center justify-center' } ${ extraPadding ? 'py-[105px]' : 'py-24' } px-4 sm:px-8 md:px-12 bg-primary`} {...props}>
      { children }
    </div>
  )
}

export default Container;