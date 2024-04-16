"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  errors: FieldErrors<any>;
  propName: string;
  register: UseFormRegisterReturn<any>;
}

export const FormFileInput = ({
  errors,
  propName,
  register,
  ...props
}: InputProps) => {
  return (
    <div className="w-full flex flex-col">
      <input
        {...props}
        {...register}
        type='file'
        accept='image/*'
        className='w-full px-2 py-1 rounded-full transition-all duration-300 bg-light text-secondary border-2 border-grey/50 focus:border-grey outline-none'
      />
      {errors[propName] && <p>{errors[propName]?.message as string}</p>}
    </div>
  );
};

export default FormFileInput;
