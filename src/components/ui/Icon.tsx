'use client';

import { BiQuestionMark, BiSolidCategory, BiTask } from 'react-icons/bi';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiHamburgerMenu, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineChatBubble, MdOutlineVilla, MdVerified } from 'react-icons/md';
import { FaHeart, FaRegHeart, FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoCheckmarkCircle, IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { RxAvatar } from 'react-icons/rx';

interface IconProps {
  icon: string;
  className?: string;
  size?: number;
}

export const Icon = ({ icon, className, size = 48 }: IconProps) => {
  const defaultClasses = "w-12 aspect-square text-grey";

  switch (icon) {
    case "":
      return <BiSolidCategory size={size} className={`${className} ${defaultClasses}`} />
    case "beach":
      return <TbBeach size={size} className={`${className} ${defaultClasses}`} />;
    case "windmills":
      return <GiWindmill size={size} className={`${className} ${defaultClasses}`} />;
    case "modern":
      return <MdOutlineVilla size={size} className={`${className} ${defaultClasses}`} />;
    case "countryside":
      return <TbMountain size={size} className={`${className} ${defaultClasses}`} />;
    case "pools":
      return <TbPool size={size} className={`${className} ${defaultClasses}`} />;
    case "islands":
      return <GiIsland size={size} className={`${className} ${defaultClasses}`} />;
    case "lake":
      return <GiBoatFishing size={size} className={`${className} ${defaultClasses}`} />;
    case "skiing":
      return <FaSkiing size={size} className={`${className} ${defaultClasses}`} />;
    case "castles":
      return <GiCastle size={size} className={`${className} ${defaultClasses}`} />;
    case "camping":
      return <GiForestCamp size={size} className={`${className} ${defaultClasses}`} />;
    case "artic":
      return <BsSnow size={size} className={`${className} ${defaultClasses}`} />;
    case "cave":
      return <GiCaveEntrance size={size} className={`${className} ${defaultClasses}`} />;
    case "desert":
      return <GiCactus size={size} className={`${className} ${defaultClasses}`} />;
    case "barns":
      return <GiBarn size={size} className={`${className} ${defaultClasses}`} />;
    case "lux":
      return <IoDiamond size={size} className={`${className} ${defaultClasses}`} />;
    case "avatar":
      return <RxAvatar size={size} className={`${className} ${defaultClasses}`} />;
    case "checkmark":
      return <IoCheckmarkCircle size={size} className={`${className} ${defaultClasses} `} />;
    case "task":
      return <BiTask size={size} className={`${className} ${defaultClasses} `} />;
    case "chatbubble":
      return <MdOutlineChatBubble size={size} className={`${className} ${defaultClasses}`} />;
    case "menu": 
      return <GiHamburgerMenu size={size} className={`${className} ${defaultClasses}`} />;
    case "heart":
      return <FaHeart size={size} className={`${className} ${defaultClasses}`} />;
    case "emptyheart":
      return <FaRegHeart size={size} className={`${className} ${defaultClasses}`} />;
    case "verified":
      return <MdVerified size={size} className={`${className} ${defaultClasses}`} />;
    default: 
      return <BiQuestionMark size={size} className={`${className} ${defaultClasses}`} />;
  }
};

export default Icon;