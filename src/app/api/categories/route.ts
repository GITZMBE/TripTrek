import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { CategoryIconModel } from '@/src/models';
import { NextResponse } from 'next/server';
import { BiSolidCategory } from 'react-icons/bi';

const categories: CategoryIconModel[] = [
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

// Can't pass IconType through with json
export const GET = async () => {
  console.log(categories)
  return NextResponse.json(categories);
};

