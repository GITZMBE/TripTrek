import { propagateServerField } from 'next/dist/server/lib/render-server';
import React, { ComponentPropsWithoutRef } from 'react';

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  center?: boolean;
  extraPadding?: boolean;
  children?: React.ReactNode;
};

export const Container = ({ center, extraPadding, children, className, ...props }: ContainerProps) => {
  return (
    <div className={`w-full min-h-screen flex flex-col gap-8 items-center ${ center && 'justify-center' } ${ extraPadding ? 'pt-32' : 'pt-[105px]' } pb-8 px-4 sm:px-8 md:px-12 bg-primary ${ className }`} {...props}>
      { children }
    </div>
  )
}

export default Container;