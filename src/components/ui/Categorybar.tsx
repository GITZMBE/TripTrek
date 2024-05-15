"use client";

import React, { useEffect, useState } from "react";
import { CategoryIconModel } from "@/src/models";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import CategoryFilterButton from "./CategoryFilterButton";

const categoryIcons: CategoryIconModel[] = [
  new CategoryIconModel("", BiSolidCategory),
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

interface CategorybarProps { }

const Categorybar = ({ }: CategorybarProps) => {
  const [categories, setCategories] = useState<CategoryIconModel[]>([]);

  const getCategories = async () => {
    setCategories(categoryIcons);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='flex justify-start xl:justify-center items-center w-full xl:px-12 overflow-y-hidden overflow-x-auto scrollable-container'>
      <div className='flex flex-shrink-1 justify-start items-center'>
        {categories.length > 0 &&
          categories.map(({ category, icon }, index) => (
            <CategoryFilterButton key={index} category={category} icon={icon} />
          ))}
      </div>
    </div>
  );
};

export default Categorybar;
