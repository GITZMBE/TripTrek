import { useCountries } from '@/src/hooks';
import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  onChange: (value: CountrySelectValue | null) => void;
  value: CountrySelectValue | null;
};

export const CountrySelect = ({ onChange, value }: CountrySelectProps) => {
  const { getAll, getByValue } = useCountries();

  return (
    <div className='w-full z-10'>
      <Select 
        placeholder='Country'
        isClearable
        options={getAll()} 
        value={value}
        onChange={onChange}
        formatOptionLabel={
          (option) => (
            <div className='flex items-center gap-3'>
              <div className='w-5'>{option.flag}</div>
              <div>
                {option.label},
                <span className='text-neutral-800 ml-1'>
                  {option.region}
                </span>
              </div>
            </div>
          )
        }
      />
    </div>
  )
}

export default CountrySelect;