'use client';

import { Container } from '@/src/components/layout';
import { CategoryStep, DescriptionStep, ImagesStep, LocationStep, PriceStep } from '@/src/components/listingSteps';
import InfoStep from '@/src/components/listingSteps/InfoStep';
import { CountrySelectValue } from '@/src/components/listingSteps/ui';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

enum Steps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5
};

type FormFields = {
  category: string;
  location: CountrySelectValue;
  info: string;
  images: string[];
  description: string;
  price: number;
};

const UploadListingPage = () => {
  const [ step, setStep ] = useState(Steps.Category);
  const { register, unregister, setValue, handleSubmit, watch, setError, formState: { errors } } = useForm<FormFields>();

  const formData = watch();

  const onBack = () => {
    setStep(step - 1);
  };

  const isClickable = (
    step === Steps.Category && formData.category !== undefined) || (
    step === Steps.Location && formData.location !== undefined) || (
    step === Steps.Info && formData.info !== undefined) || (
    step === Steps.Images && formData.images !== undefined) || (
    step === Steps.Description && formData.description !== undefined) || (
    step === Steps.Price && formData.price !== undefined);

  const errorMessages = {
    [Steps.Category]: 'Select a category before proceeding',
    [Steps.Location]: 'Choose a country before proceeding',
    [Steps.Info]: 'Share some information about your listing before proceeding',
    [Steps.Images]: 'Add some photos to your listing before proceeding',
    [Steps.Description]: 'Describe your listing before proceeding',
    [Steps.Price]: 'Select a price before proceeding'
  }

  const onNext = () => {
    if (isClickable) {
      setStep(step + 1);
    }
  };

  useEffect(() => {console.log(formData)}, [formData]);
  useEffect(() => {setError("root", { type: 'manual' })}, [isClickable]);

  return (
    <Container center extraPadding>
      <div className="flex flex-col gap-2 items-center">
        {
          step === Steps.Category ? (
            <CategoryStep unregister={unregister} setValue={setValue} watch={watch} name='category' />
          ) : step === Steps.Location ? (
            <LocationStep unregister={unregister} setValue={setValue} watch={watch} name='location' />
          ) : step === Steps.Info ? (
            <InfoStep unregister={unregister} setValue={setValue} watch={watch} name='info'  />
          ) : step === Steps.Images ? (
            <ImagesStep />
          ) : step === Steps.Description ? (
            <DescriptionStep />
          ) : step === Steps.Price ? (
            <PriceStep />
          ) : <></>
        }
        <p className='text-error'>{ errors.root?.message || '' }</p>
      </div>
      <div className='w-full max-w-[700px] flex justify-between items-center px-4'>
        <button className={``} onClick={onBack}>
          <span className={ step === Steps.Category ? 'hidden' : 'flex gap-4 text-grey hover:text-light' }>
            <FaAngleDoubleLeft size={24} />
            Back
          </span>
        </button>
        <button className={`${ !isClickable && 'cursor-not-allowed' }`} onClick={ () => isClickable ? onNext() : setError("root", { type: 'manual', message: errorMessages[step] }) } >
          <span className={`flex gap-4 ${ step === Steps.Price ? 'hidden' : isClickable ? 'text-grey hover:text-light' : 'text-secondary' }`}>
            Next
            <FaAngleDoubleRight size={24} />
          </span>
        </button>
      </div>
    </Container>
  )
}

export default UploadListingPage;