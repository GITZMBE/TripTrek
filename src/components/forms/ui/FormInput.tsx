"use client";

/**
 * Same as other form components.
 */

import React, { ComponentPropsWithoutRef, useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon?: IconType;
  propName: string;
  register: UseFormRegisterReturn<any>;
  errors: FieldErrors<any>;
}

export const FormInput = ({
  icon: Icon,
  type = "text",
  propName,
  placeholder = "",
  register,
  errors,
  ...props
}: InputProps) => {
  const [inputType, setInputType] = useState<string>(type);

  return (
    <div className="w-full flex flex-col">
      <div
        className={`relative flex justify-end items-center w-full cursor-default ${Icon !== undefined ? "" : ""
          }`}
      >
        <input
          {...props}
          {...register}
          type={inputType}
          placeholder={placeholder}
          className='w-full px-2 py-1 rounded-full transition-all duration-300 bg-light text-secondary border-2 border-grey/50 focus:border-grey outline-none'
        />
        {type.toLowerCase() === "password" ? (
          inputType.toLowerCase() === "password" ? (
            <FaEye
              size={18}
              className='absolute text-grey hover:text-primary right-4 cursor-pointer'
              onClick={(_) => setInputType("text")}
            />
          ) : (
            <FaEyeSlash
              size={18}
              className='absolute text-grey hover:text-primary right-4 cursor-pointer'
              onClick={(_) => setInputType("password")}
            />
          )
        ) : (
          Icon !== undefined && (
            <Icon
              size={32}
              className='absolute text-center p-2 rounded-[16px] text-grey hover:text-primary bg-white cursor-pointer transition-all duration-300'
            />
          )
        )}
      </div>
      {errors[propName] && <p className='text-error'>{errors[propName]?.message as string}</p>}
    </div>
  );
};

export default FormInput;
