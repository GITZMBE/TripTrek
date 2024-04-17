'use client';

import { Container } from '@/src/components/layout';
import { CategoryStep, DescriptionStep, ImagesStep, LocationStep, PriceStep } from '@/src/components/listingSteps';
import InfoStep from '@/src/components/listingSteps/InfoStep';
import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

enum Steps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5
};

const UploadListingPage = () => {
  const [ step, setStep ] = useState(Steps.Category);

  const onBack = () => {
    setStep(step - 1);
  };

  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <Container center extraPadding>
      {
        step === Steps.Category ? (
          <CategoryStep />
        ) : step === Steps.Location ? (
          <LocationStep />
        ) : step === Steps.Info ? (
          <InfoStep />
        ) : step === Steps.Images ? (
          <ImagesStep />
        ) : step === Steps.Description ? (
          <DescriptionStep />
        ) : step === Steps.Price ? (
          <PriceStep />
        ) : <></>
      }
      <div className='w-full max-w-[500px] flex justify-between items-center'>
        <button className={``} onClick={onBack}>
          <span className={ step === Steps.Category ? 'hidden' : 'flex gap-4 text-grey hover:text-light' }>
            <FaAngleDoubleLeft size={24} />
            Back
          </span>
        </button>
        <button className={``} onClick={onNext}>
          <span className={ step === Steps.Price ? 'hidden' : 'flex gap-4 text-grey hover:text-light' }>
            Next
            <FaAngleDoubleRight size={24} />
          </span>
        </button>
      </div>
    </Container>
  )
}

export default UploadListingPage;