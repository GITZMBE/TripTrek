'use client'

import React, { ComponentPropsWithoutRef, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface DescriptionInputProps extends ComponentPropsWithoutRef<"input"> {
  title: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
};

export const DescriptionInput = ({ register, name, title, errors, watch, ...props}: DescriptionInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const input = watch(name);

  return (
    <div className='w-full'>
      <h2 className={`inline-block  pl-1 transition ${ isFocused ? 'translate-y-0 text-light' : 'translate-y-9 text-xl text-grey' }`}>{ title }</h2>
      <input {...props} {...register(name)} onFocus={() => setIsFocused(true)} onBlur={() => { !input && setIsFocused(false) }} className='w-full bg-transparent text-grey py-2 px-1 border-[1px] border-secondary' />
      <p className='text-error'>{ errors[name]?.message as string }</p>
    </div>
  )
}

export default DescriptionInput;