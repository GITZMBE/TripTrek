import React from 'react';
import { CategoryIconModel } from '@/src/models';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { BiSolidCategory } from 'react-icons/bi';
import { CategoryButton } from './ui';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';

const categoryIcons: CategoryIconModel[] = [
  new CategoryIconModel("beach", TbBeach),
  new CategoryIconModel("windmills", GiWindmill),
  new CategoryIconModel("modern", MdOutlineVilla),
  new CategoryIconModel("countryside", TbMountain),
  new CategoryIconModel("pools", TbPool),
  new CategoryIconModel("islands", GiIsland),
  new CategoryIconModel("lake", GiBoatFishing),
  new CategoryIconModel("skiing", FaSkiing),
  new CategoryIconModel("castles", GiCastle),
  new CategoryIconModel("camping", GiForestCamp),
  new CategoryIconModel("artic", BsSnow),
  new CategoryIconModel("cave", GiCaveEntrance),
  new CategoryIconModel("desert", GiCactus),
  new CategoryIconModel("barns", GiBarn),
  new CategoryIconModel("lux", IoDiamond),
];

interface CategoryStepProps {
  unregister: UseFormUnregister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
}

export const CategoryStep = ({ unregister, setValue, watch, name }: CategoryStepProps) => {
  const selectedCategory = watch(name);

  return (
    <div className='max-w-[700px]'>
      <h1 className='text-light text-2xl text-center pb-4'>Which category fits your listing the best?</h1>
      <div className='flex flex-wrap justify-start gap-4 p-4 h-[60vh] shadow-inner overflow-y-auto scrollbar-hidden'>
        {
          categoryIcons.map(({category, icon}, i) => (
            <CategoryButton key={i} label={category} icon={icon} onClick={() => { selectedCategory === category ? unregister(name) : setValue(name, category) }} selected={selectedCategory === category} style={{ flexBasis: 'calc(50% - 1rem)' }} />
          ))
        }
      </div>
    </div>
  )
}

export default CategoryStep