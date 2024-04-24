'use client';

import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { IconType } from 'react-icons'

interface IcontypeProps {
  icon: ReactElement<IconType> | null;
};

export const Icontype = ({ icon }: IcontypeProps) => {
  return icon ? (
    icon
  ) : null
}

export default Icontype;