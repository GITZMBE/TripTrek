'use client';

import { useRouter, useSearchParams } from "next/navigation";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { IconType } from "react-icons";

interface CategoryIconProps extends ComponentPropsWithoutRef<"button"> {
  category: string;
  icon: IconType;
};

export const CategoryIcon = ({ category, icon: Icon, className, ...props }: CategoryIconProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ currentCategory, setCurrentCategory ] = useState<string | null>(null)

  const onClickIcon = (category: string) => {
    router.push(`/?category=${category.toLowerCase()}`)
  };

  useEffect(() => {
    const cat = searchParams.get('category');
    setCurrentCategory(cat || '');
  }, [searchParams]);

  return (
    <button className={ `group flex flex-col justify-center items-center gap-2 min-w-16 lg:min-w-20 p-2 aspect-square ${ currentCategory === category.toLowerCase() ? 'bg-secondary border-b-2 border-grey' : ' hover:bg-secondary' } ${ className }` } onClick={() => {onClickIcon(category)}} disabled={ currentCategory === category } {...props}>
      <Icon className={`w-6 h-6 lg:w-8 lg:h-8 text-grey ${ currentCategory === category.toLowerCase() ? 'text-light' : 'group-hover:text-light' }`} />
      <p className={`text-xs lg:text-xs text-grey ${ currentCategory === category.toLowerCase() ? 'text-light' : 'group-hover:text-light' }`}>{ category }</p>
    </button>
  );
};

export default CategoryIcon;
