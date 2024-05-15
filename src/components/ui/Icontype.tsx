'use client';

import { BiQuestionMark, BiSolidCategory } from 'react-icons/bi';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

interface Props {
  icon: string | null;
  className?: string;
}

export const Icontype = ({ icon, className }: Props) => {
  const defaultClasses = "w-12 h-12 text-grey";

  switch (icon) {
    case "":
      return <BiSolidCategory className={`${className} ${defaultClasses}`} />
    case "beach":
      return <TbBeach className={`${className} ${defaultClasses}`} />;
    case "windmills":
      return <GiWindmill className={`${className} ${defaultClasses}`} />;
    case "modern":
      return <MdOutlineVilla className={`${className} ${defaultClasses}`} />;
    case "countryside":
      return <TbMountain className={`${className} ${defaultClasses}`} />;
    case "pools":
      return <TbPool className={`${className} ${defaultClasses}`} />;
    case "islands":
      return <GiIsland className={`${className} ${defaultClasses}`} />;
    case "lake":
      return <GiBoatFishing className={`${className} ${defaultClasses}`} />;
    case "skiing":
      return <FaSkiing className={`${className} ${defaultClasses}`} />;
    case "castles":
      return <GiCastle className={`${className} ${defaultClasses}`} />;
    case "camping":
      return <GiForestCamp className={`${className} ${defaultClasses}`} />;
    case "artic":
      return <BsSnow className={`${className} ${defaultClasses}`} />;
    case "cave":
      return <GiCaveEntrance className={`${className} ${defaultClasses}`} />;
    case "desert":
      return <GiCactus className={`${className} ${defaultClasses}`} />;
    case "barns":
      return <GiBarn className={`${className} ${defaultClasses}`} />;
    case "lux":
      return <IoDiamond className={`${className} ${defaultClasses}`} />;
    default: 
      return <BiQuestionMark className={`${className} ${defaultClasses}`} />;
  }
};

export default Icontype;