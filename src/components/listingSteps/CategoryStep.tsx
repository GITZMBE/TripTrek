import React, { useEffect, useState } from 'react';
import { CategoryButton } from './ui';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { Category } from '@prisma/client';
import { request } from '@/src/utils';

interface CategoryStepProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
}

export const CategoryStep = ({ unregister, setValue, watch, name }: CategoryStepProps) => {
  const selectedCategory = watch(name);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const host = window.location.origin;
    const uri = '/api/categories';
    const options: RequestInit = {
      method: "GET",
    };
    const data = await request<Category[]>(host, uri, options);
    return data;
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className='max-w-[700px]'>
      <h1 className='text-light text-2xl text-center pb-4'>Which category fits your listing the best?</h1>
      <div className='flex flex-wrap justify-start gap-4 p-4 h-[60vh] shadow-inner overflow-y-auto scrollbar-hidden'>
        { categories && categories.map(category => (
            <CategoryButton key={category.id} category={category} onClick={() => { selectedCategory?.id === category.id ? unregister(name) : setValue(name, category) }} selected={selectedCategory?.id === category.id} style={{ flexBasis: 'calc(50% - 1rem)' }} />
          ))
        }
      </div>
    </div>
  )
}

export default CategoryStep;