'use client';

import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

export const NextuiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export default NextuiProvider;