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
  new CategoryIconModel("Beach", TbBeach),
  new CategoryIconModel("Windmills", GiWindmill),
  new CategoryIconModel("Modern", MdOutlineVilla),
  new CategoryIconModel("Countryside", TbMountain),
  new CategoryIconModel("Pools", TbPool),
  new CategoryIconModel("Islands", GiIsland),
  new CategoryIconModel("Lake", GiBoatFishing),
  new CategoryIconModel("Skiing", FaSkiing),
  new CategoryIconModel("Castles", GiCastle),
  new CategoryIconModel("Camping", GiForestCamp),
  new CategoryIconModel("Artic", BsSnow),
  new CategoryIconModel("Cave", GiCaveEntrance),
  new CategoryIconModel("Desert", GiCactus),
  new CategoryIconModel("Barns", GiBarn),
  new CategoryIconModel("Lux", IoDiamond),
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
      <div className='flex flex-wrap justify-start gap-4 p-4 h-[65vh] shadow-inner overflow-y-auto scrollbar-hidden'>
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