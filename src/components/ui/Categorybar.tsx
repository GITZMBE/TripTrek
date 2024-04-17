'use client';

import React, { useEffect, useState } from 'react'
import { CategoryIconModel } from '@/src/models';
import CategoryIcon from './CategoryIcon';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { BiSolidCategory } from 'react-icons/bi';

const categoryIcons: CategoryIconModel[] = [
  new CategoryIconModel("All", BiSolidCategory),
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

interface CategorybarProps {};

const Categorybar = ({}: CategorybarProps) => {
  const [ categories, setCategories ] = useState<CategoryIconModel[]>([]);

  const getCategories = async () => {
    // const res = await fetch(process.env.BASEURL + '/api/categories', { method: 'GET' });
    // const categories = await res.json();
    setCategories(categoryIcons)
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='flex justify-start xl:justify-center items-center w-full xl:px-12 overflow-y-hidden overflow-x-auto scrollbar-styled scrollable-container'>
      <div className='flex flex-shrink-1 justify-start items-center'>
        { categories.length > 0 &&
          categories.map(({category, icon}, index) => (
            <CategoryIcon key={index} category={category} icon={icon} />
          ))
        }        
      </div>
    </div>
  )
}

export default Categorybar