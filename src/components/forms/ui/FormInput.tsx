"use client";

import React, { SetStateAction, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputProps {
  icon?: IconType;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean | string;
  // value: any;
  // setValue: SetStateAction<any>;
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;
}

export const FormInput = ({
  icon: Icon,
  type = "text",
  name,
  placeholder = "",
  required = false,
  register,
  errors
}: InputProps) => {
  const [inputType, setInputType] = useState<string>(type);

  return (
    <div className="flex flex-col">
      <div
        className={`relative flex justify-end items-center w-full cursor-default ${
          Icon !== undefined ? "" : ""
        }`}
      >
        <input
          {...register(name, { required: required })}
          type={inputType}
          name={name}
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
      {errors?.[name] && <p className='text-error'>{errors?.[name]?.message as string}</p>}
    </div>
  );
};

export default FormInput;
