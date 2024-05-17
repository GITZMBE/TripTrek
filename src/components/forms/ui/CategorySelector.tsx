import CategoryReactIconModel from '@/src/models/CategoryReactIconModel';
import Select from 'react-select';
import React, { useEffect, useState } from 'react'
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { Category } from '@prisma/client';
import { request } from '@/src/utils';
import { Icon } from '../../ui';

interface CategorySelectorProps {
  unregister: UseFormUnregister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export const CategorySelector = ({ unregister, watch, setValue }: CategorySelectorProps) => {
  const selectedCountry = watch('category');
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const host = window.location.origin;
    const uri = `/api/categories`;
    const options: RequestInit = {
      method: 'GET',
    };
    const userReservations = await request<Category[]>(host, uri, options) || [];
    return userReservations;
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className='w-full z-20'>
      <Select 
        placeholder='Category'
        isClearable
        options={categories} 
        value={selectedCountry}
        onChange={(value) => value !== null ? setValue('category', value) : unregister('category') }
        formatOptionLabel={
          (option: Category) => (
            <div className='flex items-center gap-3'>
              <Icon icon={option.type} size={16} className='w-4' /> {option.type}
            </div>
          )
        }
      />
    </div>
  )
}

export default CategorySelector;