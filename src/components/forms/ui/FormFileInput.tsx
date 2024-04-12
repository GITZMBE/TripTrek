"use client";

import React, { SetStateAction, useEffect } from "react";

interface InputProps {
  name: string;
  required?: boolean;
  value: any;
  setValue: SetStateAction<any>;
}

export const FormFileInput = ({
  name,
  required = false,
  value,
  setValue,
}: InputProps) => {
  useEffect(() => {console.log(value)}, [value])

  return (
    <input
      type='file'
      name={name}
      // value={value}
      required={required}
      accept="image/*"
      onChange={(e) => {
        setValue({ ...value, [e.target.name]: e.target.files?.[0] });
        console.log(e)
      }}
      className='w-full px-2 py-1 rounded-full transition-all duration-300 bg-light text-secondary border-2 border-grey/50 focus:border-grey outline-none'
    />
  );
};

export default FormFileInput;
