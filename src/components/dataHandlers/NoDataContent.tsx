import Link from "next/link";
import { Icon } from "../ui";
import { ReactNode } from "react";

interface NoDataContentProps {
  label: string;
  image?: string;
  icon?: string;
  size?: number;
  iconClasses?: string;
  children?: ReactNode;
}

export const NoDataContent = ({
  label,
  image,
  icon,
  size,
  iconClasses,
  children
}: NoDataContentProps) => {
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      { image ? (
        <img src={image} className={`w-48 opacity-50 ` + iconClasses} alt="" />
      ) : icon ? (
        <Icon icon={icon} size={size} className={iconClasses} />
      ) : (
        <></>
      )}
      <span className='text-2xl text-grey cursor-default'>{label}</span>
      { children }
    </div>
  );
};

export default NoDataContent;