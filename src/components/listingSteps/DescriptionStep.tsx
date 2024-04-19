import React from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { DescriptionInput } from './ui';

interface DescriptionStepProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
};

export const DescriptionStep = ({ register, watch, errors }: DescriptionStepProps) => {
  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>Describe your listing</h1>
      <div className='flex flex-col center gap-4 p-4 w-[700px] h-[60vh]'>
        <DescriptionInput register={register} title='Title' name='title' errors={errors} watch={watch} />
        <DescriptionInput register={register} title='Description' name='description' errors={errors} watch={watch} />
      </div>
    </div>
  )
}

export default DescriptionStep