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
  const [ currentCategory, setCurrentCategory ] = useState<string>()

  const onClickIcon = (category: string) => {
    router.push(`/?category=${category}`)
  };

  useEffect(() => {
    const cat = searchParams.get('category');
    setCurrentCategory(cat || '');
  }, [searchParams]);

  return (
    <button className={ `group flex flex-col justify-between items-center gap-2 w-16 lg:w-20 p-2 aspect-square hover:bg-secondary ${ currentCategory === category && 'border-b-2 border-grey' } ${ className }` } onClick={() => {onClickIcon(category)}} {...props}>
      <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-grey group-hover:text-light" />
      <p className="text-sm text-grey group-hover:text-light">{ category }</p>
    </button>
  );
};

export default CategoryIcon;
