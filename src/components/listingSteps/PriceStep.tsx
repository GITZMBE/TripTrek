import React from 'react'
import { PriceInput } from './ui';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface PriceStepProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
};

export const PriceStep = ({ register, watch, errors }: PriceStepProps) => {
  const price = watch('price');

  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>What&apos;s the price for your listing?</h1>
      <div className='flex flex-col center gap-4 p-4 w-[700px] h-[60vh]'>
        <PriceInput register={register} title='Price' name='price' errors={errors} watch={watch} />
      </div>
    </div>
  )
}

export default PriceStep;