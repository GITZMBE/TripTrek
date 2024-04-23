'use client';

import { useLoading } from "@/src/hooks";
import React, { useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";
import { LoadingAnimation } from "../../ui";
import {useDropzone} from 'react-dropzone';
import { HiCursorClick } from "react-icons/hi";
import prettyBytes from 'pretty-bytes';
import { RxCross2 } from "react-icons/rx";

interface UploadImageProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  errors: FieldErrors;
}

export const UploadImage = ({ unregister, setValue, watch, setError, clearErrors, errors }: UploadImageProps) => {
  const image = watch("image");
  const { isLoading, setIsLoading } = useLoading();
  const [ file, setFile ] = useState<File | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    // const imageData = await fetch(
    //   process.env.NEXT_PUBLIC_BASEURL + "/api/images/upload",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": file.type || "image/*",
    //       "accept": "image/*"
    //     },
    //     body: file,
    //   }
    // );
    // const savedImage = await imageData.json();
    // if (savedImage.message) {
    //   return savedImage;
    // }
    setValue("image", "https://images.unsplash.com/photo-1595138320174-a64d168e9970?q=80&w=2660&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    setIsLoading(false);    
  };

  const handleClickSelectImage = () => {
    if (input.current) { 
      (input.current as HTMLInputElement)?.click();
    }
  };

  const onDrop = (acceptedFiles: FileList | File[]) => {
    const acceptedFile = acceptedFiles[0];
    setFile(acceptedFile);
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const handleRemoveFile = () => {
    setFile(null);
  };

  useEffect(() => { (file !== null && file !== undefined) && clearErrors('image')}, [file]);

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className="relative flex justify-center items-center w-full h-[30vh] shadow-inner">
        {
          image !== undefined ? (
            <>
              <img src={ image } className="w-full h-full object-cover object-center" alt='' />
              <div className="group absolute flex justify-center items-center w-full h-full hover:bg-black/50 transition-all duration-300 cursor-pointer" onClick={() => unregister('image')}>
                <h2 className="text-xl text-light opacity-0 transition-all duration-300 group-hover:opacity-100">Click to remove image</h2>
              </div>
            </>
          ) : isLoading ? (
              <LoadingAnimation width={80} height={80} />
          ) : (
            <>
              { isDragActive ? <p className="font-bold text-3xl text-secondary cursor-pointer">Drop the image</p> : <p className="font-bold text-3xl text-secondary cursor-pointer">Click or Drag & Drop</p> }
              <div {...getRootProps()} className="absolute flex justify-center items-center w-full h-full bg-black opacity-0 hover:opacity-25 transition-all duration-300 cursor-pointer" onClick={handleClickSelectImage}>
                <HiCursorClick size={80} className="text-light" />
              </div>            
            </>
          )
        }        
      </div>
        <p className="text-error">{ errors.image?.message as string || '' }</p>
      
      { file !== null && (
        <p className="group flex justify-between items-center w-full text-grey">
          <span>{ file?.name } { prettyBytes(file?.size) }</span>
          <RxCross2 size={24} className="opacity-0 text-grey hover:text-light group-hover:opacity-100 cursor-pointer" onClick={handleRemoveFile} />
        </p>
      )}
      {/* hide input and open it by clicking the container were the image should be. make filter over that container too when image is not uploaded yet */}
      <input
        {...getInputProps}
        ref={input}
        type='file'
        accept='image/*'
        onChange={e => e.target.files?.[0] !== undefined && setFile(e.target.files?.[0])}
        className='w-full px-2 py-1 rounded-full transition-all duration-300 bg-light text-secondary border-2 border-grey/50 focus:border-grey outline-none hidden'
      />
      <button 
        type="button"
        className={`${ (isLoading || file === null) && 'opacity-70 cursor-not-allowed' } rounded-lg transition w-full bg-accent/75 border-accent/75 text-light hover:bg-accent hover:border-accent hover:text-white py-3 text-md font-semibold`}
        onClick={() => file !== null ? uploadImage(file) : setError('image', { type: 'manual', message: 'Select image before uploading' }) }
      >
        { isLoading ? 'Loading Image...' : 'Upload Image'}
      </button>
    </div>
  );
};

export default UploadImage;
