import React from 'react';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { Counter } from './ui';

interface InfoStepProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
}

export const InfoStep = ({ unregister, setValue, watch, name }: InfoStepProps) => {
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');

  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>Write some information about your listing?</h1>
      <div className='flex flex-col center gap-4 p-4 w-[700px] h-[60vh] shadow-inner overflow-y-auto scrollbar-hidden'>
        <Counter title='Guests' subtitle='How many guests do you allow?' value={guestCount} onChange={(value) => setValue('guestCount', value)} />
        <Counter title='Rooms' subtitle='How many rooms do you have?' value={roomCount} onChange={(value) => setValue('roomCount', value)} />
        <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' value={bathroomCount} onChange={(value) => setValue('bathroomCount', value)} />
      </div>
    </div>
  )
}

export default InfoStep