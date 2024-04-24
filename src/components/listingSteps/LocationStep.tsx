'use client';

import React, { useMemo } from 'react'
import { CountrySelect } from './ui';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import dynamic from 'next/dynamic';

interface LocationStepProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
}

export const LocationStep = ({ unregister, setValue, watch, name }: LocationStepProps) => {
  const selectedCountry = watch(name);

  const Map = useMemo(() => dynamic(() => import('./ui/Map'), {
    ssr: false
  }), [selectedCountry])

  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>Were is your listing located?</h1>
      <div className='flex flex-col justify-between gap-4 p-4 w-[700px] h-[60vh] shadow-inner overflow-y-auto scrollbar-hidden'>
        <CountrySelect onChange={(value) => value !== null ? setValue(name, value) : unregister(name) } value={selectedCountry} />
        <Map center={ selectedCountry?.latlng } />
      </div>
    </div>
  )
}

export default LocationStep