import React, { ComponentPropsWithoutRef } from 'react';

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  center?: boolean;
  extraPadding?: boolean;
  banner?: boolean;
  children?: React.ReactNode;
};

export const Container = ({ center, extraPadding, banner, children, className, ...props }: ContainerProps) => {
  return (
    <div className={`w-full min-h-screen flex flex-col gap-8 items-center ${ center && 'justify-center' } ${ extraPadding ? 'pt-32' : 'pt-[105px]' } pb-8 ${ !banner && 'px-4 sm:px-8 md:px-12' } bg-primary ${ className } `} {...props}>
      { children }
    </div>
  )
}

export default Container;