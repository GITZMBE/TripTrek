import React from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ListingInput } from './ui';

interface DescriptionStepProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
};

export const DescriptionStep = ({ register, watch, errors }: DescriptionStepProps) => {
  const title = watch('title');
  const description = watch('description');

  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>Describe your listing</h1>
      <div className='flex flex-col center gap-4 p-4 w-[700px] h-[60vh]'>
        <ListingInput register={register} title='Title' name='title' errors={errors} watch={watch} />
        <ListingInput register={register} title='Description' name='description' errors={errors} watch={watch} />
        {/* <input type="text" placeholder='Title' {...register('title')} className='bg-transparent text-grey py-2' />
        <input type="text" placeholder='Description' {...register('description')} className='bg-transparent text-grey py-2' /> */}
      </div>
    </div>
  )
}

export default DescriptionStep