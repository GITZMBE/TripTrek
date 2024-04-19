import React from 'react';
import { UploadImage } from './ui';
import { FieldErrors, UseFormSetError, UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';

interface ImageStepProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  errors: FieldErrors;
};

export const ImageStep = ({ unregister, setValue, watch, setError, errors }: ImageStepProps) => {
  return (
    <div className='max-w-[700px] min-h-[65vh]'>
      <h1 className='text-light text-2xl text-center pb-4'>Add some photos of your listing?</h1>
      <div className='flex flex-col center gap-4 p-4 w-[700px] h-[60vh]'>
        <UploadImage unregister={unregister} setValue={setValue} watch={watch} setError={setError} errors={errors} />
      </div>
    </div>
  )
}

export default ImageStep;