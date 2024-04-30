import React from 'react';
import { UploadImage } from './ui';
import { FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';

interface ImageStepProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  errors: FieldErrors;
};

export const ImageStep = ({ unregister, setValue, watch, setError, clearErrors, errors }: ImageStepProps) => {
  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>Add some photos of your listing?</h1>
      <div className='w-full flex flex-col center gap-4 p-4 h-[60vh]'>
        <UploadImage unregister={unregister} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} errors={errors} />
      </div>
    </div>
  )
}

export default ImageStep;