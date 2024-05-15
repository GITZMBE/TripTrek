"use client";

/**
 * Same for this component as for FormButton. Try to get rid off the hook-form imports.
 * It is nice to be able to pass in validation error messages to your form components. But I dont think it has to be typed as FieldErrors<any>. It is a bit simpler to just have an error field typed as a nullable string. If you need to render multiple error messages, use an array instead.
 */

import React, { ComponentPropsWithoutRef } from "react";
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  //error?: string;
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
