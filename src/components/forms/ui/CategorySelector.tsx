import CategoryReactIconModel from '@/src/models/CategoryReactIconModel';
import Select from 'react-select';
import React from 'react'
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';

/**
 * Should never have to do this. I would define an UI component <Icon icon="" />, with the icon prop being a union of strings that corresponds to a react-icons component.
 */
const iconComponents: CategoryReactIconModel[] = [
  new CategoryReactIconModel("beach", <TbBeach className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("windmills", <GiWindmill className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("modern", <MdOutlineVilla className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("countryside", <TbMountain className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("pools", <TbPool className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("islands", <GiIsland className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("lake", <GiBoatFishing className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("skiing", <FaSkiing className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("castles", <GiCastle className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("camping", <GiForestCamp className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("artic", <BsSnow className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("cave", <GiCaveEntrance className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("desert", <GiCactus className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("barns", <GiBarn className='text-grey w-4 h-4' />),
  new CategoryReactIconModel("lux", <IoDiamond className='text-grey w-4 h-4' />),
];

/**
 * In my opinion, if your component has any react-hook-form imports it is disqualifed as an UI component.
 * I think a better approach would be to pass in [value, setValue] from the React useState hook. An example interface could look like this:
 *
 * interface Props {
 *  value: string; // represents current value
 *  setValue: Dispatch<SetStateAction<string>>;
 * }
 */
interface CategorySelectorProps {
  unregister: UseFormUnregister<any>; // why do we need unregister?
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export const CategorySelector = ({ unregister, watch, setValue }: CategorySelectorProps) => {
  const selectedCountry = watch('category');

  return (
    <div className='w-full z-10'>
      <Select
        placeholder='Category'
        isClearable
        options={iconComponents}
        value={selectedCountry}
        onChange={(value) => value !== null ? setValue('category', value) : unregister('category')}
        formatOptionLabel={
          (option: CategoryReactIconModel) => (
            <div className='flex items-center gap-3'>
              {option.icon} {option.category}
            </div>
          )
        }
      />
    </div>
  )
}

export default CategorySelector;
