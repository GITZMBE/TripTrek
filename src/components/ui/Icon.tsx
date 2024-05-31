'use client';

import { BiQuestionMark, BiSolidCategory, BiTask } from 'react-icons/bi';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiHamburgerMenu, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineChatBubble, MdOutlineVilla, MdVerified } from 'react-icons/md';
import { FaAngleDoubleRight, FaHeart, FaLongArrowAltRight, FaRegHeart, FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoCheckmarkCircle, IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { IconBaseProps } from 'react-icons';

interface IconProps extends IconBaseProps {
  icon: string;
  className?: string;
  size?: number;
}

export const Icon = ({ icon, className, size = 48, ...props }: IconProps) => {
  const defaultClasses = "w-12 aspect-square text-grey";

  switch (icon) {
    case "":
      return <BiSolidCategory size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "beach":
      return <TbBeach size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "windmills":
      return <GiWindmill size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "modern":
      return <MdOutlineVilla size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "countryside":
      return <TbMountain size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "pools":
      return <TbPool size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "islands":
      return <GiIsland size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "lake":
      return <GiBoatFishing size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "skiing":
      return <FaSkiing size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "castles":
      return <GiCastle size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "camping":
      return <GiForestCamp size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "artic":
      return <BsSnow size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "cave":
      return <GiCaveEntrance size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "desert":
      return <GiCactus size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "barns":
      return <GiBarn size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "lux":
      return <IoDiamond size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "avatar":
      return <RxAvatar size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "checkmark":
      return <IoCheckmarkCircle size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "task":
      return <BiTask size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "chatbubble":
      return <MdOutlineChatBubble size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "menu":
      return <GiHamburgerMenu size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "heart":
      return <FaHeart size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "emptyheart":
      return <FaRegHeart size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "verified":
      return <MdVerified size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "bin":
      return <RiDeleteBin2Fill size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "arrowdoubleright":
      return <FaAngleDoubleRight size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "longarrowright":
      return <FaLongArrowAltRight size={size} className={`${className} ${defaultClasses}`} {...props} />;
    default:
      return <BiQuestionMark size={size} className={`${className} ${defaultClasses}`} {...props} />;
  }
};

export default Icon;
