import { useCountries } from '@/src/hooks';
import { CountryModel } from '@/src/models';
import React from 'react';
import { UseFormWatch } from 'react-hook-form';
import Select from 'react-select';

interface CountrySelectProps {
  onChange: (value: CountryModel | null) => void;
  watch: UseFormWatch<any>;
  name: string;
};

export const CountrySelect = ({ onChange, watch, name }: CountrySelectProps) => {
  const selectedCountry = watch(name);
  const { getAll, getByValue } = useCountries();

  return (
    <div className='w-full z-10'>
      <Select 
        placeholder='Country'
        isClearable
        options={getAll()} 
        value={selectedCountry}
        onChange={onChange}
        formatOptionLabel={
          (option: CountryModel) => (
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